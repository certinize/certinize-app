// eslint-disable-next-line no-undef
export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;

export async function post(requestBody, endpoint) {
  const response = await fetch(`${GATEWAY_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return await response.json();
}

export async function get(endpoint) {
  const response = await fetch(`${GATEWAY_URL}/${endpoint}`);
  return await response.json();
}

export async function getPath(path, param) {
  const response = await fetch(`${GATEWAY_URL}/${path}/${param}`);
  return await response.json();
}
