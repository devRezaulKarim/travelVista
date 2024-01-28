import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import auth from "../../firebase.init";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  return (
    <div className={`${location !== "/" ? "navbarBg navbar" : "navbar"} `}>
      <div className="navContainer">
        <span onClick={() => navigate("/")} className="logo">
          TravelVista
        </span>
        <div className="navItems">
          {location === "/" ? (
            !user && (
              <div className="navButton">
                <Link to={"/login"}>Get in</Link>
              </div>
            )
          ) : (
            <Link to={"/"} className="navButton">
              Home
            </Link>
          )}

          {user && (
            <div className="navButton">
              <Link onClick={() => signOut()}>Get out</Link>{" "}
            </div>
          )}
          {user && (
            <div className="userImg">
              <img
                width={36}
                height={36}
                src={user.photoURL}
                alt={user.displayName.slice(0, 2)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
