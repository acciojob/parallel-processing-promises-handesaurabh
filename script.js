//your JS code here. If required.
const output = document.getElementById("output");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

loadingDiv.style.display = "none";
errorDiv.style.color = "red";

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

  const downloadPromises = images.map(obj => downloadImage(obj.url));

  Promise.all(downloadPromises)
    .then(imgs => {
      loadingDiv.style.display = "none";
      imgs.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err;
    });
}

btn.addEventListener("click", downloadImages);
