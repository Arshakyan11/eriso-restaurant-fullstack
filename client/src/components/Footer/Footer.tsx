import "./Footer.scss";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { getAllReservationInfo } from "../../store/ReservationSlice/ReservationSlice";
import { useAppSelector } from "../../store/store";
import { ROUTES } from "../../routes/Routes";
const Footer = () => {
  const { userData } = useAppSelector(getAllReservationInfo);
  return (
    <section className="footerSec">
      <div className="container">
        <div className="footerSecMain">
          <div className="firstLine">
            <Link className="logoTitle" to={ROUTES.HOME}>
              eriso
            </Link>
            <div className="firstLinebottomBox">
              <p className="welcomeText">
                We're glad you're here! At ERISO, we serve fresh, flavorful
                dishes made with care. Thank you for dining with us
              </p>
              <div className="socialLinks">
                <a
                  href="https://www.facebook.com/share/18UMZzsAgy/?mibextid=wwXIfrnp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/erhamindustry?igsh=cXVrdjJobWt1cWc5&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://x.com/erhamindustry?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://youtube.com/@erham.industry?si=7ZBDgjGpKEpkkq9f"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
          <div className="navigationBox">
            <div className="secondLine">
              <h2>Page</h2>
              <NavLink to={ROUTES.HOME}>Home</NavLink>
              <NavLink to={ROUTES.MENU}>Menu</NavLink>
              <NavLink to={ROUTES.Search}>Search</NavLink>
              <NavLink to={ROUTES.RESERVATION}>Reservation</NavLink>
            </div>
            <div className="secondLine">
              <h2>Information</h2>
              <NavLink to={ROUTES.ABOUTUS}>About Us</NavLink>
              <NavLink to={ROUTES.RESTAURANTS}>Our Addresses</NavLink>
              <NavLink to={ROUTES.CONTACTUS}>Contact Us</NavLink>
              <NavLink to={ROUTES.STAFF}>Our Staff</NavLink>
            </div>
            <div className="secondLine">
              <h2>Account</h2>
              {userData ? (
                <>
                  <NavLink to={ROUTES.PROFILE}>Profile</NavLink>
                  <NavLink to={`/profile/${ROUTES.PROFILERESERVEDATE}`}>
                    Reserve Date
                  </NavLink>
                  <NavLink to={`/profile/${ROUTES.PROFILEWISHLIST}`}>
                    Wishlist
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to={ROUTES.REGISTRATION}>Registration</NavLink>
                  <NavLink to={ROUTES.LOGIN}>Login</NavLink>
                </>
              )}
            </div>
            <div className="secondLine">
              <h2>Get In Touch</h2>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:AdminAdmin123@gmail.com"
              >
                Write with Email
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="tel:+3740010011"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
        <p className="copyright">Copyright © 2025. All rights reserved.</p>
      </div>
    </section>
  );
};

export default Footer;
