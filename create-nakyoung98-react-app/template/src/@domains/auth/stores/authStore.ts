import { create } from "zustand";
import { AuthState, AuthActions } from "../types/authStore.type";
import JWTUtils from "../utils/jwt.util";

export const authStore = create<AuthState & AuthActions>()((set) => ({
  accessToken: null,
  tokenPayload: null,

  setAccessToken: (accessToken) => set({ accessToken }),
  setTokenPayload: (accessToken) => {
    set({ tokenPayload: JWTUtils.getPayload(accessToken) });
  },
}));
