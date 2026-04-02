import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signin() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.post(
            "http://localhost:5000/api/auth/signin", form
        );
        localStorage.setItem("token", res.data.token);
        navigate("/");
    };
    return (
        <div>
            <h1>Signin</h1>
            
            <form onSubmit={handleSubmit}>
                <input
                name="email"
                palceholder="Email"
                onChange={handleChange}
                />
                <br />

                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                />
                <br />

                <button type="submit">Signin</button>
            </form>

            <p>
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
        </div>
    );
}
