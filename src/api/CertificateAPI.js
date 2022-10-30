import { post } from ".";

const CERTIFICATES = "certificates";

export async function generateEcert(ecert) {
  return await post(ecert, CERTIFICATES);
}
