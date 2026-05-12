import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = state?.email || localStorage.getItem("email");

  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/otp/verify-otp", {
        email,
        otp
      });
      
      setMsg(res.data.msg);
      
      if (res.data.msg === "Login Successful") {
        navigate("/signin");
      }
    }
    catch (err) {
      console.error(err);
      setMsg("Invalid or expired OTP");
    }
  };
  return (
      <div>
        <h2>Verify OTP</h2>
  
        <p>Email: {email}</p>
  
        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
  
        <br /><br />
  
        <button onClick={handleVerify}>Verify</button>
  
        <p>{msg}</p>
      </div>
    );
}