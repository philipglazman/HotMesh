import r from "ramda";

const hasValue = value => {
  return value !== null && typeof value !== "undefined";
};

const isEmptyString = value => {
  return value === "";
};

const hasTrueValue = value => {
  return typeof value === "boolean" && value;
};

const hasWhiteSpacesOnly = value => {
  return value.trim() === "";
};

const testRegExp = (value, regexp) => {
  return !hasValue(value) || isEmptyString(value) || regexp.test(value);
};

const email = message => {
  return value => {
    return testRegExp(
      value,
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
      ? undefined
      : { message };
  };
};

const password = message => {
  return value => {
    return testRegExp(
      value,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{6,}/,
    )
      ? undefined
      : { message };
  };
};

const required = message => value => {
  const valid = Array.isArray(value)
    ? r.not(r.isEmpty(value))
    : hasValue(value) && !hasWhiteSpacesOnly(value) && !isEmptyString(value);
  return valid ? undefined : { message };
};

const isChecked = message => value => {
  return hasValue(value) && hasTrueValue(value) ? undefined : { message };
};

export { required, email, isChecked, password };
