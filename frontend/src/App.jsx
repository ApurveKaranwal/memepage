import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Home from "./pages/home";

export default function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>
    );
}