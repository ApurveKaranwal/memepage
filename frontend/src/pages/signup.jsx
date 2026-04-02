import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

export default function Signup(){
const navigate = useNavigate();

const [form, setForm] = useState({
    email: "",
    password: "",
});

const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
}

const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/auth/signup", form);
    navigate("/signin")
};
return (
    <div>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
            <input
            name="email"
            placeholder="Email"
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

            <button type="submit">Signup</button>
        </form>

        <p>
            Already have an account? <Link to="/signin">Signin</Link>
        </p>
    </div>
    );
}