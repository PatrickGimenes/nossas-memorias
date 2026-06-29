// gallery.js
function registerGallery() {
  const viewer = document.querySelector("#photo-viewer");

  const image = document.querySelector("#viewer-image");

  const close = document.querySelector("#close-viewer");

  document.querySelectorAll(".timeline-image").forEach((photo) => {
    photo.addEventListener("click", () => {
      image.src = photo.src;

      viewer.classList.add("active");

      document.body.style.overflow = "hidden";
    });
  });

  close.addEventListener("click", closeViewer);

  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
      closeViewer();
    }
  });

  function closeViewer() {
    viewer.classList.remove("active");

    document.body.style.overflow = "";
  }
}
