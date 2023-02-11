const apiUrl = localStorage.getItem("apiUrl");

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
    Headers: { "Content-Type": "application/json" },
    body: formData,
  });
  const responseData = await response.json();
  console.log(responseData.key.size);
};

uploadForm.addEventListener("submit", uploadFile);

fetchData();
