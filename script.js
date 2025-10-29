//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
loadingDiv.textContent = "Loading...";
loadingDiv.style.display = "none";

const errorDiv = document.createElement("div");
errorDiv.id = "error";
errorDiv.style.color = "red";

document.body.prepend(loadingDiv);
document.body.prepend(errorDiv);

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to download image: ${url}`);
  });
}

function downloadImages() {
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const downloadPromises = imageUrls.map(url => downloadImage(url));

  Promise.all(downloadPromises)
    .then(images => {
      loadingDiv.style.display = "none";
      images.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = error;
    });
}

window.addEventListener("load", downloadImages);
