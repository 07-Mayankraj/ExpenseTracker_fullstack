import { Link } from "react-router-dom";
import logo  from '../../src/budget.png'
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
      <nav style={styles.navbar}>
        <img src={logo}  alt="Expense Tracker" />
      <div>
        <Link to="/" style={styles.link}>{user ?  ' Hi ' + user.name : 'login'}</Link>
        <Link to="/register" style={styles.link}>Register</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px",
    backgroundColor: "#86A789",
    boxShadow: `rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px`,
    color: "white",

  },
  link: {
    margin: "0 10px",
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
  },
};

export default Navbar;
