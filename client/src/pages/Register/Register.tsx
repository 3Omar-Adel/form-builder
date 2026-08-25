import RegisterBrand from "./RegisterBrand";
import RegisterForm from "./RegisterForm";
import "./register.css";

const Register = () => {
    return (
        <main className="register-page">
            <div className="register-container">
                <RegisterBrand />
                <RegisterForm />
            </div>
        </main>
    );
};

export default Register;