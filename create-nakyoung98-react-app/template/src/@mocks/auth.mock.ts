import { SigninResquestDTO } from "@network/types/dtos/auth.dto";
import { http, HttpResponse } from "msw";

import * as jose from "jose";
import { ERROR_CODE } from "@network/consts/error";
import { AuthAPI } from "@network/apis/auth.api";

const SECRET = new TextEncoder().encode("test");
const PAYLOAD = {
  sub: "nakyoung",
};

async function createToken(payload: any, isRefresh: boolean = false) {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(isRefresh ? "1M" : "5m")
    .sign(SECRET);

  return token;
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    throw error;
  }
}

export const AuthMockAPI = [
  http.post(
    AuthAPI.SIGN_IN,
    async ({ request }) => {
      const params = (await request.json()) as SigninResquestDTO;

      switch (params.id) {
        case "test": {
          const accessToken = await createToken(PAYLOAD);
          const refreshToken = await createToken(PAYLOAD, true);

          const response = new HttpResponse(JSON.stringify({ accessToken }), {
            headers: {
              "Content-type": "application/json",
              "Set-Cookie": `refresh-token=${refreshToken}; Path=/; HttpOnly; SameSite=Strict`,
            },
          });
          return response;
        }
        default: {
          return HttpResponse.json(
            {
              code: ERROR_CODE.INVALID_AUTH,
              message: "",
            },
            { status: 401 }
          );
        }
      }
    },
    {}
  ),

  http.post(AuthAPI.REFRESH, async ({ cookies }) => {
    const refreshToken = cookies["refresh-token"];
    if (!refreshToken) {
      return new HttpResponse(
        JSON.stringify({
          code: ERROR_CODE.INVALID_TOKEN,
        }),
        { status: 401 }
      );
    }

    try {
      await verifyToken(refreshToken);
    } catch (error) {
      console.error(error);
      return new HttpResponse(
        JSON.stringify({
          code: ERROR_CODE.EXPIRED_TOKEN,
        }),
        { status: 401 }
      );
    }

    const accessToken = await createToken(PAYLOAD);
    return HttpResponse.json({
      accessToken,
    });
  }),
];
