import { getPath } from "./Common";

const FONTS = "fonts";

export async function getAllFonts() {
  return await getPath(FONTS);
}
