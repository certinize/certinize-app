import { get } from ".";

const USERS = "users";

export async function authSolanaUser(publicKey) {
  await get(USERS, publicKey);
}
