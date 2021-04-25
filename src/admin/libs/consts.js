let devMode = false;
export default {
  apiUrl: devMode ? "http://localhost:8080" : "",
  fileApiUrl: "",
  defaultQuery: {
    page: 1,
    limit: 5,
  },
};
