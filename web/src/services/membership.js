import fetch from "services/fetch";

const getMemberships = async ({ creator }) => {
  let result = null;

  result = await fetch.get(`/memberships?creator=${creator}`);

  return result;
};

export { getMemberships };
