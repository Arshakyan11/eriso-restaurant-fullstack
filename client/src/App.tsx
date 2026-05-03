import { Route, Routes } from "react-router-dom";
import "./App.scss";
import LayOut from "./LayOut/LayOut";
import { ROUTES } from "./routes/Routes";
import { Bounce, ToastContainer } from "react-toastify";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProfileLayOut from "./pages/Profile/ProfileLayOut/ProfileLayOut";
import {
  AboutUS,
  ContactUs,
  EachProduct,
  Home,
  Login,
  Menu,
  NotFound,
  OurRestourants,
  Profile,
  ProfileReservation,
  ProfileWishList,
  Registration,
  Reservation,
  Search,
  Staff,
} from "./pages";
import ProtectedRoute from "./helpers/ProtectedRoute";
import { useEffect } from "react";
import { isTokenValid } from "./helpers/checkToken";
import { useAppDispatch } from "./store/store";
import { getWishlistThunk } from "./store/api/api";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checking = isTokenValid();
    if (checking) {
      dispatch(getWishlistThunk());
    }
  }, []);
  return (
    <div>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        style={{ zIndex: "1000", top: "10px" }}
        limit={5}
      />
      <Routes>
        <Route path={ROUTES.HOME} element={<LayOut />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.MENU} element={<Menu />} />
          <Route path={ROUTES.ABOUTUS} element={<AboutUS />} />
          <Route path={ROUTES.RESTAURANTS} element={<OurRestourants />} />
          <Route path={ROUTES.Search} element={<Search />} />
          <Route path={ROUTES.RESERVATION} element={<Reservation />} />
          <Route path={ROUTES.STAFF} element={<Staff />} />
          <Route path={ROUTES.CONTACTUS} element={<ContactUs />} />
          <Route path={ROUTES.REGISTRATION} element={<Registration />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.EACHPRODUCT} element={<EachProduct />} />
          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.PROFILE} element={<ProfileLayOut />}>
              <Route index element={<Profile />} />
              <Route
                path={ROUTES.PROFILERESERVEDATE}
                element={<ProfileReservation />}
              />
              <Route
                path={ROUTES.PROFILEWISHLIST}
                element={<ProfileWishList />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
