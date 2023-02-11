import express, { Request, Response } from "express";
import env from "dotenv";
import fs from "fs";
import uuid from "short-uuid";
const app = express();
const port = 3000;
env.config();
app.use(express.static("public"));

const apiUrl = process.env.API_URL;
console.log(apiUrl);

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script type="text/javascript">
       localStorage.setItem("apiUrl","${apiUrl}")
       window.location.href="/"
    </script>
  </body>
</html>
`;
app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
app.get("/api", (req: Request, res: Response) => {
  res.send(html);
});

app.get("/api/users", (req: Request, res: Response) => {
  res.send({ name: "aungaung", age: 23 });
});

app.post("/api/uploadFile", (req: Request, res: Response) => {
  const writeStream = fs.createWriteStream("./test.jpg");
  req.pipe(writeStream);
  console.log(uuid.generate());
  res.end();
});
app.listen(port, () => {
  console.log("sever is listenint at port", port);
});
