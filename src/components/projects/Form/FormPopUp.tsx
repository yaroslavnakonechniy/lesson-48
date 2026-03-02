import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormProject } from "./Form"
import { FormTask } from '../TasksManager/Form/Form';
import { useCreateAction } from '../../../hooks/UseCreateAction';

export const FormPopUp = () => {
    const navigate = useNavigate();
    const {isTask} = useCreateAction();

    return (
        <Modal
            title={isTask ? "Create Task" : "Create project"}
            open={true}
            onCancel={() => navigate(-1)} 
            footer={null}
            destroyOnClose
            width={isTask ? 700 : 520}
        >
            {isTask ? (
                <FormTask />
            ) : (
                <FormProject />
            )}
        </Modal>
    );
};
