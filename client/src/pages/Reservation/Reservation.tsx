import { useEffect } from "react";
import styles from "./Reservation.module.scss";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { getAllReservationInfo } from "../../store/ReservationSlice/ReservationSlice";
import { reserveTableInfo } from "../../helpers/sendData";
import { FaArrowDown } from "react-icons/fa6";
import { userReservationValidation } from "../../helpers/useValidation";
import LineInfo from "../../components/LineInfo/LineInfo";
import { restInfo1, restInfo2, restInfo3 } from "../../components/Images";
import Aos from "aos";
import { getCurrentTime } from "../../helpers/createTime";
import { getLocalUserStrict } from "../../store/api/api";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ROUTES } from "../../routes/Routes";
const Reservation = () => {
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  const dispatch = useAppDispatch();
  const { initialValues } = useAppSelector(getAllReservationInfo);
  const userInfo = getLocalUserStrict();
  return (
    <section className={styles.resSec}>
      <div className={styles.container}>
        <div className={styles.reserveSec}>
          <div className={styles.header} data-aos="fade-up">
            <p>Hello,New Friend</p>
            <p>Reserve Your Table</p>
            <div className={styles.buttons}>
              <Link to={`/${ROUTES.MENU}`}>Open Menu</Link>
              <Link to={`/${ROUTES.RESTAURANTS}`}>Open Our Addresses</Link>
            </div>
          </div>
          {userInfo ? (
            <div className={styles.forLoginedPeople} data-aos="fade-up">
              <div className={styles.reservation}>
                <h3>Reservation</h3>
                <Formik
                  initialValues={initialValues}
                  validationSchema={userReservationValidation}
                  onSubmit={(e, form) => {
                    reserveTableInfo(e, form, dispatch);
                  }}
                >
                  <Form>
                    <fieldset>
                      <legend>
                        <ErrorMessage name="address" component="div" />
                      </legend>
                      <FaArrowDown />
                      <Field
                        name="address"
                        as="select"
                        className={styles.firstInput}
                      >
                        <option value="" hidden>
                          Select Restaurnat Address
                        </option>
                        <option value="5125 Melrose Avenue Los Angeles, CA 90038">
                          3 Amiryan Street, Yerevan 0010, Armenia
                        </option>
                        <option value="5125 Melrose Avenue Los Angeles, CA 90038">
                          5125 Melrose Avenue Los Angeles, CA 90038
                        </option>
                        <option value="1-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan">
                          1-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan
                        </option>
                      </Field>
                    </fieldset>
                    <fieldset>
                      <legend>
                        <ErrorMessage name="date" component="div" />
                      </legend>
                      <div className={styles.diferentInput}>
                        <label htmlFor="dateIn">Select Reservation Time</label>
                        <Field
                          name="date"
                          type="datetime-local"
                          min={getCurrentTime()}
                          placeholder="Time"
                          id="dateIn"
                        />
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend>
                        <ErrorMessage name="count" component="div" />
                      </legend>
                      <Field
                        name="count"
                        placeholder="Number of Guests"
                        type="number"
                        min={1}
                        max={24}
                      />
                    </fieldset>
                    <fieldset>
                      <legend>
                        <ErrorMessage name="tableType" component="div" />
                      </legend>
                      <FaArrowDown />
                      <Field name="tableType" as="select">
                        <option value="" hidden>
                          Select Your Table Experience
                        </option>
                        <option value="Standard Seating">
                          Standard Seating
                        </option>
                        <option value="Premium Service Table">
                          Premium Service Table
                        </option>
                        <option value="Scenic View Table">
                          Scenic View Table
                        </option>
                      </Field>
                    </fieldset>
                    <div className={styles.buttons}>
                      <button type="submit">Reserve</button>
                      <button type="reset">Cancel</button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          ) : (
            <div className={styles.forNotlogined}>
              <div className={styles.sectionInfo} data-aos="fade-up">
                <h3>Reservation</h3>
                <p>To reserve a table, please create an account</p>
                <p>
                  If you already have one, simply log in to your account to
                  continue.
                </p>
                <div className={styles.buttons}>
                  <Link to={`/${ROUTES.REGISTRATION}`}>Register Account</Link>
                  <Link to={`/${ROUTES.LOGIN}`}>Login to your Account</Link>
                </div>
              </div>
            </div>
          )}
          <div className={styles.infoAboutRestaurant}>
            <LineInfo
              img={restInfo1}
              eachElName={"Discover Our Story"}
              middleTitle={"We Invite You to Visit Our Restaurant"}
              info={
                "Curious about what makes our restaurant truly special? From our humble beginnings to our passion for fresh, local ingredients and warm hospitality, discover the story behind every dish we serve. Click here to learn more about our journey, our values, and the people dedicated to making your dining experience unforgettable."
              }
              linkTo={`/${ROUTES.ABOUTUS}`}
            />
            <LineInfo
              data-aos="fade-up"
              img={restInfo2}
              eachElName={"Our Staff"}
              middleTitle={"Meet the masters behind the menu"}
              info={
                "Our chefs are the heart of our kitchen — blending skill, creativity, and passion to craft every dish with care. With years of experience and a deep love for culinary excellence, they bring bold flavors, fresh ingredients, and artistic presentation to your plate. Get to know the talented team that turns every meal into a memorable experience."
              }
              linkTo={`/${ROUTES.STAFF}`}
              order={-1}
            />
            <LineInfo
              data-aos="fade-up"
              img={restInfo3}
              eachElName={"Search Meals"}
              middleTitle={"Looking for something specific?"}
              info={
                "Whether you're craving a signature dish, exploring dietary options, or planning the perfect meal, use the search to quickly find what you need. Delicious moments are just a few clicks away."
              }
              linkTo={`/${ROUTES.Search}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
