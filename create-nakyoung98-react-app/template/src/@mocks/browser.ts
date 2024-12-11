import { setupWorker } from "msw/browser";
import { BeerMockAPI } from "./beer.mock";
import { AuthMockAPI } from "./auth.mock";

const handler = [...AuthMockAPI, ...BeerMockAPI]
export const worker = setupWorker(...handler);
