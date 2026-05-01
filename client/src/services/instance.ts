import axios from "axios";

export const apiClient = axios.create({
  baseURL: "",
  timeout: 10000,
  timeoutErrorMessage: "Request timeout",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("idToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && !window.location.pathname.includes("login")) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const extractErrorMessage = (
  error: unknown,
  manualErrorMessage: string,
) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? manualErrorMessage;
  }
  return "Something Went Wron!!";
};
