import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";

const API_URL = "http://10.0.2.2:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor registered once
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: basic logging (remove if you want totally silent failures)
    if (error.response) {
      console.warn(
        `API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        {
          status: error.response.status,
          endpoint: error.config?.url,
          method: error.config?.method,
        }
      );
    } else if (error.request) {
      console.warn("API request failed - no response", {
        endpoint: error.config?.url,
        method: error.config?.method,
      });
    } else {
      console.warn("API request failed - unknown error", error.message);
    }

    return Promise.reject(error);
  }
);

export const useApi = () => {
  const { getToken } = useAuth();

  const apiWithAuth = useCallback(
    async <T>(config: Parameters<typeof api.request>[0]) => {
      const token = await getToken();

      return api.request<T>({
        ...config,
        headers: {
          ...config.headers,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
    },
    [getToken]
  );

  return { api, apiWithAuth };
};
