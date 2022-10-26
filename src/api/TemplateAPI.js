import { post, get } from ".";

const TEMPLATES = "templates";

export async function createTemplate(images) {
  return await post(images, TEMPLATES);
}

export async function getTemplates() {
  return await get(TEMPLATES);
}
