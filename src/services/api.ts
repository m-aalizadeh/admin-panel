const BASE_URL = "http://localhost:8000/api/v1/";

interface FetchOptions {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  headers: Record<string, string>;
  body?: string;
}

interface User {
  accessToken?: string;
}

export const commonFetch = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  queryParams?: string,
  queryString?: string,
  payload?: unknown
): Promise<any> => {
  try {
    let finalEndPoint = process.env.BASE_URL || BASE_URL;
    if (queryParams) {
      finalEndPoint += queryParams;
    }
    if (queryString) {
      finalEndPoint += "?" + queryString;
    }

    const userString = localStorage.getItem("user");
    const user: User | null = userString ? JSON.parse(userString) : null;

    let headers: Record<string, string> = {
      "Content-Type": "application/json",
      pragma: "no-cache",
      "cache-control": "no-cache",
    };

    if (user?.accessToken) {
      headers = { ...headers, Authorization: `Bearer ${user.accessToken}` };
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
