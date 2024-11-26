import axios from "axios";
import { useEffect, useState } from "react";
import "./signup.style.scss"
import { Link, useNavigate } from "react-router-dom";
import { alreadyLoggedIn } from "../../services/checkLoggedIn";

function SignupPageComponent() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        if (alreadyLoggedIn()) navigate("/weather")
    }, []);


    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Replace this with your authentication logic
        setError("");
        setSuccess("");
        axios.post("http://localhost:8080/accounts/register", {
            name: name,
            username: email,
            password: password
        }).then(res => {
            setSuccess("Successfully registerd")
            window.alert("please login");
            navigate("/login")
        }).catch(err => {
            setError(err.response.data.data);
        })
    };

    return (
        <div className="container">
            <div className="page login-page mobile-only-page">
                <div className="page-container login-container">
                    <h2 className="header page-title">Register to weather app</h2>
                    <form className="login-form login-signup-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label className="form-group-label">Name</label>
                            <input className="form-group-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
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
                            Register
                        </button>
                        <Link to="/login" className="message login-page">Login</Link>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default SignupPageComponent;