import styles from "./Profile.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userDataEditing } from "../../helpers/useValidation";
import {
  getAllProfileInfo,
  setTypeOfChanginPass,
  setTypeofOldPassowrd,
} from "../../store/ProfileSlice/ProfileSlice";
import { updateDataOnProfile } from "../../helpers/sendData";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getUserInfo } from "../../store/AuthSlice/AuthSlice";
const Profile = () => {
  const dispatch = useAppDispatch();
  const { isHiden, isHiddenOld } = useAppSelector(getAllProfileInfo);
  const { userInfo } = useAppSelector(getUserInfo);
  return (
    <div className={styles.profileSec}>
      <div className={styles.mainProfileSec}>
        <h2>Do You Want to change your passowrd?</h2>
        <Formik
          validationSchema={userDataEditing}
          enableReinitialize
          initialValues={{
            email: userInfo?.email || "",
            password: "",
            newPassword: "",
            newPasswordRepeat: "",
          }}
          onSubmit={(e, form) =>
            updateDataOnProfile(
              {
                email: e.email,
                password: e.password,
                newPassword: e.newPassword,
              },
              form,
              dispatch,
            )
          }
        >
          <Form>
            <fieldset>
              <legend>
                <ErrorMessage name="email" component="div" />
              </legend>
              <Field
                name="email"
                placeholder="Your Email"
                type="text"
                readOnly
              />
            </fieldset>
            <fieldset>
              <legend>
                <ErrorMessage name="password" component="div" />
              </legend>
              <Field
                name="password"
                placeholder="Your Last Password"
                type={isHiddenOld ? "password" : "text"}
              />
              <p
                className={styles.seePassIcon}
                onClick={() => dispatch(setTypeofOldPassowrd(!isHiddenOld))}
              >
                {isHiddenOld ? <FaEye /> : <FaEyeSlash />}
              </p>
            </fieldset>
            <fieldset>
              <legend>
                <ErrorMessage name="newPassword" component="div" />
              </legend>
              <Field
                name="newPassword"
                placeholder="New Password"
                type={isHiden ? "password" : "text"}
              />
              <p
                className={styles.seePassIcon}
                onClick={() => dispatch(setTypeOfChanginPass(!isHiden))}
              >
                {isHiden ? <FaEye /> : <FaEyeSlash />}
              </p>
            </fieldset>
            <fieldset>
              <legend>
                <ErrorMessage name="newPasswordRepeat" component="div" />
              </legend>
              <Field
                name="newPasswordRepeat"
                placeholder="Repeat New Password"
                type={isHiden ? "password" : "text"}
              />
              <p
                className={styles.seePassIcon}
                onClick={() => dispatch(setTypeOfChanginPass(!isHiden))}
              >
                {isHiden ? <FaEye /> : <FaEyeSlash />}
              </p>
            </fieldset>
            <div className={styles.buttons}>
              <button type="submit">Submit</button>
              <button type="reset">Reset</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Profile;
