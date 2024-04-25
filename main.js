const slidePreview = document.querySelector(".slide-preview");
const slideShown = document.querySelector(".slideshown");
const imgsList = document.querySelectorAll(".img-list");
const paintingImg = document.querySelector(".painting-img");
const paintingDesc = document.querySelector(".painting-desc");
const paintingYear = document.querySelector(".painting-year");
const artisticName = document.querySelector(".artistic-name");
const painterImg = document.querySelector(".painter-img");
const artTitle = document.querySelector(".art-title");
const infoTitle = document.querySelector(".info-title");
const infoName = document.querySelector(".info-name");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".previous-btn");
const progressLine = document.querySelector(".progress-line");
const topPart = document.querySelector(".top-part");
const showImgDiv = document.querySelector(".show-img");
const viewImgDiv = document.querySelector(".view-img");
const shownImg = document.querySelector(".shown-image");
const closeBtn = document.querySelector(".close");
const startSlideshow = document.querySelector(".start-slideshow");

imgsList.forEach((img, index) => {
  img.addEventListener("click", () => {
    slideShown.classList.add("d-none");
    slidePreview.classList.remove("d-none");
    startSlideshow.textContent = startSlideshow.textContent.replace(
      "start",
      "stop"
    );
    updateData(index);
  });
});

nextBtn.addEventListener("click", () => {
  let index = +slidePreview.dataset.index;
  topPart.classList.add("go-right");
  updateData(index + 1); // Increment the index
  setTimeout(() => {
    topPart.classList.remove("go-right");
  }, 500);
});

previousBtn.addEventListener("click", () => {
  let index = +slidePreview.dataset.index;
  topPart.classList.add("go-left");
  updateData(index - 1); // Decrement the index
  setTimeout(() => {
    topPart.classList.remove("go-left");
  }, 500);
});

viewImgDiv.addEventListener("click", () => {
  showImgDiv.classList.remove("d-none");
  shownImg.src = viewImgDiv.previousElementSibling.src;
});

closeBtn.addEventListener("click", () => {
  showImgDiv.classList.add("d-none");
});

startSlideshow.addEventListener("click", () => {
  if (startSlideshow.textContent.toLowerCase().includes("start")) {
    slideShown.classList.remove("go-up");
    slidePreview.classList.remove("go-down");
    slideShown.classList.add("go-down");
    setTimeout(() => {
      slideShown.classList.add("d-none");
      slidePreview.classList.remove("d-none");
      slidePreview.classList.add("go-up");
    }, 1000);
    startSlideshow.textContent = startSlideshow.textContent.replace(
      "start",
      "stop"
    );
        updateData(0);

  } else {
    slidePreview.classList.remove("go-up");
    slideShown.classList.remove("go-down");
    slidePreview.classList.add("go-down");
    setTimeout(() => {
      slidePreview.classList.add("d-none");
      slideShown.classList.remove("d-none");
      slideShown.classList.add("go-up");
            slidePreview.classList.remove("go-down");

    }, 1000);
    startSlideshow.textContent = startSlideshow.textContent.replace(
      "stop",
      "start"
    );
  }
});

function updateData(index) {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      if (index < 0) {
        index = data.length - 1; // Wrap around to the last index
      } else if (index >= data.length) {
        index = 0; // Wrap around to the first index
      }
      updateProgressBar(index, data.length);
      paintingImg.src = data[index].imgUrl;
      painterImg.src = data[index].artistImg;
      paintingDesc.textContent = data[index].description;
      paintingYear.textContent = data[index].year;
      artisticName.textContent = data[index].artistName;
      artTitle.textContent = data[index].name;
      infoTitle.textContent = data[index].name;
      infoName.textContent = data[index].artistName;
      slidePreview.dataset.index = index;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateProgressBar(index, length) {
  const percentage = ((index + 1) / length) * 100;
  progressLine.style.width = percentage + "%";
}
