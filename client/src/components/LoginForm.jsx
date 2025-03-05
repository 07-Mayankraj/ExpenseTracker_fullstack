import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { CircularProgress, Backdrop } from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: setAuthUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      localStorage.setItem("user", JSON.stringify(res.data));
      setAuthUser(res.data)
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed! Check your credentials.");
    } finally {
      setLoading(false); 
      toast.success("Logged in successfully!");
    }
  };

  return (
    <>
      <Backdrop open={loading} style={{ color: "#fff", zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? Create a new account !
        </p>
      </div>
    </>
  );
};

export default Login;
