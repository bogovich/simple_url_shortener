const formEl = document.querySelector("#url-form");
const shortEl = document.querySelector(".short-link");
const qrImageEl = document.querySelector(".qr-image");
const resultEl = document.querySelector("#result-space");
const clearBtn = document.querySelector("#clear-btn");
const downloadEl = document.querySelector("#download-el");
const copyBtn = document.querySelector("#copy-btn");
const deleteBtn = document.querySelector("#pub-delete");
const errorDiv = document.querySelector("#error-div");
const shortLinks = Array.from(document.querySelectorAll(".shortlinks"));
let shortLinksValues = shortLinks.map((item) => item.href);

document.addEventListener("click", async function (event) {
  if (event.target.matches(".priv-del")) {
    deleteURL(event.target.id);
    this.location.reload(true);
  }

  if (event.target.matches(".priv-copy")) {
    const match = shortLinksValues.find((el) => {
      if (el.includes(event.target.id)) {
        return true;
      }
    });
    copyContent(match);
  }
});

const submitURL = async () => {
  let url = document.querySelector("#URL").value;

  const response = await fetch("https://url-short-m6r5.onrender.com/api/", {
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

const deleteURL = async (inputId = "") => {
  let urlId;
  if (!inputId) {
    const shortUrl = shortEl.textContent.split("/");
    console.log(shortUrl);
    urlId = shortUrl[shortUrl.length - 1];
  } else {
    urlId = inputId;
  }

  const response = await fetch("https://url-short-m6r5.onrender.com/api/", {
    headers: { "Content-Type": "application/json" },
    method: "DELETE",
    body: JSON.stringify({ urlId }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.alert(`Short link has been deleted from DB.`);
      if (!inputId) {
        resultEl.style.display = "none";
        let url = document.querySelector("#URL");
        url.value = "";
      }
    });
};

const clearFields = () => {
  let url = document.querySelector("#URL");
  url.value = "";
  resultEl.style.display = "none";
};

const copyContent = async (text = "") => {
  try {
    if (!text) {
      await navigator.clipboard.writeText(shortEl.textContent);
    } else {
      await navigator.clipboard.writeText(text);
    }

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
