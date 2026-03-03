import { Button, Card } from "antd";
import { useAuth } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <Card style={{ maxWidth: 300, margin: "100px auto" }}>
      <Button type="primary" block onClick={handleLogin}>
        Login
      </Button>
    </Card>
  );
};