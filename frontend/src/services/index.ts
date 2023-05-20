import axios from "../utils/axiosInstance";

export const signIn = async (credentials: {
  email: string;
  password: string;
}) => {
  const result = await axios.post("/users/signin", credentials);
  return result;
};

export const newUser = async (data: FormData) => {
  const result = await axios.post("/users/new", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};

export const forgotPassoword = async (credentials: { email: string }) => {
  const result = await axios.post("/users/forgot-password", credentials);
  return result;
};

export const resetPassword = async (resetToken: string, password: string) => {
  const result = await axios.post(`/users/reset-password/${resetToken}`, {
    password,
  });
  return result;
};

export const newVerificationRequest = async (data: FormData) => {
  const result = await axios.post("/users/request-verification", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return result;
};

export const verifyAccount = async (id: string) => {
  const result = await axios.put(`/users/verify-account/${id}`);
  return result;
};

export const verifyOtp = async (code: string) => {
  const result = await axios.post(`/users/verify-otp`, { code });
  return result;
};

export const getRequestById = async (id: string) => {
  const result = await axios.get(`/users/view-request/${id}`);
  return result;
};

export const getAllUsers = async () => {
  const result = await axios.get("/users");
  return result;
};

