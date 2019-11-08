import { HTTP } from "@/plugins/axios/config";

/**
 *
 * @param url - url to api call example cities/  make cal to(/api/cities/)
 * @param token - user token default null
 * @returns response from server
 */
const getApiData = async (url: string, token: string | null = null) => {
  let result;
  /** @ed TODO - refactor this */
  try {
    if (token) {
      let auth = {
        headers: setAuthorization(token)
      };

      result = await HTTP.get(url, auth);
      return result;
    } else {
      result = await HTTP.get(url);
      return result;
    }
  } catch (error) {
    return error.response;
  }
};

/**
 *
 * @param url to api call example cities/  make cal to(/api/cities/)
 * @param data
 * @param token - user token default null
 * @returns response from server
 */
const postApiData = async (
  url: string,
  data: object,
  token: string | null = null
) => {
  let auth = {};
  const jsonData = JSON.stringify(data);

  try {
    let result;
    if (token) {
      auth = {
        headers: setAuthorization(token)
      };
    }
    result = await HTTP.post(url, jsonData, auth);
    return result;
  } catch (error) {
    if (typeof error.response !== "undefined") {
      return error.response;
    }

    return {
      data: {
        message: error.message || error
      }
    };
  }
};

const setAuthorization = (token: string) => {
  return { Authorization: "Token " + token };
};

export { getApiData, postApiData };
