import { useEffect, useState } from "react";
import "./login.style.scss"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { alreadyLoggedIn } from "../../services/checkLoggedIn";

function LoginPageComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const navigate = useNavigate();
    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Replace this with your authentication logic
        setError("");
        setSuccess("");
        axios.post("http://localhost:8080/accounts/login", {
            username: email,
            password: password
        }).then(res => {
            console.log(res.data);
            window.localStorage.setItem("token", "Bearer " + res.data.data)
            setSuccess("login success")
            navigate("/weather")
        }).catch(err => {
            setError("Invalid email or password");
        })
    };

    useEffect(() => {
        if (alreadyLoggedIn()) navigate("/weather")
    }, []);



    return (
        <div className="container">
            <div className="page login-page mobile-only-page">
                <div className="page-container login-container">
                    <h2 className="header page-title">Login to weather app</h2>
                    <form className="login-form login-signup-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-group-label">Email</label>
                            <input className="form-group-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-group-label">Password</label>
                            <input className="form-group-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {success && <p className="message success-message">{success}</p>}
                        {error && <p className="message error-message">{error}</p>}
                        <button type="submit" className="login-button">
                            Login
                        </button>
                        <Link to="/signup" className="message signup-page">Signup</Link>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default LoginPageComponent;