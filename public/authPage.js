const shortLinks = Array.from(document.querySelectorAll(".shortlinks"));
let shortLinksValues = shortLinks.map((item) => item.href);
const API_URL = "https://url-short-m6r5.onrender.com/";

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

const deleteURL = async (urlId) => {
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
    });
};
const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);

    window.alert("Short link copied to clipboard!");
  } catch (error) {
    console.error(error);
  }
};
