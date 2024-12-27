import { AuthAPI } from "./auth.api";

export const PUBLIC_API = ["/public", AuthAPI.SIGN_IN] as const;
