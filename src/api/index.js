// eslint-disable-next-line no-undef
export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;

export async function post(requestBody, endpoint) {
  try {
    const response = await fetch(`${GATEWAY_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    return await response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function get(endpoint) {
  try {
    const response = await fetch(`${GATEWAY_URL}/${endpoint}`);
    return await response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

export async function getPath(path, param) {
  try {
    const response = await fetch(`${GATEWAY_URL}/${path}/${param}`);
    return await response.json();
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
