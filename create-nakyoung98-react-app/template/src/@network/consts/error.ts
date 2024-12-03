export const ERROR_CODE = {
  //알수없는 에러 (코드 신속히 파악 후 추가 필요)
  UNKNOWN_ERROR: "UNKNOWN001",

  //AUTH 에러
  INVALID_AUTH: "AUTH001",
  INVALID_TOKEN: "AUTH002",
  EXPIRED_TOKEN: "AUTH003",

  //NETWORK 에러
  NETWORK_ERROR: "NETWORK001",
  TIMEOUT: "NETWORK002",
  USER_CANCEL: "NETWORK003 ",
} as const;