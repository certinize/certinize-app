import { getPath } from ".";

const ISSUANCES = "issuances";

const getUnsignedMessage = async (pubkey) => {
  return await getPath(ISSUANCES, pubkey);
};

export { getUnsignedMessage };
