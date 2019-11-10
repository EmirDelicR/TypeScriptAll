import { HTTP } from "@/plugins/axios/config";

interface dataRequest {
  url: string;
  data?: object;
}

const getApiData = async (request: dataRequest) => {
  try {
    const result = await HTTP.get(request.url);
    return result;
  } catch (error) {
    console.error(error);
  }
};

const postApiData = async (request: dataRequest) => {
  const jsonData = JSON.stringify(request.data);

  try {
    const result = await HTTP.post(request.url, jsonData);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export { getApiData, postApiData };
