import { ERROR_CODE } from "@network/consts/error";

export type ErrorCodeType = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
