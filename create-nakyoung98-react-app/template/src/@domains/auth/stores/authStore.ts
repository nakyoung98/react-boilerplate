import { create } from "zustand";
import { AuthState, AuthActions } from "../types/authStore.type";
import JWTUtils from "../utils/jwt.util";
import { devtools } from "zustand/middleware";

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set) => ({
      accessToken: null,
      tokenPayload: null,

      setAccessToken: (accessToken: string) =>
        set(() => {
          return { accessToken, tokenPayload: JWTUtils.getPayload(accessToken) };
        }),

      setTokenPayload: (accessToken: string) => set({ tokenPayload: JWTUtils.getPayload(accessToken) }),
    }),
    {
      name: "auth-store",
    }
  )
);
