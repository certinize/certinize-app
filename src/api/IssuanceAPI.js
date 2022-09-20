import { post } from ".";

const ISSUANCES = "issuances";

export async function createTemplate(uuid) {
  return await post({ uuid }, ISSUANCES);
}
