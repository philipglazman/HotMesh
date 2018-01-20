import debug from "debug";
const debugStorage = debug("storage");
import AppError from "./app-error";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new AppError(401, "No access token");
  } else {
    debugStorage("Getting access token `%s`", accessToken);
    return accessToken;
  }
};

export const hasAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return !!accessToken;
};

export const saveAccessToken = accessToken => {
  debugStorage("Saving token %s", accessToken);
  localStorage.setItem("accessToken", accessToken);
};

export const clearAccessToken = () => {
  debugStorage("Clearing token");
  localStorage.removeItem("accessToken");
};

export const saveSidebarMsg = id => {
  localStorage.setItem(`message-${id}`, true);
};

export const hasSidebarMsg = id => {
  const msg = localStorage.getItem(`message-${id}`);
  return !!msg;
};

export const clearSidebarMsg = id => {
  localStorage.removeItem(`message-${id}`);
};
