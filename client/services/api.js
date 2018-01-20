import { request, requestSecured } from "./http";
const config = window.config || {};

const dateForServer = date => {
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const loginHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export const login = ({ email, password }) =>
  request(`${config.API_ORIGIN}/token`, {
    method: "POST",
    body: {
      grant_type: "password",
      userName: email,
      password,
    },
    headers: loginHeaders,
  });

export const logout = () =>
  requestSecured(`${config.API_ORIGIN}/api/account/logout`, { method: "POST" });

export const signUp = body =>
  request(`${config.API_ORIGIN}/api/account/register`, {
    method: "POST",
    body,
  });
export const confirmEmail = body =>
  request(`${config.API_ORIGIN}/api/account/confirm-email`, {
    method: "POST",
    body,
  });
export const changePassword = body =>
  request(`${config.API_ORIGIN}/api/account/change-password`, {
    method: "POST",
    body,
  });
export const requestPasswordReset = body =>
  request(`${config.API_ORIGIN}/api/account/request-password-reset`, {
    method: "POST",
    body,
  });
export const resetPassword = body =>
  request(`${config.API_ORIGIN}/api/account/reset-password`, {
    method: "POST",
    body,
  });

export const getStrategies = ({ userId }) =>
  requestSecured(`${config.API_ORIGIN}/api/users/${userId}/strategies`);

export const getStrategy = ({ userId, strategyId }) =>
  requestSecured(
    `${config.API_ORIGIN}/api/users/${userId}/strategies/${strategyId}`,
  );

export const getSignals = ({ userId, strategyId }) =>
  requestSecured(
    `${config.API_ORIGIN}/api/users/${userId}/strategies/${strategyId}/signals`,
  );

export const toggleNotifications = (userId, strategyId, enabled) =>
  requestSecured(
    `${config.API_ORIGIN}/api/users/${userId}/strategies/${strategyId}`,
    {
      method: "PATCH",
      body: {
        notificationsEnabled: enabled,
      },
    },
  );

export const strategyProfit = ({ strategyId, date, amount }) =>
  requestSecured(`${config.API_ORIGIN}/api/strategies/${strategyId}/profit`, {
    method: "POST",
    body: { date: dateForServer(date), amount },
  });

export const getCurrentUser = () =>
  requestSecured(`${config.API_ORIGIN}/api/account/me`);

export const getData = ({ exchange, base, quote, fromDate, toDate }) =>
  requestSecured(`${config.API_ORIGIN}/api/exchange-rates/${exchange}/${base}/${quote}?fromDate=${fromDate}&toDate=${toDate}`);
