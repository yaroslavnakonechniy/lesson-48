import { Descriptions, Divider, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, Link } from "react-router-dom"

const {Item} = Descriptions;
//Картка з даними про проект, для перегляду проекта. Ця карта планується виводитися через поп-ап
//також ця картка планується використовуватися для редагування 1 проекту, прикліку на edit i для видалення
//Кнопки мають бути видимі під умову якщо було натиснуто Edit, то буде лише кнопка "Save"


export const ProjectDetailes = () => {
    const { projectId } = useParams<{ projectId: string }>();
    //const id = Number(projectId);

// тут потрібно дісти по id через  api, дані для 1 проекту. 

    return(
        <>
            <Divider />
                <Descriptions title="Project Info" style={{ padding: "40px" }}>
                    <Item label="NameProject">Final Project </Item>
                    <Item label="ProjectId">{projectId}</Item>
                    <Item label="AuthorId">Yaroslav</Item>
                    <Item label="DescriptionProject">This project from Hillel company. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem unde repellendus, voluptates natus accusamus illum, dicta, aliquam quibusdam consectetur laboriosam non dignissimos illo? Nesciunt blanditiis cum libero iure assumenda eligendi?
                        Dolor earum officiis perferendis totam nostrum aut quia fugiat eveniet quae accusamus nihil voluptatem vitae inventore, quidem iste quibusdam enim? Molestias, libero? Possimus vitae quia in dolor hic maiores veniam?
                        At excepturi laborum esse. Est, ex. Exercitationem sequi sed vitae quia eius. Adipisci voluptatum est fugiat, quisquam ipsa totam, magnam, suscipit vel quasi praesentium ab magni debitis reiciendis earum alias.
                        Esse ipsa voluptatem magnam voluptates adipisci ex voluptatum ullam vitae minus est, dolore obcaecati maiores libero? Animi voluptatum, molestiae laborum sint id suscipit eligendi, inventore quam rem doloremque facilis saepe!
                        Consequuntur provident fugit reprehenderit suscipit ipsum incidunt voluptatibus nulla error minus est sapiente repudiandae modi exercitationem, sunt earum, corrupti voluptates quaerat quae ut dolorem tempora saepe, mollitia illum culpa! Placeat!
                        Iusto excepturi nihil quaerat fugit dolorum? Quos, nihil maxime. Consequatur accusantium saepe repellendus iure iusto, esse voluptatum ducimus fuga illum molestias. Vel soluta rem amet. Excepturi maiores modi earum consequuntur?
                        Sint, fugit molestias illum blanditiis animi eius quibusdam corporis, commodi eaque ipsam voluptatibus quasi velit dolorem quidem, similique laudantium quae inventore consectetur vero optio maiores non illo iure! Esse, et!
                        Quas, dolor cum veniam, labore culpa facere consequuntur officia ea quo cumque consectetur assumenda quibusdam odit voluptatem alias quasi laboriosam eaque corrupti quisquam, at inventore. Adipisci ipsum consequatur quo voluptatem.
                        Molestias mollitia fuga qui sint quas autem quidem, quis optio dolorum nam, molestiae aut? Architecto facilis officiis nobis rem sunt cupiditate laborum quaerat. Sint quibusdam, voluptatem voluptas corporis rem necessitatibus.
                        Sit, eius? Placeat, deserunt cum! Voluptatem inventore, maxime quae officia esse temporibus! Reiciendis maxime, quae, ipsam esse obcaecati commodi non impedit ipsum numquam amet veniam, ipsa debitis sapiente consequatur magnam.
                    </Item>
                </Descriptions>
                    <Space style={{ marginTop: 16 }}>
                    <Button type="primary" icon={<EditOutlined />} size="small">
                    <Link to={`/project/${projectId}/edit`}>Edit Project</Link>
                    </Button>
                    <Button danger icon={<DeleteOutlined />} size="small">
                    <Link to={`/project/${projectId}/delete`}>Delete Project</Link>
                    </Button>
                    <Button icon={<ArrowLeftOutlined />} size="small">
                    <Link to={`/project/`}>Back</Link>
                    </Button>
                    <Button type="dashed" size="small">
                    <Link to={`/project/${projectId}/tasks`}>Open Tasks</Link>
                    </Button>
                </Space>
            <Divider />

        </>
    )
}
