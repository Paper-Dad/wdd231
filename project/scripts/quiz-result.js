document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const element = params.get("element");
    const trait = params.get("trait");
    const color = params.get("color");
    let nation = params.get("nation");

    // Page elements
    const elAnswer = document.getElementById("answer-element");
    const trAnswer = document.getElementById("answer-trait");
    const coAnswer = document.getElementById("answer-color");
    const nationText = document.getElementById("nation-text");
    const nationImage = document.getElementById("nation-image");

    const mappings = {
        "Water Tribe": ["Blubbered Seal Jerky", "Calm", "Katara"],
        "Earth Kingdom": ["Cabbage Soup", "Strong", "Toph"],
        "Fire Nation": ["Flaming Fire Flakes", "Passionate", "Uncle Iroh"],
        "Air Nomads": ["Egg Custard Tart", "Free-Spirited", "Aang"]
    };

    const nationImages = {
        "Water Tribe": "images/water-tribe.webp",
        "Earth Kingdom": "images/earth-kingdom.webp",
        "Fire Nation": "images/fire-nation.webp",
        "Air Nomads": "images/air-nation.webp"
    };

    // Compute nation if missing
    function determineNation(answers) {
        const scores = { "Water Tribe": 0, "Earth Kingdom": 0, "Fire Nation": 0, "Air Nomads": 0 };
        answers.forEach(a => {
            for (const n in mappings) {
                if (mappings[n].includes(a)) scores[n]++;
            }
        });
        let top = null, high = -1;
        for (const n in scores) if (scores[n] > high) { high = scores[n]; top = n; }
        return top || "Air Nomads";
    }

    if (!nation && element && trait && color) {
        nation = determineNation([element, trait, color]);
    }

    // Display user answers
    if (elAnswer) elAnswer.textContent = element || "Not answered";
    if (trAnswer) trAnswer.textContent = trait || "Not answered";
    if (coAnswer) coAnswer.textContent = color || "Not answered";

    // Display nation
    if (nationText) nationText.textContent = `You belong to the ${nation}!`;
    if (nationImage && nationImages[nation]) {
        nationImage.src = nationImages[nation];
        nationImage.alt = `${nation} symbol`;
        nationImage.style.display = "block";
    }
});