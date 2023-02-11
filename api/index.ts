import express, { Request, Response } from "express";
import dotenv from "dotenv";
import formidable from "formidable";
import fs, { rename, renameSync } from "fs";
import uuid from "short-uuid";
import { json } from "body-parser";
const app = express();
const port = 3000;
dotenv.config();
app.use(express.static("public"));

const apiUrl = process.env.API_URL;

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
  ///////////////////////formidable section
  const form = formidable({ multiples: true });
  form.parse(req, (error, fields, file) => {
    const allReq = JSON.stringify(file.key);
    const prepare = JSON.parse(allReq);
    console.log(prepare);
    if (Array.isArray(prepare)) {
      prepare.forEach((oneIten) => {
        const oldPath = oneIten.filepath;
        const newPath = `${__dirname}/../photos/${uuid.generate()}.jpg`;
        renameSync(`${oldPath}`, newPath);
      });
    } else {
      const finalData = file.key.toString();
      const myArray = finalData.split(" ");
      const path = myArray[myArray.length - 1];
      console.log(__dirname);
      renameSync(path, `${__dirname}/../photos/${uuid.generate()}.jpg`);
      res.json(file);
    }
  });
  ///////////////////////
  /*const writeStream = fs.createWriteStream("./test.jpg");
  req.pipe(writeStream);
  console.log(uuid.generate());*/
});
app.listen(port, () => {
  console.log("sever is listenint at port", port);
});
