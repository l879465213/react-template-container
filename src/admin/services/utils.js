import moment from "moment";
import qs from "query-string";
import consts from "../libs/consts";

export const getFileUri = (path) => {
  if (path) {
    return consts.fileApiUrl + "/" + path;
  } else {
    return "";
  }
};
export const formatTime = (time, format) => {
  if (!time) {
    return "";
  }
  return moment(time).utc().format(format);
};

export const getLoaclImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const fs = new FileReader();
    fs.onload = () => {
      file.uri = fs.result;
      resolve(file);
    };
    fs.readAsDataURL(file);
  });
};

export const makeData = (data) => [
  { label: "전체", name: "전체", value: "" },
  ...data,
];
export const makeHtmlFile = (html) => {
  return new File([html], Date.now() + ".txt", {
    type: "text/plain",
  });
};
export const replaceQuery = (history, location, json) => {
  history.replace(
    location.pathname +
      "?" +
      qs.stringify({ ...qs.parse(location.search), ...json })
  );
};
export const parseSearch = (location) => {
  return qs.parse(location.search);
};
export function formatPhoneNumber(phoneNumberString) {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return "" + match[1] + "-" + match[2] + "-" + match[3];
  } else {
    return phoneNumberString;
  }
}
