import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout"
import { Button } from "antd";
import styles from "./styles.module.scss"
import { useAuth } from "../../auth/AuthContext";


export const AppHeader = () => {

    const { isAuth, logout } = useAuth();
    return(
        <>
            <Header className={styles.header}>
                <div className="logo">
                    <Link to="/">Task Manager</Link>
                </div>
                <nav className={styles.header__navigation}>
                    <Button type="primary">Create</Button>

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