import { SigninResquestDTO } from "@network/types/dtos/auth.dto";
import { http, HttpResponse } from "msw";

import * as jose from "jose";
import { ERROR_CODE } from "@network/consts/error";

const SECRET = new TextEncoder().encode("test");

async function createToken(payload: any) {
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("5m")
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
    "/signin",
    async ({ request }) => {
      const params = (await request.json()) as SigninResquestDTO;

      switch (params.id) {
        case "test": {
          const payload = {
            sub: params.id,
          };
          const accessToken = await createToken(payload);
          return HttpResponse.json({
            accessToken,
          });
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
];
