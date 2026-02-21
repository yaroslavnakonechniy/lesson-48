import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout"
import { Button } from "antd";
import styles from "./styles.module.scss"


export const AppHeader = () => {
    return(
        <>
            <Header className={styles.header}>
                <div className="logo">
                    <Link to="/">Task Manager</Link>
                </div>
                <nav className={styles.header__navigation}>
                    <Button type="primary">Create</Button>
                    <Button>SignIn</Button>
                </nav>
                    
            </Header>
        </>
    )
}