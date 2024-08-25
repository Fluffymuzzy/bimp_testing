export const generateBase64AuthString = (email, password) => {
  return Buffer.from(`${email}:${password}`).toString("base64");
};
