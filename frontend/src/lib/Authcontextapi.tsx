"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<any>;
  register: (
    name: string,
    email: string,
    password: string,
    role?: string,
    details?: { businessName?: string; contactNumber?: string; address?: string }
  ) => Promise<any>;
  logout: () => void;
  setToken: (token: string | null) => void;
  fetchRecommendations: (data: { days: number; budget: number; interests: string[] }) => Promise<any>;
  applyForPermit: (data: { userId: string; destination: string; dates: string[] }) => Promise<any>;
  isAuthenticated: boolean;
  hasRole: (required: string | string[]) => boolean;
  // Form state and helpers (to mirror your example structure)
  signInFormData: { email: string; password: string };
  setSignInFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
  signUpFormData: { name: string; email: string; password: string };
  setSignUpFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string; password: string }>>;
  updateSignInForm: (patch: Partial<{ email: string; password: string }>) => void;
  updateSignUpForm: (patch: Partial<{ name: string; email: string; password: string }>) => void;
  resetForms: () => void;
  submitSignIn: () => Promise<any>;
  submitSignUp: () => Promise<any>;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "ladakh_auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, token: null, loading: true });

  const initialSignInFormData = useMemo(() => ({ email: "", password: "" }), []);
  const initialSignUpFormData = useMemo(() => ({ name: "", email: "", password: "", role: "Tourist" }), []);
  const [signInFormData, setSignInFormData] = useState<{ email: string; password: string }>(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState<{ name: string; email: string; password: string; role?: string }>(initialSignUpFormData);

  const NODE_API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/$/, "");
  const FASTAPI_BASE_URL = (process.env.NEXT_PUBLIC_FASTAPI_URL || "http://localhost:8000/api").replace(/\/$/, "");

  const api: AxiosInstance = useMemo(() => axios.create({
    baseURL: NODE_API_BASE_URL,
    headers: { "Content-Type": "application/json" }
  }), [NODE_API_BASE_URL]);

  const fastApi: AxiosInstance = useMemo(() => axios.create({
    baseURL: FASTAPI_BASE_URL,
    headers: { "Content-Type": "application/json" }
  }), [FASTAPI_BASE_URL]);

  // attach bearer
  useEffect(() => {
    const attach = (config: InternalAxiosRequestConfig) => {
      if (state.token) {
        const headers: any = config.headers ?? {};
        headers.Authorization = `Bearer ${state.token}`;
        config.headers = headers;
      }
      return config;
    };
    const id1 = api.interceptors.request.use(attach);
    const id2 = fastApi.interceptors.request.use(attach);
    return () => {
      api.interceptors.request.eject(id1);
      fastApi.interceptors.request.eject(id2);
    };
  }, [api, fastApi, state.token]);

  // Load persisted session
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(AUTH_STORAGE_KEY) : null;
      if (raw) {
        const saved = JSON.parse(raw) as { user: User | null; token: string | null };
        setState({ user: saved.user, token: saved.token, loading: false });
      } else {
        setState((prev) => ({ ...prev, loading: false }));
      }
    } catch {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  const persist = useCallback((user: User | null, token: string | null) => {
    setState({ user, token, loading: false });
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
      }
    } catch {}
  }, []);

  const clear = useCallback(() => {
    setState({ user: null, token: null, loading: false });
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    // Expecting response like { token, user }
    persist(data.user ?? null, data.token ?? null);
    return data;
  }, [persist]);

  const register = useCallback(async (
    name: string,
    email: string,
    password: string,
    role?: string,
    details?: { businessName?: string; contactNumber?: string; address?: string }
  ) => {
    const payload: any = { name, email, password, role };
    if (details) Object.assign(payload, details);
    const { data } = await api.post("/auth/register", payload);
    // If API returns token+user on register, persist it. Otherwise require login.
    if (data?.token) {
      persist(data.user ?? null, data.token);
    }
    return data;
  }, [persist]);

  const logout = useCallback(() => {
    clear();
  }, [clear]);

  const setToken = useCallback((token: string | null) => {
    persist(state.user, token);
  }, [persist, state.user]);

  // Other domain APIs
  const fetchRecommendations = useCallback(async (payload: { days: number; budget: number; interests: string[] }) => {
    const { data } = await fastApi.post("/ai/recommendations", payload);
    return data;
  }, [fastApi]);

  const applyForPermit = useCallback(async (payload: { userId: string; destination: string; dates: string[] }) => {
    const { data } = await fastApi.post("/permits/apply", payload);
    return data;
  }, [fastApi]);

  // Forms helpers
  const updateSignInForm = useCallback((patch: Partial<{ email: string; password: string }>) => {
    setSignInFormData(prev => ({ ...prev, ...patch }));
  }, []);

  const updateSignUpForm = useCallback((patch: Partial<{ name: string; email: string; password: string; role?: string }>) => {
    setSignUpFormData(prev => ({ ...prev, ...patch }));
  }, []);

  const resetForms = useCallback(() => {
    setSignInFormData(initialSignInFormData);
    setSignUpFormData(initialSignUpFormData);
  }, [initialSignInFormData, initialSignUpFormData]);

  const submitSignIn = useCallback(async () => {
    return await login(signInFormData.email, signInFormData.password);
  }, [login, signInFormData.email, signInFormData.password]);

  const submitSignUp = useCallback(async () => {
    return await register(signUpFormData.name, signUpFormData.email, signUpFormData.password, signUpFormData.role);
  }, [register, signUpFormData.name, signUpFormData.email, signUpFormData.password, signUpFormData.role]);

  // Check auth with backend and refresh user if possible
  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      if (!state.token) return false;
      const { data } = await api.get("/auth/me");
      if (data?.user) {
        setState(prev => ({ ...prev, user: data.user }));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [api, state.token]);

  // Attempt to fetch user details when we have a token but no user yet
  useEffect(() => {
    if (state.token && !state.user) {
      checkAuth();
    }
  }, [state.token, state.user, checkAuth]);

  const value = useMemo<AuthContextValue>(() => ({
    user: state.user,
    token: state.token,
    loading: state.loading,
    login,
    register,
    logout,
    setToken,
    fetchRecommendations,
    applyForPermit,
    isAuthenticated: Boolean(state.token),
    hasRole: (required: string | string[]) => {
      if (!state.user?.role) return false;
      const roles = Array.isArray(required) ? required : [required];
      return roles.includes(state.user.role);
    },
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    updateSignInForm,
    updateSignUpForm,
    resetForms,
    submitSignIn,
    submitSignUp,
    checkAuth
  }), [state.user, state.token, state.loading, login, register, logout, setToken, fetchRecommendations, applyForPermit, signInFormData, signUpFormData, updateSignInForm, updateSignUpForm, resetForms, submitSignIn, submitSignUp, checkAuth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

// Optional helper: redirect to /login if not authenticated
export function useRequireAuth(redirectTo: string = "/login") {
  const { isAuthenticated, loading } = useAuth();
  // Lazy import to avoid affecting SSR trees
  const { useRouter } = require("next/navigation");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [loading, isAuthenticated, redirectTo, router]);

  return { isAuthenticated, loading };
}

// Optional gate component to render children only when authenticated
export function AuthGate({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return fallback;
  if (!isAuthenticated) return fallback;
  return <>{children}</>;
}

