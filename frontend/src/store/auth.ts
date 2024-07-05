import { create } from "zustand";
import { User } from "../types/user";
import { UserWithTokens } from "../types/auth";
import { setCookie, getCookie, removeCookie } from "../customHooks/useCookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { AccessAndRefreshTokens } from "../types/token";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  tokens: AccessAndRefreshTokens | null;
  login: (user: User) => void;
  setTokens: (tokens: AccessAndRefreshTokens) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  loading: true,
  tokens: null,
  login: (user) => {
    set({ isAuthenticated: true, user, loading: false });
  },
  logout: () => {
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
    set({ isAuthenticated: false, user: null, loading: false });
  },
  setTokens: (tokens) => {
    setCookie(ACCESS_TOKEN, tokens.access.token, tokens.access.expires);
    setCookie(REFRESH_TOKEN, tokens.refresh.token, tokens.refresh.expires);
    set({ tokens });
  },
}));
