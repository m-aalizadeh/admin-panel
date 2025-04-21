import { dataURLtoBlob } from "./utils";
const BASE_URL = "http://localhost:8000/api/v1/";

interface FetchOptions extends RequestInit {
  headers: Record<string, string>;
  credentials?: RequestCredentials;
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

    if (optionalHeaders) {
      headers = { ...headers, ...optionalHeaders };
    }
    let content: FetchOptions = { headers, credentials: "include" };
    switch (method) {
      case "POST":
      case "PATCH":
        content = {
          ...content,
          method,

          body: JSON.stringify(payload),
        };
        break;
      case "GET":
      case "DELETE":
        content = {
          ...content,
          method,
        };
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    const response = await fetch(finalEndPoint, content);
    if (!response.ok && response.status === 401) {
      window.location.href = "/signin";
      throw new Error("User is not authorized / Token got expired!!!");
    }
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
    formData.append("file", blob, "capture-image.jpg");
    formData.append("timestamp", new Date().toISOString());
    formData.append("device", "web-camera");
    const response = await fetch(BASE_URL + `files/uploadFile/${userId}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Upload Failed: ", error);
    throw error;
  }
};
