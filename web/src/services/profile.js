import fetch from "services/fetch";

const getProfile = async ({ vanityName }) => {
  let result = null;

  result = await fetch.get(`/profiles?vanity_name=${vanityName}`);

  return result;
};

export { getProfile };
