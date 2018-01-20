import R from "ramda";
import contentType from "content-type";
import debug from "debug";
import AppError from "./app-error";
import * as storage from "./storage";

const debugRequest = debug("signals:http");

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

const withAccessToken = config => {
  return R.assocPath(
    ["headers", "authorization"],
    `Bearer ${storage.getAccessToken()}`,
    config,
  );
};

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
  // Note that fetch contains the Headers interface inside the headers key,
  // which means we can't do `response.headers.["content-type"]`
  // See more at https://developer.mozilla.org/en-US/docs/Web/API/Headers
  const rawTypeHeader = response.headers.get("content-type") || "text/plain";
  const { type } = contentType.parse(rawTypeHeader);

  // We're only expecting JSON or text.
  if (type === "application/json") {
    debugRequest("Parsing response as JSON");
    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      body: await response.json(),
    };
  }

  debugRequest("Parsing response as plain text");
  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText,
    url: response.url,
    body: await response.text(),
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

export const requestSecured = async (url, config = {}) => {
  return await request(url, withAccessToken(config));
};
