import "./ProfileNav.scss";
import { NavLink, useNavigate, type NavigateFunction } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LogOutFromAccount } from "../../../helpers/logOut";
import { FaRightToBracket } from "react-icons/fa6";
import { ROUTES } from "../../../routes/Routes";
import { useAppSelector } from "../../../store/store";
import { getUserInfo } from "../../../store/AuthSlice/AuthSlice";
const ProfileNav = () => {
  const navigate: NavigateFunction = useNavigate();
  const { userInfo } = useAppSelector(getUserInfo);

  return (
    <nav className="miniNav">
      <div className="miniNavSec">
        <div className="topSide">
          <FaUser />
          <p>
            Welcome back! <br />
            {userInfo?.userName}
          </p>
          <p>
            Phone <br />
            {userInfo?.phoneNumber}
          </p>
        </div>
        <div className="bottomSide">
          <NavLink to={`/${ROUTES.PROFILE}`} end>
            Profile
          </NavLink>
          <NavLink to={`${ROUTES.PROFILERESERVEDATE}`}>Reservations</NavLink>
          <NavLink to={`${ROUTES.PROFILEWISHLIST}`}>Wishlist</NavLink>
          <button
            onClick={() => {
              LogOutFromAccount(navigate);
            }}
          >
            <FaRightToBracket />
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ProfileNav;
