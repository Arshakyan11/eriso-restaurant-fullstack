import { useEffect, useRef, useState } from "react";
import "./NavBar.scss";
import { logo } from "../Images";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  type NavigateFunction,
} from "react-router-dom";
import { FaAddressCard, FaBars, FaUser } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { LogOutFromAccount } from "../../helpers/logOut";
import { ROUTES } from "../../routes/Routes";
import { useAppSelector } from "../../store/store";
import { getUserInfo } from "../../store/AuthSlice/AuthSlice";

const NavBar = () => {
  const dropDownRef = useRef<HTMLLIElement>(null);
  const dropDownRefBottom = useRef<HTMLLIElement>(null);
  const navigate: NavigateFunction = useNavigate();
  const [isDropDownOpen, setIsDropDownOpen] = useState<boolean>(false);
  const [isDropDownOpenBottom, setIsDropDownOpenBottom] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const toogleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const toogleDropDownBottom = () => {
    setIsDropDownOpenBottom(!isDropDownOpenBottom);
  };

  const { userInfo } = useAppSelector(getUserInfo);
  useEffect(() => {
    const handleScreenSize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleScreenSize);
    const handleOffingDrop = (event: TouchEvent | MouseEvent) => {
      const target = event.target as HTMLElement;
      if (dropDownRef.current && !dropDownRef.current.contains(target)) {
        setIsDropDownOpen(false);
      }
      if (
        dropDownRefBottom.current &&
        !dropDownRefBottom.current.contains(target)
      ) {
        setIsDropDownOpenBottom(false);
      }
    };
    document.addEventListener("mousedown", handleOffingDrop);
    document.addEventListener("touchend", handleOffingDrop);
    return () => {
      document.removeEventListener("mousedown", handleOffingDrop);
      document.removeEventListener("touchend", handleOffingDrop);
      window.removeEventListener("resize", handleScreenSize);
    };
  }, []);
  const { pathname } = useLocation();
  useEffect(() => {
    setIsOpen(false);
    setIsDropDownOpen(false);
  }, [pathname]);

  return (
    <nav className="mainNav">
      <div className="container">
        <div className="navSection">
          <div className="topNavSection">
            <div className="left">
              <img
                src={logo}
                alt="logo"
                onClick={() => navigate(ROUTES.HOME)}
              />
            </div>
            <div className="middle">
              <ul>
                <li>
                  <NavLink to={ROUTES.HOME}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={ROUTES.MENU}>Menu</NavLink>
                </li>
                <li>
                  <NavLink to={ROUTES.ABOUTUS}>About Us</NavLink>
                </li>
                <li>
                  <NavLink to={ROUTES.Search}>Search</NavLink>
                </li>
                <li className="dropDown" ref={dropDownRef}>
                  <button
                    type="button"
                    className="dropDownToggle"
                    onClick={toogleDropDown}
                  >
                    More...
                  </button>
                  {isDropDownOpen && (
                    <div className="dropDownMenu">
                      <NavLink to={ROUTES.RESERVATION}>Reservation</NavLink>
                      <NavLink to={ROUTES.RESTAURANTS}>Our Addresses</NavLink>
                      <NavLink to={ROUTES.CONTACTUS}>Contact Us</NavLink>
                      <NavLink to={ROUTES.STAFF}>Our Staff</NavLink>
                    </div>
                  )}
                </li>
              </ul>
            </div>
            <div className="right">
              {userInfo ? (
                <>
                  <Link to={ROUTES.PROFILE}>
                    <FaUser />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      LogOutFromAccount(navigate);
                    }}
                  >
                    <FaRightToBracket />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link to={ROUTES.REGISTRATION}>
                    <FaAddressCard />
                    Sign Up
                  </Link>
                  <Link to={ROUTES.LOGIN}>
                    <FaRightToBracket />
                    Sign In
                  </Link>
                </>
              )}
            </div>
            <div className="burger" onClick={() => setIsOpen(!isOpen)}>
              <FaBars />
            </div>
          </div>
          {screenWidth < 1085 && isOpen && (
            <div className="bottomNavSection">
              <div className="right">
                {userInfo ? (
                  <>
                    <Link to={ROUTES.PROFILE}>
                      <FaUser className="newUserSvg" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        LogOutFromAccount(navigate);
                      }}
                    >
                      <FaRightToBracket className="newUserSvg" />
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={ROUTES.REGISTRATION}>
                      <FaAddressCard className="regSvg" />
                      Sign Up
                    </Link>
                    <Link to={ROUTES.LOGIN}>
                      <FaRightToBracket className="regSvg" />
                      Sign In
                    </Link>
                  </>
                )}
              </div>
              <div className="middle">
                <ul>
                  <li>
                    <NavLink to={ROUTES.HOME}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.MENU}>Menu</NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.ABOUTUS}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.Search}>Search</NavLink>
                  </li>
                  <li className="dropDown" ref={dropDownRefBottom}>
                    <button
                      type="button"
                      className="dropDownToggle"
                      onClick={toogleDropDownBottom}
                    >
                      More Pages
                    </button>
                    {isDropDownOpenBottom && (
                      <div className="dropDownMenu">
                        <NavLink to={ROUTES.RESERVATION}>Reservation</NavLink>
                        <NavLink to={ROUTES.RESTAURANTS}>Our Addresses</NavLink>
                        <NavLink to={ROUTES.CONTACTUS}>Contact Us</NavLink>
                        <NavLink to={ROUTES.STAFF}>Our Staff</NavLink>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
