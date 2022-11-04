import { getPath, post } from ".";

const USERS = "users";

const authSolanaUser = async (pubkey) => {
  return await getPath(USERS, pubkey);
};

const verifyUser = async (data) => {
  return await post(data, USERS);
};

export { authSolanaUser, verifyUser };
