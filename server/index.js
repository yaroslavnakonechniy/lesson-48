const express = require('express');
const session = require('cookie-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const swaggerDocument = require('./swagger-spec.json');

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    optionsSuccessStatus: 200,
};

const app = express();
const PORT = 3000;
const JSON_SERVER_BASE_URL = 'http://localhost:3001';
const SECRET = 'YOUR_SECRET_KEY'; 

const ErrorCodes = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    SERVER_ERROR: 'SERVER_ERROR',
};

const Status = {
    SUCCESS: 200,
    CREATED: 201,
    UPDATED: 200,
    DELETED: 200,
    [ErrorCodes.VALIDATION_ERROR]: 400,
    [ErrorCodes.UNAUTHORIZED]: 401,
    [ErrorCodes.INVALID_CREDENTIALS]: 401,
    [ErrorCodes.FORBIDDEN]: 403,
    [ErrorCodes.NOT_FOUND]: 404
};

const WORKFLOW = {
    todo: {
        code: 'todo',
        label: 'To Do'
    },
    progress: {
        code: 'progress',
        label: 'In Progress'
    },
    done: {
        code: 'done',
        label: 'Done'
    }
};

const successResponse = (res, status, data = {}) => {
    return res.status(status).json({
        data: data,
        error: {}
    });
};

const errorResponse = (res, status, errorCode, message, details = []) => {
    return res.status(status).json({
        data: {},
        error: {
            code: errorCode,
            message: message,
            details: details
        }
    });
};

// --- MIDDLEWARE ---

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'session',
    keys: ['very_secure_secret_key_1', 'very_secure_secret_key_2'],
    maxAge: 24 * 60 * 60 * 1000 
}));

app.get('/', (_, res) => {
    console.log('Welcom to Task Manager API');
    res.send('Welcom to Task Manager API');
})

/**
 * Middleware for JWT-token in session.
 */
const authenticateToken = (req, res, next) => {
    const token = req.session.jwt;

    if (!token) {
        return errorResponse(res, Status.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, "Access token missing or invalid.");
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return errorResponse(res, Status.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, "Access token missing or invalid.");
    }
};

// --- Validation fields ---
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const details = errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }));
        return errorResponse(res, Status.VALIDATION_ERROR, ErrorCodes.VALIDATION_ERROR, "Validation failed.", details);
    }
    next();
};

const validateSignUp = [
    body('name')
        .notEmpty().withMessage('Name is required.')
        .isString().withMessage('Name must be a string.'),
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
];

const validateSignIn = [
    body('email')
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email format.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
];


// --- API routes ---

// ----------------------------------------------------
// 1. Authentication
// ----------------------------------------------------
const authRouter = express.Router();
const USERS_URL = `${JSON_SERVER_BASE_URL}/users`;

// POST: /api/v1/auth/sign-up
authRouter.post('/sign-up', validateSignUp, handleValidationErrors, async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // Check existing user
        const checkResponse = await axios.get(`${USERS_URL}?email=${email}`);
        if (checkResponse.data.length > 0) {
            return errorResponse(res, Status.VALIDATION_ERROR, ErrorCodes.VALIDATION_ERROR, "User with this email already exists.", [
                { field: 'email', message: 'User with this email already exists.' }
            ]);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUserPayload = { 
            id: crypto.randomUUID(), 
            name, 
            email, 
            password: hashedPassword,
            createdAt: new Date().toISOString() 
        };
        
        const createResponse = await axios.post(USERS_URL, newUserPayload);
        const newUser = createResponse.data;

        const token = jwt.sign({ userId: newUser.id }, SECRET, { expiresIn: '1h' });
        req.session.jwt = token;

        return successResponse(res, Status.CREATED, { id: newUser.id, name: newUser.name, email: newUser.email });
    } catch (error) {
        console.error("Sign-up error:", error.message);
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "An internal server error occurred.");
    }
});

authRouter.post('/sign-in', validateSignIn, handleValidationErrors, async (req, res) => {
    const { email, password } = req.body;

    try {
        const findResponse = await axios.get(`${USERS_URL}?email=${email}`);
        const user = findResponse.data[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return errorResponse(res, Status.INVALID_CREDENTIALS, ErrorCodes.INVALID_CREDENTIALS, "Invalid email or password.");
        }

        const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '1h' });
        req.session.jwt = token;

        return successResponse(res, Status.SUCCESS, { id: user.id, name: user.name, email: user.email });
    } catch (error) {
        console.error("Sign-in error:", error.message);
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "An internal server error occurred.");
    }
});

authRouter.post('/sign-out', (req, res) => {
    req.session = null;
    return successResponse(res, Status.SUCCESS, { message: "Signed out successfully." });
});

authRouter.get('/me', authenticateToken, async (req, res) => {
    try {
        const id = req.user.userId;
        const response = await axios.get(`${USERS_URL}/${id}`);
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (err) {
        return errorResponse(res, Status.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, "Access token missing or invalid.");
    }
});

app.use('/api/v1/auth', authRouter);


// ----------------------------------------------------
// 5. Swagger Documentation
// ----------------------------------------------------
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// ----------------------------------------------------
// Apply Middleware auth to all routes below
// ----------------------------------------------------
app.use(authenticateToken);

// ----------------------------------------------------
// 2. Boards
// ----------------------------------------------------
const boardsRouter = express.Router();
const BOARDS_URL = `${JSON_SERVER_BASE_URL}/boards`;
const TASKS_URL = `${JSON_SERVER_BASE_URL}/tasks`;

const checkBoardAccess = async (boardId, userId) => {
    try {
        const response = await axios.get(`${BOARDS_URL}/${boardId}`);
        const board = response.data;
        if (board.authorId !== userId) return { board: null, code: Status.FORBIDDEN };
        return { board, code: Status.SUCCESS };
    } catch (e) {
        return { board: null, code: Status.NOT_FOUND };
    }
};

boardsRouter.get('/', async (req, res) => {
    try {
        const response = await axios.get(`${BOARDS_URL}?authorId=${req.user.userId}`);
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to fetch boards.");
    }
});

boardsRouter.get('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const { board, code } = await checkBoardAccess(boardId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to access this board.");
    if (!board) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Board with ID ${boardId} not found.`);

    return successResponse(res, Status.SUCCESS, board);
});

boardsRouter.get('/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;

    const { board, code } = await checkBoardAccess(boardId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to access this board.");
    if (!board) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Board with ID ${boardId} not found.`);

    try {
        const response = await axios.get(`${TASKS_URL}?boardId=${boardId}`);
        const mappedTasks = response.data.map(task => ({
            ...task,
            workflow: WORKFLOW[task.workflow],
        }));
        return successResponse(res, Status.SUCCESS, mappedTasks);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to fetch tasks for this board.");
    }
});

boardsRouter.post('/', [body('name').notEmpty().withMessage('Name is required.')], handleValidationErrors, async (req, res) => {
    const { name, description } = req.body;
    
    try {
        const newBoardPayload = { 
            id: crypto.randomUUID(), 
            name, 
            description: description || '', 
            authorId: req.user.userId,
            createdAt: new Date().toISOString()
        };

        const response = await axios.post(BOARDS_URL, newBoardPayload);
        return successResponse(res, Status.CREATED, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to create board.");
    }
});

boardsRouter.put('/:boardId', [body('name').optional().isString(), body('description').optional().isString()], handleValidationErrors, async (req, res) => {
    const { boardId } = req.params;
    const { name, description } = req.body;
    
    const { board, code } = await checkBoardAccess(boardId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to edit this board.");
    if (!board) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Board with ID ${boardId} not found.`);
    
    try {
        const updatePayload = { name: name || board.name, description: description !== undefined ? description : board.description };
        const response = await axios.patch(`${BOARDS_URL}/${boardId}`, updatePayload);
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to update board.");
    }
});

boardsRouter.delete('/:boardId', async (req, res) => {
    const { boardId } = req.params;
    
    const { board, code } = await checkBoardAccess(boardId, req.user.userId);

    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to delete this board.");
    if (!board) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Board with ID ${boardId} not found.`);

    try {
        await axios.delete(`${BOARDS_URL}/${boardId}`);
        return successResponse(res, Status.SUCCESS, { message: `Board with ID ${boardId} deleted successfully.` });
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to delete board.");
    }
});

app.use('/api/v1/boards', boardsRouter);

// ----------------------------------------------------
// 3. Tasks
// ----------------------------------------------------
const tasksRouter = express.Router();
const COMMENTS_URL = `${JSON_SERVER_BASE_URL}/comments`;

const checkTaskAccess = async (taskId, userId) => {
    try {
        const response = await axios.get(`${TASKS_URL}/${taskId}`);
        const task = response.data;
        
        if (!task) return { task: null, code: Status.NOT_FOUND };
        
        const boardAccess = await checkBoardAccess(task.boardId, userId);
        if (!boardAccess.board) return { task: null, code: boardAccess.code };
        
        return { task, code: Status.SUCCESS };
    } catch (e) {
        return { task: null, code: Status.NOT_FOUND };
    }
};

tasksRouter.get('/', [body('boardId').optional().notEmpty()], handleValidationErrors, async (req, res) => {
    const { boardId } = req.query;
    if (!boardId) return errorResponse(res, Status.VALIDATION_ERROR, ErrorCodes.VALIDATION_ERROR, "Query parameter boardId is required.");

    const { board, code } = await checkBoardAccess(boardId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to access this board.");
    if (!board) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Board with ID ${boardId} not found.`);

    try {
        const response = await axios.get(`${TASKS_URL}?boardId=${boardId}`);
        const mappedTasks = response.data.map(task => ({
            ...task,
            workflow: WORKFLOW[task.workflow],
        }));

        return successResponse(res, Status.SUCCESS, mappedTasks);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to fetch tasks.");
    }
});

tasksRouter.get('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    
    const { task, code } = await checkTaskAccess(taskId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to access this task's board.");
    if (!task) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Task with ID ${taskId} not found.`);

    return successResponse(res, Status.SUCCESS, { ...task, workflow: WORKFLOW[task.workflow] });
});

tasksRouter.get('/:taskId/comments', async (req, res) => {
    const { taskId } = req.params;
    
    const { task, code } = await checkTaskAccess(taskId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to access this task's board.");
    if (!task) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Task with ID ${taskId} not found.`);

    try {
        const response = await axios.get(`${COMMENTS_URL}?taskId=${taskId}`);
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to fetch comments for this task.");
    }
});

tasksRouter.post('/', [body('title').notEmpty(), body('boardId').notEmpty()], handleValidationErrors, async (req, res) => {
    const { title, description, boardId, workflow } = req.body;

    const { board, code } = await checkBoardAccess(boardId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to create a task on this board.");
    if (!board) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Board with ID ${boardId} not found.`);
    
    try {
        const newTaskPayload = { 
            id: crypto.randomUUID(), 
            title, 
            description: description || '', 
            workflow: workflow || 'TODO', 
            boardId, 
            authorId: req.user.userId,
            createdAt: new Date().toISOString()
        };

        const response = await axios.post(TASKS_URL, newTaskPayload);
        return successResponse(res, Status.CREATED, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to create task.");
    }
});

tasksRouter.put('/:taskId', [body('title').optional().isString(), body('description').optional().isString()], handleValidationErrors, async (req, res) => {
    const { taskId } = req.params;
    const { title, description } = req.body;
    
    const { task, code } = await checkTaskAccess(taskId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to edit this task.");
    if (!task) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Task with ID ${taskId} not found.`);
    
    try {
        const updatePayload = { 
            title: title || task.title, 
            description: description !== undefined ? description : task.description 
        };
        const response = await axios.patch(`${TASKS_URL}/${taskId}`, updatePayload);
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to update task.");
    }
});

tasksRouter.put('/:taskId/workflow', [body('workflow').notEmpty().withMessage('Workflow status is required.')], handleValidationErrors, async (req, res) => {
    const { taskId } = req.params;
    const { workflow } = req.body;
    
    const { task, code } = await checkTaskAccess(taskId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to update this task's workflow.");
    if (!task) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Task with ID ${taskId} not found.`);
    
    try {
        const response = await axios.patch(`${TASKS_URL}/${taskId}`, { workflow });
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to update task workflow.");
    }
});

tasksRouter.delete('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    
    const { task, code } = await checkTaskAccess(taskId, req.user.userId);

    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to delete this task.");
    if (!task) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Task with ID ${taskId} not found.`);

    try {
        await axios.delete(`${TASKS_URL}/${taskId}`);
        return successResponse(res, Status.SUCCESS, { message: `Task with ID ${taskId} deleted successfully.` });
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to delete task.");
    }
});

app.use('/api/v1/tasks', tasksRouter);


// ----------------------------------------------------
// 4. Comments
// ----------------------------------------------------
const commentsRouter = express.Router();

const checkCommentAccess = async (commentId, userId) => {
    try {
        const response = await axios.get(`${COMMENTS_URL}/${commentId}`);
        const comment = response.data;
        
        if (!comment) return { comment: null, code: Status.NOT_FOUND };
        
        const taskAccess = await checkTaskAccess(comment.taskId, userId);
        if (!taskAccess.task) return { comment: null, code: taskAccess.code };
        
        return { comment, code: Status.SUCCESS, task: taskAccess.task };
    } catch (e) {
        return { comment: null, code: Status.NOT_FOUND };
    }
};

commentsRouter.get('/', [body('taskId').optional().notEmpty()], handleValidationErrors, async (req, res) => {
    const { taskId } = req.query;
    if (!taskId) return errorResponse(res, Status.VALIDATION_ERROR, ErrorCodes.VALIDATION_ERROR, "Query parameter taskId is required.");

    const { task, code } = await checkTaskAccess(taskId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to view comments on this task.");
    if (!task) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Task with ID ${taskId} not found.`);

    try {
        const response = await axios.get(`${COMMENTS_URL}?taskId=${taskId}`);
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to fetch comments.");
    }
});

commentsRouter.post('/', [body('message').notEmpty(), body('taskId').notEmpty()], handleValidationErrors, async (req, res) => {
    const { message, taskId } = req.body;

    const { task, code } = await checkTaskAccess(taskId, req.user.userId);
    
    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to comment on this task.");
    if (!task) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Task with ID ${taskId} not found.`);
    
    try {
        const newCommentPayload = { 
            id: crypto.randomUUID(), 
            message, 
            taskId, 
            authorId: req.user.userId,
            createdAt: new Date().toISOString()
        };

        const response = await axios.post(COMMENTS_URL, newCommentPayload);
        return successResponse(res, STATUS_CODES.CREATED, response.data);
    } catch (error) {
        return errorResponse(res, 500, "SERVER_ERROR", "Failed to create comment.");
    }
});

commentsRouter.put('/:commentId', [body('message').notEmpty().withMessage('Message is required.')], handleValidationErrors, async (req, res) => {
    const { commentId } = req.params;
    const { message } = req.body;
    
    const { comment, code } = await checkCommentAccess(commentId, req.user.userId);

    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to edit this comment.");
    if (!comment) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Comment with ID ${commentId} not found.`);
    
    if (comment.authorId !== req.user.userId) {
        return errorResponse(res, Status.FORBIDDEN, ErrorCodes.FORBIDDEN, "You can only edit your own comments.");
    }

    try {
        const response = await axios.patch(`${COMMENTS_URL}/${commentId}`, { message });
        return successResponse(res, Status.SUCCESS, response.data);
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to update comment.");
    }
});

commentsRouter.delete('/:commentId', async (req, res) => {
    const { commentId } = req.params;
    
    const { comment, code } = await checkCommentAccess(commentId, req.user.userId);

    if (code === Status.FORBIDDEN) return errorResponse(res, code, ErrorCodes.FORBIDDEN, "You do not have permission to delete this comment.");
    if (!comment) return errorResponse(res, Status.NOT_FOUND, ErrorCodes.NOT_FOUND, `Comment with ID ${commentId} not found.`);
    
    if (comment.authorId !== req.user.userId) {
        return errorResponse(res, Status.FORBIDDEN, ErrorCodes.FORBIDDEN, "You can only delete your own comments.");
    }

    try {
        await axios.delete(`${COMMENTS_URL}/${commentId}`);
        return successResponse(res, Status.SUCCESS, { message: `Comment with ID ${commentId} deleted successfully.` });
    } catch (error) {
        return errorResponse(res, Status.SERVER_ERROR, ErrorCodes.SERVER_ERROR, "Failed to delete comment.");
    }
});

app.use('/api/v1/comments', commentsRouter);

// --- Launch Server ---
app.listen(PORT, () => {
    console.log(`🚀 Express Server running on http://localhost:${PORT}`);
    console.log(`📚 JSON Server running on http://localhost:3001 (db.json)`);
    console.log(`\n--- Don't forget to run json-server in a separate window: npm run start:db ---`);
});