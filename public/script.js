const formEl = document.querySelector("#form");
const shortEl = document.querySelector(".short-link");
const qrImageEl = document.querySelector(".qr-image");
const resultEl = document.querySelector("#result-space");
const clearBtn = document.querySelector("#clear-btn");
const downloadEl = document.querySelector("#download-el");
const copyBtn = document.querySelector("#copy-btn");
const deleteBtn = document.querySelector("#delete-btn");

const submitURL = async () => {
  let url = document.querySelector("#URL").value;

  const response = await fetch("http://localhost:5000/api/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ origUrl: url }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      shortEl.textContent = data.shortUrl;
      qrImageEl.src = data.qrUrl;
      resultEl.style.opacity = 1;
    });
};

const deleteURL = async () => {
  const shortUrl = shortEl.textContent.split("/");
  console.log(shortUrl);
  const urlId = shortUrl[shortUrl.length - 1];

  const response = await fetch("http://localhost:5000/api/", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify({ urlId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.alert(`Short link has been deleted from DB.`);
      resultEl.style.opacity = 0;
      let url = document.querySelector("#URL");
      url.value = "";
    });
};

const clearFields = () => {
  let url = document.querySelector("#URL");
  url.value = "";
  resultEl.style.opacity = 0;
};

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(shortEl.textContent);
    window.alert("Short link copied to clipboard!");
  } catch (error) {
    console.error(error);
  }
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  submitURL();
});

clearBtn.addEventListener("click", clearFields);

downloadEl.addEventListener("click", () => {
  downloadEl.setAttribute("href", qrImageEl.src);
});

copyBtn.addEventListener("click", copyContent);

deleteBtn.addEventListener("click", deleteURL);
