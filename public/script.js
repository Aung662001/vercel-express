console.log("hello");
const apiUrl = localStorage.getItem("apiUrl");

const fetchData = async () => {
  console.log(apiUrl);
  if (apiUrl) {
    console.log(`${apiUrl}/users`);
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    console.log(data);
  } else {
    window.location.href = "/api";
  }
};
fetchData();
