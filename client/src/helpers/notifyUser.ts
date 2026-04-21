import { Bounce, toast, type ToastOptions } from "react-toastify";

export const notifyForSMth = (mess: string) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type: "success",
    className: "toastifyEditing",
  };
  toast(mess, options);
};

export const notifyForError = (mess: string) => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    type: "error",
    className: "toastifyEditing",
  };
  toast(mess, options);
};
