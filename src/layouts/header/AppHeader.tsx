import { Link } from "react-router-dom";
import { useMatches, type UIMatch } from "react-router-dom";
import { Header } from "antd/es/layout/layout"
import { Button } from "antd";
import { useAuth } from "../../auth/AuthContext";
import { useParams } from "react-router-dom";
import { CreateType } from "../../interfaces/createAction";
import { useNavigate } from "react-router-dom";

import styles from "./styles.module.scss"


export const AppHeader = () => {

    const { isAuth, logout } = useAuth();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const matches = useMatches() as UIMatch<unknown, { createType?: CreateType }>[];

    const currentMatch = [...matches].reverse().find((m) => m.handle?.createType);
    const typeToCreate = currentMatch?.handle?.createType;

    const handleCreate = () => {
        if (typeToCreate === CreateType.BOARD) {
            navigate('project/create');
        } else if (typeToCreate === CreateType.TASK && projectId) {
            navigate(`/project/${projectId}/tasks/create`);
        }
    };

    return(
        <>
            <Header className={styles.header}>
                <div className="logo">
                    <Link to="/">Task Manager</Link>
                </div>
                <nav className={styles.header__navigation}>
                    <Button type="primary" onClick={handleCreate}>Create</Button>

                    {isAuth ? (
                        <Button onClick={logout}>Logout</Button>
                        ) : (
                        <Link to="/login">
                            <Button type="primary">Login</Button>
                        </Link>
                    )}
                </nav>
                    
            </Header>
        </>
    )
}