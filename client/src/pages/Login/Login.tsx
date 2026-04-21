import styles from "./Login.module.scss";
import { Link, useNavigate, type NavigateFunction } from "react-router-dom";
import { ErrorMessage, Field, Formik, Form } from "formik";
import {
  getAllLoginInfo,
  setLogVisiblePass,
} from "../../store/LoginSlice/LoginSlice";
import { userLoginValidation } from "../../helpers/useValidation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { checkUserSendingData } from "../../helpers/sendData";
import { loginPic, loginPic2 } from "../../components/Images";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { ROUTES } from "../../routes/Routes";
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { isHidenPASS, initialValues } = useAppSelector(getAllLoginInfo);

  return (
    <section className={styles.navBox}>
      <div className={styles.container}>
        <div className={styles.navSection}>
          <div className={styles.leftSec}>
            <img src={loginPic2} alt="" />
            <img
              className={styles.loginPicMobile}
              src={loginPic}
              alt="logImgMobile"
            />
          </div>
          <div className={styles.rightSec}>
            <div className={styles.registration}>
              <h2>Login</h2>
              <span>
                Don't have an account?
                <Link to={`/${ROUTES.REGISTRATION}`}> Sign up</Link>
              </span>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={userLoginValidation}
              onSubmit={(e) => checkUserSendingData(e, dispatch, navigate)}
            >
              <Form>
                <fieldset>
                  <legend>
                    <ErrorMessage name="email" component="div" />
                  </legend>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email Address"
                  />
                </fieldset>
                <fieldset>
                  <legend>
                    <ErrorMessage name="password" component="div" />
                  </legend>
                  <Field
                    name="password"
                    type={isHidenPASS ? "text" : "password"}
                    placeholder="Password"
                  />
                  <p
                    className={styles.seePass}
                    onClick={() => dispatch(setLogVisiblePass(!isHidenPASS))}
                  >
                    {isHidenPASS ? <FaEyeSlash /> : <FaEye />}
                  </p>
                </fieldset>
                <div className={styles.buttons}>
                  <button type="submit">Login</button>
                  <button type="reset">Reset</button>
                </div>
              </Form>
            </Formik>
            <p className={styles.copyRight}>
              Copyright © 2025. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
