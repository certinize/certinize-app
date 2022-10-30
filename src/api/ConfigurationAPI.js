import { getPath, post } from ".";

const CONFIGURATIONS = "configurations";

export async function createTemplateConfig(config) {
  return await post(config, CONFIGURATIONS);
}

export async function getTemplateConfig(uuid) {
  return await getPath(CONFIGURATIONS, uuid);
}

export async function listTemplateConfig() {
  return await getPath(CONFIGURATIONS);
}
