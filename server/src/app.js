import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { env } from "./utils/env.js";
import applicationsRouter from "./routes/applications.js";
import authRouter from "./routes/auth.js";

const app = express();

// CORS
// In development allow localhost on any port; in production keep it strict via env.CORS_ORIGIN.
const corsOptions =
  env.NODE_ENV === "production"
    ? { origin: env.CORS_ORIGIN }
    : {
        origin: (origin, cb) => {
          if (!origin) return cb(null, true);
          const ok = /^https?:\/\/localhost:\d+$/.test(origin);
          return cb(null, ok);
        },
      };

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

// API routes
app.use("/api/auth", authRouter);
app.use("/api/applications", applicationsRouter);

// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "..", env.UPLOAD_DIR)));

// Serve built client ONLY if it exists (prevents ENOENT in environments where client isn't built)
if (env.NODE_ENV === "production") {
  const clientDist = path.resolve(__dirname, "..", "..", "client", "dist");
  const indexHtml = path.join(clientDist, "index.html");

  if (fs.existsSync(indexHtml)) {
    app.use(express.static(clientDist));
    app.get("*", (req, res) => res.sendFile(indexHtml));
  }
}

export default app;
