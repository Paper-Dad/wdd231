//Menu Info//

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");


hamButton.addEventListener("click", () => {    
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

//Menu info//

//Modal//

const modal = document.getElementById("homeModal");
const openBtn = document.getElementById("openModal");
const closeBtn = modal.querySelector(".close");


openBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});


closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


//Footer info//
const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = currentYear;
}
const modified = document.lastModified;
const lastModifiedSpan = document.getElementById("lastModified");

if (lastModifiedSpan) {
  lastModifiedSpan.textContent = modified;
}

//Footer Info//