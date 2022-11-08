const formEl = document.querySelector("#form");
const shortEl = document.querySelector(".short-link");
const qrImageEl = document.querySelector(".qr-image");
const resultEl = document.querySelector("#result-space");
const clearBtn = document.querySelector("#clear-btn");

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

const clearFields = () => {
  let url = document.querySelector("#URL");
  url.value = "";
  resultEl.style.opacity = 0;
};

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  submitURL();
});

clearBtn.addEventListener("click", clearFields);
