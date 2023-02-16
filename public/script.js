const apiUrl = localStorage.getItem("apiUrl");
const image = document.querySelector(".imageTag");
let responseDataLocation = "";
const fetchData = async () => {
  console.log(apiUrl);
  if (apiUrl) {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
  } else {
    window.location.href = "/api";
  }
};

const uploadForm = document.querySelector("#uploadForm");

const uploadFile = async (e) => {
  e.preventDefault();
  const inputTag = document.getElementById("uploadFile");
  const files = [...inputTag.files]; //not real array
  const formData = new FormData(); //object
  files.forEach((file) => formData.append("key", file));
  console.log(files);
  const response = await fetch(`${apiUrl}/uploadFile`, {
    method: "POST",
    body: formData,
  });
  responseDataLocation = await response.json();
  const Link = responseDataLocation.Location;
  await Tag(Link);
};
const Tag = async (Link) => {
  const div = document.createElement("div");
  div.innerHTML = `<img src="${Link}"></img>`;
  console.log(image);
  image.append(div);
};
uploadForm.addEventListener("submit", uploadFile);

fetchData();
