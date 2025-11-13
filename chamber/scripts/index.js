const navbutton = document.querySelector('#menu');
const nav = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
  navbutton.classList.toggle('show');
  nav.classList.toggle('show');
});
//header info//


//Weather Info//
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.69468736527777&lon=-112.84147445077554&units=metric&appid=1672744ecff1dc5905a57678d75fd808';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();


function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = `${desc}`;
}

//Weather Info//

//Forecast//

const url2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=49.69468736527777&lon=-112.84147445077554&units=metric&appid=1672744ecff1dc5905a57678d75fd808';

const weatherContainer = document.querySelector('#weather'); // Add an id="weather" in your HTML <section>

async function getForecast() {
  try {
    const response = await fetch(url2);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Error loading forecast:", error);
  }
}

function displayForecast(data) {
  weatherContainer.innerHTML = "";

  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

  daily.forEach(day => {
    const card = document.createElement('div');
    card.classList.add('forecast-card');

    const date = new Date(day.dt_txt);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };

    card.innerHTML = `
      <h4>${date.toLocaleDateString('en-US', options)}</h4>
      <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" 
           alt="${day.weather[0].description}">
      <p>${day.main.temp.toFixed(1)}&deg;C</p>
      <p>${day.weather[0].description}</p>
    `;

    weatherContainer.appendChild(card);
  });
}

getForecast();

//Forecast//


//Spotlight//

const membersContainer = document.getElementById("membersContainer");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error loading member data:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  const premiumMembers = members.filter(
    member => member.membershipLevel === 2 || member.membershipLevel === 3
  );

  const shuffled = premiumMembers.sort(() => 0.5 - Math.random());

  const selectedMembers = shuffled.slice(0, 3);

  selectedMembers.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card")

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: ${member.membershipLevel}</p>
      <p>${member.description}</p>
    `;

    membersContainer.appendChild(card);
  });
}


getMembers();

//Spotlight//

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