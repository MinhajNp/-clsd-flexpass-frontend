import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});


// ✅ REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// ✅ RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle session expiration or invalid token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");
        const newToken = res.data.data.accessToken;
        localStorage.setItem("accessToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userRole");
        window.location.href = "/auth";
      }
    }

    // Handle blocked user or forbidden access (401 or 403)
    const isBlockedError = error.response?.data?.message?.toLowerCase().includes("blocked");
    const isForbiddenOrUnauthorized = error.response?.status === 403 || (error.response?.status === 401 && isBlockedError);

    if (isForbiddenOrUnauthorized) {
      if (window.location.pathname.startsWith('/auth')) {
        return Promise.reject(error);
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      
      // Redirect to login with error param for active users who get blocked
      window.location.href = "/auth?error=blocked";
    }

    return Promise.reject(error);
  }
);

