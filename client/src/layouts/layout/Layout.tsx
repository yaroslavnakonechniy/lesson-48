import { Outlet } from "react-router-dom"
import { Layout } from 'antd';
import { AppHeader } from "../header/AppHeader";

const { Footer, Content } = Layout;

const contentStyle: React.CSSProperties = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#bfbfbf',
};
const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 1400,
    margin: '0 auto',
  
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
 
export const LayoutPage = () => {
    return(
        <>
            <Layout style={layoutStyle}>
                <AppHeader />
                <Content style={contentStyle}>
                    <Outlet/>
                </Content>
                <Footer style={footerStyle}>Footer</Footer>
            </Layout>
        </>
    )
}