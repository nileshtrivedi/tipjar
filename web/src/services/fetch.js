class Fetch {
  get = (path, options) => {
    return this._defaultFetch(path, options);
  };

  post = (path, options) => {
    return this._defaultFetch(path, {
      ...options,
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
  };

  _defaultFetch = (path, options) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    return fetch(baseUrl + path, options).then(response => response.json());
  };
}

export default new Fetch();
