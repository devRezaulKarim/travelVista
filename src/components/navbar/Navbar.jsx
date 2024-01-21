import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div className={`${location !== "/" ? "navbarBg navbar" : "navbar"} `}>
      <div className="navContainer">
        <span onClick={() => navigate("/")} className="logo">
          TravelVista
        </span>
        <div className="navItems">
          {location === "/" ? (
            <Link to={"/login"} className="navButton">
              Get in
            </Link>
          ) : (
            <Link to={"/"} className="navButton">
              Home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
