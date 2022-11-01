import { post, get } from ".";

const ISSUANCES = "issuances";

export async function createTemplate(template) {
  return await post({ template }, ISSUANCES);
}

export async function getTemplates() {
  return await get(ISSUANCES);
}
