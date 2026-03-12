import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FormComment } from './Form';

export const CreateComment = () => {
    const navigate = useNavigate();

    return(
        <>
            <Modal
                title={"Create Coment"}
                open={true}
                onCancel={() => navigate(-1)} 
                footer={null}
                destroyOnClose
                width={520}
            >
                <FormComment mode="create"/>
                
            </Modal>
        </>
    )
}
