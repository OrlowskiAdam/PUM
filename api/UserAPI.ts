import {API_BASE_URL, OAUTH_ACCESS_TOKEN,} from "../constants/constants";
import request from "./request";
import {AsyncStorage} from "react-native";

export async function getCurrentUser(): Promise<any> {
  const token = await AsyncStorage.getItem(OAUTH_ACCESS_TOKEN);
  if (!token) {
    return Promise.reject("No access token set.");
  }
  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

export async function signIn(loginRequest: object): Promise<any> {
  return request({
    url: API_BASE_URL + "/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

export function signUp(signUpRequest: object): Promise<any> {
  return request({
    url: API_BASE_URL + "/signup",
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });
}

