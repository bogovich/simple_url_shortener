const formEl = document.querySelector("#url-form");
const shortEl = document.querySelector(".short-link");
const qrImageEl = document.querySelector(".qr-image");
const resultEl = document.querySelector("#result-space");
const clearBtn = document.querySelector("#clear-btn");
const downloadEl = document.querySelector("#download-el");
const copyBtn = document.querySelector("#copy-btn");
const deleteBtn = document.querySelector("#pub-delete");
const errorDiv = document.querySelector("#error-div");
const API_URL = "https://url-short-m6r5.onrender.com/api/";

const submitURL = async () => {
  let url = document.querySelector("#URL").value;

  const response = await fetch(API_URL, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ origUrl: url }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        errorDiv.textContent = "Invalid URL. Please try another.";
      } else {
        errorDiv.textContent = "Server Error. Please try again later.";
      }
    })
    .then((data) => {
      shortEl.textContent = data.shortUrl;
      qrImageEl.src = data.qrUrl;
      resultEl.style.display = "flex";
      errorDiv.textContent = "";
    });
};

const deleteURL = async () => {
  const shortUrl = shortEl.textContent.split("/");
  urlId = shortUrl[shortUrl.length - 1];

  const response = await fetch(API_URL, {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify({ urlId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.alert(`Short link has been deleted from DB.`);

      resultEl.style.display = "none";
      let url = document.querySelector("#URL");
      url.value = "";
    });
};

const clearFields = () => {
  let url = document.querySelector("#URL");
  url.value = "";
  resultEl.style.display = "none";
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

deleteBtn.addEventListener("click", function () {
  deleteURL();
});
