import { toast, Theme } from "react-toastify";

export const toastConfig = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 7000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light" as Theme | undefined,
};


// export const toastSuccess = (message: string) => toast.success(message, toastConfig);

// export const toastError = (message: string) => toast.error(message, toastConfig);
