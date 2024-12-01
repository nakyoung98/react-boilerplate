import { describe, test, expect } from "vitest";
import JWTUtils from "@domains/auth/utils/jwt.util";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const tokenJson = {
  header: {
    alg: "HS256",
    typ: "JWT",
  },
  payload: {
    sub: "1234567890",
    name: "John Doe",
    iat: 1516239022,
  },
};

describe("getPayload", () => {
  test("Token에서 Payload 추출하기", () => {
    const result = JWTUtils.getPayload(token);
    expect(result).toEqual(tokenJson.payload);
  });
});
