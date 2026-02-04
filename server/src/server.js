import http from "http";
import app from "./app.js";
import { env } from "./utils/env.js";
import { connectMongo } from "./utils/mongo.js";

const server = http.createServer(app);

async function main() {
  await connectMongo();
  server.listen(env.PORT, () => {
    console.log(`Server listening on http://localhost:${env.PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
