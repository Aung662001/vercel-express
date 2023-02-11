const apiUrl = localStorage.getItem("apiUrl");

const fetchData = async () => {
  console.log(apiUrl);
  if (apiUrl) {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};
const uploadFile = async () => {
  console.log("inside uploadFile");
  const inputTag = document.getElementById("uploadFile");
  const response = await fetch(`${apiUrl}/uploadFile`, {
    method: "POST",
    Headers: { "Content-Type": "application/json" },
    body: inputTag.files[0],
  });
  console.log(inputTag.files);
};
fetchData();
