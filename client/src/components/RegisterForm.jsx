import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import toast from "react-hot-toast";
import { CircularProgress, Backdrop } from "@mui/material";
const Register = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await register(name, email, password);
      console.log({ res });
      navigate("/");
    } catch (err) {
      toast.error("Registration failed")
    }
    finally {
      setLoading(false); // ✅ Stop loading
      toast.success("Registration successful")
    }
  };

  return (
    <>
      <Backdrop open={loading} style={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="register-container login-container ">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/">Login here</a>
        </p>
      </div>
    </>
  );
};

export default Register;
