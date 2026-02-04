import dotenv from "dotenv";
dotenv.config();

function req(name, fallback = undefined) {
  const v = process.env[name] ?? fallback;
  if (v === undefined || v === "") throw new Error(`Missing env var: ${name}`);
  return v;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
  MONGODB_URI: req("MONGODB_URI", "mongodb://127.0.0.1:27017/smartportal"),
  EMAIL_ENABLED: (process.env.EMAIL_ENABLED || "false").toLowerCase() === "true",
  MAIL_HOST: process.env.MAIL_HOST || "",
  MAIL_PORT: Number(process.env.MAIL_PORT || 465),
  MAIL_SECURE: (process.env.MAIL_SECURE || "true").toLowerCase() === "true",
  MAIL_USER: process.env.MAIL_USER || "",
  MAIL_PASS: process.env.MAIL_PASS || "",
  TO_EMAILS: (process.env.TO_EMAILS || "").split(",").map(s => s.trim()).filter(Boolean),
  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads",
  MAX_FILE_MB: Number(process.env.MAX_FILE_MB || 10),
};
