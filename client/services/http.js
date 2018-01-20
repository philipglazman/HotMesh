import R from "ramda";
import debug from "debug";

import AppError from "./app-error";

const debugRequest = debug("http");

const setDefaultMethod = R.over(R.lensProp("method"), R.defaultTo("GET"));

const setDefaultHeaders = config => {
  if (!config.headers) {
    config.headers = {};
  }

  return config;
};

const setDefaultContentTypeHeader = R.over(R.lensProp("headers"), headers => {
  if (!headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
});

const setDefaultAcceptHeader = R.over(R.lensProp("headers"), headers => {
  if (!headers["Accept"]) {
    headers["Accept"] = "application/json";
  }
  return headers;
});

const urlEncoded = headers => {
  const contentType = headers["Content-Type"];
  return contentType === "application/x-www-form-urlencoded";
};

const urlEncodeData = data => {
  const encodedComponents = Object.keys(data).map(key => {
    const value = data[key];
    return encodeURIComponent(key) + "=" + encodeURIComponent(value);
  });

  return encodedComponents.join("&");
};

const serializeBody = R.ifElse(
  R.and(R.propIs(Object, "body"), R.propSatisfies(urlEncoded, "headers")),
  R.over(R.lensProp("body"), urlEncodeData),
  R.over(R.lensProp("body"), JSON.stringify),
);

const withDefaults = R.compose(
  serializeBody,
  setDefaultAcceptHeader,
  setDefaultContentTypeHeader,
  setDefaultHeaders,
  setDefaultMethod,
);

const performRequest = async (url, config) => {
  return new Promise((resolve, reject) => {
    debugRequest(`--> ${config.method} ${url}`);
    fetch(url, config)
      .then(response => {
        debugRequest(`<-- ${config.method} ${url} ${response.statusText}`);
        if (response.ok) {
          resolve(response);
        } else {
          reject(new AppError(response.status, response.statusText));
        }
      })
      .catch(error => {
        reject(new AppError(0, "Could not fetch"));
      });
  });
};

const parseResponse = async response => {
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    body: await response.json(),
  };
};

const getResponse = R.composeP(parseResponse, performRequest);

export const request = async (url, originalConfig = {}) => {
  const config = withDefaults(originalConfig);
  const response = await getResponse(url, config);
  if (response.ok) {
    return response;
  } else {
    throw response;
  }
};
