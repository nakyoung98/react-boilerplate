export const JWTUtils = {
  getPayload: (jwt: string) => {
    const rawPayload = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(rawPayload)
        .split("")
        .map(
          (letter) => "%" + ("00" + letter.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );

    return JSON.parse(jsonPayload);
  },
  isExpValid: (payload: Record<string, any>) => {
    if (payload !== null && payload.exp && payload.exp * 1000 > Date.now()) {
      return true;
    }
    return false;
  },
};

export default JWTUtils;
