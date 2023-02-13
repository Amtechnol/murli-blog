import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  // const user = false;
  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  let activeClassName = "active";

  return (
    <>
      <div className="bg-dark">
        <Container>
          <Navbar expand="lg">
            <div>
              <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-pinterest-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
              </div>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="m-auto">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? activeClassName : ""
                  }
                >
                  HOME
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? activeClassName : ""
                  }
                >
                  ABOUT
                </NavLink>
                <NavLink
                  to="/contact-us"
                  className={({ isActive }) =>
                    isActive ? activeClassName : ""
                  }
                >
                  CONTACT
                </NavLink>
                <NavLink
                  to="/write"
                  className={({ isActive }) =>
                    isActive ? activeClassName : ""
                  }
                >
                  WRITE
                </NavLink>
                {user && <Link onClick={handleLogout}>LOGOUT</Link>}
              </Nav>
            </Navbar.Collapse>

            <div className="topRight">
              {user ? (
                <Link className="link" to="/settings">
                  {user.profilePic ? (
                    <img className="topImg" src={user?.profilePic} alt="" />
                  ) : (
                    <img
                      className="topImg"
                      src="https://murli-server.up.railway.app/images/dummy.png"
                      alt=""
                    />
                  )}
                </Link>
              ) : (
                <ul className="topList">
                  <li className="topListItem">
                    <NavLink to="/login" className="link">
                      LOGIN
                    </NavLink>
                  </li>
                  <li className="topListItem">
                    <Link className="link" to="/register">
                      REGISTER
                    </Link>
                  </li>
                </ul>
              )}
              {/* <i className="topSearchIcon fas fa-search"></i> */}
              <span className="text-capitalize text-white">
                {user?.username}
              </span>
            </div>
          </Navbar>
        </Container>
      </div>
    </>
  );
};

export default Header;
