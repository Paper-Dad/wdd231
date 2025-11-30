const navbutton = document.querySelector('#menu');
const nav = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
  navbutton.classList.toggle('show');
  nav.classList.toggle('show');
});
//header info//


//Main//

//Import//

import { itemsOfInterest } from "../data/items.mjs";

const LAST_VISIT_KEY = "discoverLastVisit";

function getVisitMessage() {
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem(LAST_VISIT_KEY));

  let message = "";

  if (lastVisit) {

    const msDifference = now - lastVisit;
    const daysDifference = msDifference / (1000 * 60 * 60 * 24);
    const wholeDays = Math.floor(daysDifference);


    const dayLabel = wholeDays === 1 ? "day" : "days";
    message = `You last visited ${wholeDays} ${dayLabel} ago.`;
  } else {

    message = "You last visited 0 days ago.";
  }

  localStorage.setItem(LAST_VISIT_KEY, now.toString());

  return message;
}

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  const visitSection = document.createElement("section");
  visitSection.classList.add("visit-message");

  const visitParagraph = document.createElement("p");
  visitParagraph.textContent = getVisitMessage();

  visitSection.appendChild(visitParagraph);
  main.appendChild(visitSection);

  const container = document.createElement("section");
  container.classList.add("items-container");

  itemsOfInterest.forEach((item, index) => {
    const card = document.createElement("article");
    card.classList.add("item-card");

    const cardNumber = index + 1;
    card.classList.add(`card${cardNumber}`);

    const title = document.createElement("h2");
    title.textContent = item.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = `images/${item.image}`;
    img.alt = item.name;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = item.name;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    const address = document.createElement("address");
    address.textContent = item.address;

    const desc = document.createElement("p");
    desc.textContent = item.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";
    button.classList.add("learn-more-btn");

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(button);

    container.appendChild(card);
  });

  main.appendChild(container);
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