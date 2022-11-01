import { post, getPath } from ".";

const ISSUANCES = "issuances";

const makeIssuanceRequest = async (issuanceRequest) => {
  return await post(issuanceRequest, ISSUANCES);
};

const getUnsignedMessage = async (pubkey) => {
  return await getPath(ISSUANCES, pubkey);
};

export { getUnsignedMessage, makeIssuanceRequest };
