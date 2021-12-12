import { ACCESS_TOKEN } from "../constants/constants";

export interface Options {
  url: string;
  method: string;
  body?: any;
  header?: string;
}

const request = (options: Options): Promise<any> => {
  const headers = new Headers();
  if (!options.header) {
    headers.append("Content-Type", "application/json;charset=utf-8");
  }

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    );
  }

  const defaults = { headers: headers };
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
