import express, { Request, Response } from "express";
import dotenv from "dotenv";
import formidable from "formidable";
import fs from "fs";
import uuid from "short-uuid";
import aws from "aws-sdk";
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

///////////////////////////

////////////////////////
app.post("/api/uploadFile", (req: Request, res: Response) => {
  ///////////////////////formidable section
  const form = formidable();
  form.parse(req, (error, fields, file) => {
    if (error) {
      console.log("error in file");
      return;
    }
    const allReq = JSON.stringify(file.key); //all data
    const uploadFileData = JSON.parse(allReq); //all data
    const filePath = uploadFileData.filepath;
    const fileName = `${uuid.generate()}${uploadFileData.originalFilename}`;
    console.log(fileName);
    const fileStream = fs.createReadStream(filePath);
    const s3 = new aws.S3({
      endpoint: "sgp1.digitaloceanspaces.com",
      accessKeyId: process.env.aws_access_key_id,
      secretAccessKey: process.env.aws_secret_access_key,
    });
    s3.upload(
      {
        Bucket: "msquarefdc",
        Key: fileName,
        ACL: "public-read",
        Body: fileStream,
      },
      (err, data) => {
        if (err) {
          console.log("in sever response");
          return;
        } else {
          console.log(data);
          res.json(data);
        }
      }
    );

    console.log(filePath);
    // if (Array.isArray(uploadFileData)) {
    //   uploadFileData.forEach((uploadFile) => {
    //     const oldPath = uploadFile.filepath; //file path
    //     const fileName = `${uuid.generate()},.jpg`; //file name
    //     const newPath = `${__dirname}/../photos/${uuid.generate()}.jpg`;
    //     renameSync(`${oldPath}`, newPath);
    //   });
    // } else {
    //   const finalData = file.key.toString();
    //   const myArray = finalData.split(" ");
    //   const path = myArray[myArray.length - 1];
    //   console.log(__dirname);
    //   renameSync(path, `${__dirname}/../photos/${uuid.generate()}.jpg`);
    //   res.json(file);
    // }
  });
  ///////////////////////
  /*const fileStream = fs.creat fileStream("./test.jpg");
  
  req.pipt fileStream);
  console.log(uuid.generate());*/
});
app.listen(port, () => {
  console.log("sever is listenint at port", port);
});
