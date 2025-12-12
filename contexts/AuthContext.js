"use client";
import React, { createContext, useContext, useReducer, useEffect, useMemo } from "react";
import { API_BASE_URL } from "@/utils/config";
import { usePathname } from "next/navigation";
// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false, // Start as false, only set to true when checking auth
  error: null,
  forgotPasswordSuccess: false,
  resetPasswordSuccess: false,
};

// Auth actions
export const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_USER: "SET_USER",
  FORGOT_PASSWORD_START: "FORGOT_PASSWORD_START",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILURE: "FORGOT_PASSWORD_FAILURE",
  RESET_PASSWORD_START: "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAILURE: "RESET_PASSWORD_FAILURE",
};

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case AUTH_ACTIONS.FORGOT_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        forgotPasswordSuccess: false,
      };
    case AUTH_ACTIONS.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        forgotPasswordSuccess: true,
      };
    case AUTH_ACTIONS.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        forgotPasswordSuccess: false,
      };
    case AUTH_ACTIONS.RESET_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        resetPasswordSuccess: false,
      };
    case AUTH_ACTIONS.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        resetPasswordSuccess: true,
      };
    case AUTH_ACTIONS.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        resetPasswordSuccess: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const pathname = usePathname();

  const checkAuthStatus = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: "GET",
        credentials: "include", // Include cookies
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: AUTH_ACTIONS.SET_USER,
          payload: {
            user: data.data.user,
            token: data.token,
          },
        });
      } else {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });

      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Small delay to ensure cookie is set before redirecting
        await new Promise(resolve => setTimeout(resolve, 300));
        
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: data.data.user,
            token: data.token,
          },
        });
        return { success: true, data };
      } else {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAILURE,
          payload: data.message || "Login failed",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: "Network error. Please try again.",
      });
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  const forgotPassword = async (email) => {
    try {
      dispatch({ type: AUTH_ACTIONS.FORGOT_PASSWORD_START });

      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: AUTH_ACTIONS.FORGOT_PASSWORD_SUCCESS });
        return { success: true, data };
      } else {
        dispatch({
          type: AUTH_ACTIONS.FORGOT_PASSWORD_FAILURE,
          payload: data.message || "Failed to send reset email",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      dispatch({
        type: AUTH_ACTIONS.FORGOT_PASSWORD_FAILURE,
        payload: "Network error. Please try again.",
      });
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const resetPassword = async (
    token,
    password,
    passwordConfirm,
    userType = "client"
  ) => {
    try {
      dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_START });

      const response = await fetch(
        `${API_BASE_URL}/api/auth/reset-password/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ password, passwordConfirm, userType }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_SUCCESS });
        return { success: true, data };
      } else {
        dispatch({
          type: AUTH_ACTIONS.RESET_PASSWORD_FAILURE,
          payload: data.message || "Failed to reset password",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Reset password error:", error);
      dispatch({
        type: AUTH_ACTIONS.RESET_PASSWORD_FAILURE,
        payload: "Network error. Please try again.",
      });
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const setPassword = async (email, userId, password, confirmPassword) => {
    try {
      dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_START });

      const response = await fetch(`${API_BASE_URL}/api/auth/set-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, userId, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: AUTH_ACTIONS.RESET_PASSWORD_SUCCESS });
        return { success: true, data };
      } else {
        dispatch({
          type: AUTH_ACTIONS.RESET_PASSWORD_FAILURE,
          payload: data.message || "Failed to set password",
        });
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Set password error:", error);
      dispatch({
        type: AUTH_ACTIONS.RESET_PASSWORD_FAILURE,
        payload: "Network error. Please try again.",
      });
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const getUserInfo = async (email, userId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/user?email=${encodeURIComponent(
          email
        )}&userId=${userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Get user info error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const clearSuccessStates = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
    // Reset success states
    if (state.forgotPasswordSuccess || state.resetPasswordSuccess) {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Check auth status once on mount if on dashboard
  useEffect(() => {
    // If dev mode is enabled, auto-authenticate with a test user
    if (process.env.NEXT_PUBLIC_DEV_MODE === "true" && pathname.startsWith("/dashboard")) {
      const devUser = {
        id: "dev-user-123",
        email: "dev@test.com",
        name: "Dev User",
        role: "user"
      };

      dispatch({
        type: AUTH_ACTIONS.SET_USER,
        payload: {
          user: devUser,
          token: "dev-token-bypass",
        },
      });
      return;
    }

    if (pathname.startsWith("/dashboard")) {
      checkAuthStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const value = useMemo(() => ({
    ...state,
    login,
    logout,
    forgotPassword,
    resetPassword,
    setPassword,
    getUserInfo,
    clearError,
    clearSuccessStates,
    checkAuthStatus,
  }), [state, login, logout, forgotPassword, resetPassword, setPassword, getUserInfo, clearError, clearSuccessStates, checkAuthStatus]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
