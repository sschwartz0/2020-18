import { normalize } from "normalizr";
import "whatwg-fetch";

const URL_ROOT = "http://localhost:8080";

const defaultConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  method: "GET",
  mode: "cors",
};

const parseJSON = response => response.json();

export function checkStatus(response, method) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    if (response.status >= 400) {
      // still return response but an error has been received from the server
      return response;
    }

    const error = new Error(response.statusText);
    throw error;
  }
}

export function remote({ bearerToken, url, config, schema }) {
  const remoteConfig = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  };

  if (remoteConfig.method === "GET") {
    delete remoteConfig.body;
  }

  if (
    remoteConfig.headers &&
    remoteConfig.headers["Content-Type"] === "application/json"
  ) {
    remoteConfig.body = JSON.stringify(remoteConfig.body);
  }

  // add the ROOT URL unless it starts with http:// or https://
  const fullUrl = /^https?:\/\//.test(url) ? url : `${URL_ROOT}${url}`;

  return (
    fetch(fullUrl, remoteConfig)
      // tslint:disable-next-line:no-any
      .then(response => checkStatus(response, remoteConfig.method))
      .then(parseJSON)
      // tslint:disable-next-line:no-any
      .then(data => {
        // if error: send error data to remote request redux middleware
        // if (data.data.errors) {
        //   throw data.data.errors;
        // }
        // // if error: send 401 error data to remote request redux middleware
        // if (data.data.error === "unauthorized") {
        //   throw data.data.error;
        // }

        // if (data.data.error) {
        //   throw data.data.error;
        // }
        // // send response data to remote request redux middleware
        // if (schema && data) {
        //   if ("data" in data.data) {
        //     return normalize(data.data.data, schema);
        //   }

        //   return normalize(data.data, schema);
        // }

        return { data };
      })
  );
}
