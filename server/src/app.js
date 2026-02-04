import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./utils/env.js";
import applicationsRouter from "./routes/applications.js";

const app = express();

// CORS
// "Failed to fetch" in the browser is often caused by a strict CORS origin mismatch
// (e.g., Vite running on 5174 instead of 5173).
// In development we allow localhost on any port; in production we keep it strict.
const corsOptions =
  env.NODE_ENV === "production"
    ? { origin: env.CORS_ORIGIN }
    : {
        origin: (origin, cb) => {
          // allow same-origin or tools like curl/postman (no Origin header)
          if (!origin) return cb(null, true);
          const ok = /^https?:\/\/localhost:\d+$/.test(origin);
          return cb(null, ok);
        },
      };

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

// API routes
app.use("/api/applications", applicationsRouter);

// Serve uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "..", env.UPLOAD_DIR)));

// Serve built client in production (optional)
if (env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (req, res) => res.sendFile(path.join(clientDist, "index.html")));
}

export default app;
