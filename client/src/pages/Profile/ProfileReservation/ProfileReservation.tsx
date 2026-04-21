import { useEffect } from "react";
import styles from "./ProfileReservation.module.scss";
import { reserveDate } from "../../../components/Images";
import { Link } from "react-router-dom";
import { deletingReservationTime } from "../../../store/api/api";
import Aos from "aos";
import { getUserInfo } from "../../../store/AuthSlice/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import ProfileNotLogedMesComponent from "../../../components/ProfileNotLogedMesComponent/ProfileNotLogedMesComponent";
import { ROUTES } from "../../../routes/Routes";

const ProfileReservation = () => {
  const { userInfo } = useAppSelector(getUserInfo);
  const isTrue = !!userInfo?.reservation;
  const date = userInfo?.reservation?.date?.split("T");
  const dispatch = useAppDispatch();
  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);
  if (!userInfo) {
    return <ProfileNotLogedMesComponent />;
  }
  return (
    <div className={styles.reserveDate}>
      <div className={styles.header}>
        <img src={reserveDate} alt="imgReserve" />
        <p className={styles.resereveInfoTextMain}>Your Tabel Bookings</p>
        <p className={styles.resereveInfoTextMiddle}>
          Here you can view and manage your upcoming table reservation
        </p>
        <p className={styles.resereveInfoTextLast}>
          Make sure to arrive on time and contact us if you need to modify or
          cancel a booking.
        </p>
      </div>
      <div className={styles.reserveDateInfo}>
        {isTrue ? (
          <div className={styles.reserveMainInfo}>
            <div className={styles.eachLine}>
              <p>Address:</p>
              <p>{userInfo.reservation?.address}</p>
            </div>
            <div className={styles.eachLine}>
              <p>Date:</p>
              <p>{date?.[0]}</p>
            </div>
            <div className={styles.eachLine}>
              <p>Time:</p>
              <p>{date?.[1]}</p>
            </div>
            <div className={styles.eachLine}>
              <p>Number of Guests:</p>
              <p>{userInfo.reservation?.count} people</p>
            </div>
            <div className={styles.eachLine}>
              <p>Table Experience:</p>
              <p>{userInfo.reservation?.tableType}</p>
            </div>
            <div className={styles.eachLine}>
              <p>Reservation Status:</p>
              <p>Confirmed✅</p>
            </div>
            <button onClick={() => dispatch(deletingReservationTime())}>
              Delete Reservation
            </button>
          </div>
        ) : (
          <div className={styles.reserveNotFound}>
            <p>
              At this very time you didnt have any reservation , but you can go
              to reservation page and do it!
            </p>
            <Link to={`/${ROUTES.RESERVATION}`}>Reservation</Link>
          </div>
        )}
        <div className={styles.noteSec}>
          <h2>attention!!</h2>
          <p>
            <strong>Arrival:</strong> Please arrive at least 10 minutes before
            your reservation time to ensure timely seating.
          </p>
          <p>
            <strong>Running Late?</strong> Let us know by calling us at (123)
            456-7890 so we can hold your table a little longer.
          </p>
          <p>
            <strong>Group Changes:</strong> If the number of guests changes,
            please update your reservation in advance.
          </p>
          <p>
            <strong>Cancellations:</strong> You can cancel or reschedule your
            booking up to 2 hours before your reserved time.
          </p>
          <p>
            <strong>Special Requests:</strong> Have allergies or special needs?
            Leave a note when reserving or contact us directly.
          </p>
          <p>
            <strong>Payment:</strong> Payments are made at the restaurant. No
            upfront charges are required for reservations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileReservation;
