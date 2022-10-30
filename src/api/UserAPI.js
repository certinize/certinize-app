import { getPath } from ".";

const USERS = "users";

const authSolanaUser = async (pubkey) => {
  return await getPath(USERS, pubkey);
};

export { authSolanaUser };
