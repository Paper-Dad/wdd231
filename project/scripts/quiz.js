//Menu Info//

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");


hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

//Menu info//


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

//Quiz Info//

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quizForm");

  if (!form) return;

  // Mapping used to compute the nation
  const mappings = {
    "Water Tribe": ["Blubbered Seal Jerky", "Calm", "Katara"],
    "Earth Kingdom": ["Cabbage Soup", "Strong", "Toph"],
    "Fire Nation": ["Flaming Fire Flakes", "Passionate", "Uncle Iroh"],
    "Air Nomads": ["Egg Custard Tart", "Free-Spirited", "Aang"]
  };


  function determineNation(answers) {
    const scores = {
      "Water Tribe": 0,
      "Earth Kingdom": 0,
      "Fire Nation": 0,
      "Air Nomads": 0
    };

    answers.forEach(answer => {
      for (const nation in mappings) {
        if (mappings[nation].includes(answer)) {
          scores[nation]++;
        }
      }
    });

    //tie-breaker
    let topNation = null;
    let highestScore = -1;
    for (const nation of Object.keys(scores)) {
      if (scores[nation] > highestScore) {
        highestScore = scores[nation];
        topNation = nation;
      }
    }
    return topNation || "Air Nomads";
  }

  // Submit handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const element = form.querySelector('input[name="element"]:checked')?.value;
    const trait   = form.querySelector('input[name="trait"]:checked')?.value;
    const color   = form.querySelector('input[name="color"]:checked')?.value;

    // Basic validation: require all three answers
    if (!element || !trait || !color) {
      const firstMissing = !element ? form.querySelector('input[name="element"]') :
                           !trait   ? form.querySelector('input[name="trait"]') :
                                      form.querySelector('input[name="color"]');
      if (firstMissing && typeof firstMissing.focus === "function") firstMissing.focus();
      return;
    }

    // Compute nation
    const answers = [element, trait, color];
    const nation = determineNation(answers);

    // Try to save last result
    try {
      localStorage.setItem("avatarNation", nation);
    } catch (err) {

    }

    // Build query string
    const params = new URLSearchParams({
      element: element,
      trait: trait,
      color: color,
      nation: nation
    });

    // Redirect to quiz-result.html with params
    window.location.href = `quiz-result.html?${params.toString()}`;
  });
});