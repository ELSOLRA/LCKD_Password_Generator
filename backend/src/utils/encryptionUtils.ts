import CryptoJS from "crypto-js";

if (!process.env.ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY is not defined");
}

const encryptionKey = process.env.ENCRYPTION_KEY;

export const encryptData = (data: string): string => {
  try {
    return CryptoJS.AES.encrypt(data, encryptionKey).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt data");
  }
};

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
};
