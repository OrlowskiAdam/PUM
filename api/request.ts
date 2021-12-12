import {OAUTH_ACCESS_TOKEN} from "../constants/constants";
import {AsyncStorage} from "react-native";

export interface Options {
  url: string;
  method: string;
  body?: any;
  header?: string;
}

const retrieveToken = async () => {
  return await AsyncStorage.getItem(OAUTH_ACCESS_TOKEN);
}

const request = async (options: Options): Promise<any> => {
  const headers = new Headers();
  if (!options.header) {
    headers.append("Content-Type", "application/json;charset=utf-8");
  }

  await retrieveToken()
      .then(token => {
        if (token) {
          headers.append(
              "Authorization",
              "Bearer " + token,
          );
        }
      });

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      }),
  );
};

export default request;
