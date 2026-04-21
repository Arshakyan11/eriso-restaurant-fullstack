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
function App() {
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
      </Routes>
    </div>
  );
}

export default App;
