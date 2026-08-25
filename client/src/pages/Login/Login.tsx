import LoginBrand from "./LoginBrand";
import LoginForm from "./LoginForm";
import "./login.css";

const Login = () => {
    return (
        <main className="auth-page">
            <div className="auth-container">
                <LoginBrand />
                <LoginForm />
            </div>
        </main>
    );
};

export default Login;