import { createServer} from "https";
import { parse } from "url";
import next from "next";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "certificates", "localhost.key")),
  cert: fs.readFileSync(path.join(__dirname, "certificates", "localhost.crt")),
};

app
  .prepare()
  .then(() => {
    createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
      if (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
      }
      console.log("> Server started on https://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Error during app.prepare():", err);
  });
