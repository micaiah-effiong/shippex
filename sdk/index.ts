import { jwtDecode } from "jwt-decode";
import * as api from "./generated";
import { ApiRequestOptions } from "./generated/core/ApiRequestOptions";
import { storageKey } from "../utils/keys";

// api.OpenAPI.BASE = import.meta.env.VITE_APP_BASE_API;

export const apiConfig = api;

apiConfig.OpenAPI.TOKEN = async (_: ApiRequestOptions) => {
  const token = getTokenFromStore(storageKey.token);
  console.log("getting token", token);
  return token;
};

export function getTokenFromStore(key: string) {
  const rawToken = localStorage.getItem(key) ?? "null";
  const parsedToken = JSON.parse(rawToken) ?? null;

  if (parsedToken === null) {
    return parsedToken;
  }

  const decoded = jwtDecode(rawToken);
  const expireAt = (decoded.exp || 0) * 1000;

  if (expireAt < Date.now()) {
    // localStorage.setItem(key, JSON.stringify(null));
    // localStorage.setItem(storageKey.user, JSON.stringify(null));
    // ("/login");
    return null;
  }

  return parsedToken;
}
