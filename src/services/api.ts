import { dataURLtoBlob } from "./utils";
const BASE_URL = "http://localhost:8000/api/v1/";

interface FetchOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers: Record<string, string>;
  body?: string;
}

export const commonFetch = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  queryParams?: string,
  queryString?: string,
  payload?: unknown,
  optionalHeaders?: Record<string, string>
): Promise<any> => {
  try {
    let finalEndPoint = process.env.BASE_URL || BASE_URL;
    if (queryParams) {
      finalEndPoint += queryParams;
    }
    if (queryString) {
      finalEndPoint += "?" + queryString;
    }

    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    };

    const token = localStorage.getItem("token");
    if (token) {
      headers = { ...headers, Authorization: `Bearer ${JSON.parse(token)}` };
    }
    if (optionalHeaders) {
      headers = { ...headers, ...optionalHeaders };
    }
    let content: FetchOptions;
    switch (method) {
      case "POST":
      case "PATCH":
        content = {
          method,
          headers,
          body: JSON.stringify(payload),
        };
        break;
      case "GET":
      case "DELETE":
        content = {
          method,
          headers,
        };
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    const response = await fetch(finalEndPoint, content);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadFile = async (file: string, userId: string) => {
  try {
    const blob = dataURLtoBlob(file);
    const formData = new FormData();
    console.log(blob);
    formData.append("file", blob, "capture-image.jpg");
    formData.append("timestamp", new Date().toISOString());
    formData.append("device", "web-camera");
    const token = localStorage.getItem("token");
    const response = await fetch(BASE_URL + `files/uploadFile/${userId}`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Upload successful: ", result);
    return result;
  } catch (error) {
    console.error("Upload Failed: ", error);
    throw error;
  }
};
