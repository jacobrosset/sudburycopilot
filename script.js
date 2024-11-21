// Utility Functions
const showSection = (section) => {
    console.log(`Showing section:`, section?.id || "No ID");
    section?.classList.remove("hidden");
};

const hideSection = (section) => {
    console.log(`Hiding section:`, section?.id || "No ID");
    section?.classList.add("hidden");
};

// Fetch AI Response
async function fetchAIResponse(prompt, maxTokens = 60) {
    console.log(`Fetching AI response for prompt: "${prompt}"`);
    try {
        const response = await fetch("https://copilot-game.onrender.com/api/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, max_tokens: maxTokens }),
        });
        const data = await response.json();
        console.log(`AI response received:`, data);
        return data.message || data.choices[0].text.trim();
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error: Unable to fetch response.";
    }
};

// Challenge Navigation Logic
const setupChallengeFlow = () => {
    console.log("Setting up challenge flow...");

    const startBtn = document.getElementById("startBtn");
    const nextBtns = [
        document.getElementById("nextChallenge1"),
        document.getElementById("nextChallenge2"),
        document.getElementById("nextChallenge3"),
    ];
    const challenges = [
        document.getElementById("challenge1"),
        document.getElementById("challenge2"),
        document.getElementById("challenge3"),
        document.getElementById("challenge4"),
    ];

    // Start button logic
    startBtn.addEventListener("click", () => {
        console.log("Start button clicked");
        hideSection(startBtn.parentElement); // Hide the start section
        showSection(challenges[0]); // Show Challenge 1
        showSection(document.getElementById("prompt1-section")); // Show the first prompt section
    });

    // Next buttons logic
    nextBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            console.log(`Next button clicked for Challenge ${index + 1}`);
            hideSection(challenges[index]); // Hide current challenge
            showSection(challenges[index + 1]); // Show next challenge
            if (index + 1 === 1) {
                showSection(document.getElementById("audience1-section")); // Specifically show audience section in Challenge 2
            } else if (index + 1 === 2) {
                showSection(document.getElementById("tone1-section")); // Specifically show tone section in Challenge 3
            } else if (index + 1 === 3) {
                showSection(document.getElementById("complexPrompt")); // Specifically show complexity prompt in Challenge 4
            }
            console.log(`Transitioned to Challenge ${index + 2}`);
        });
    });

    // Restart button logic
    document.getElementById("restartBtn").addEventListener("click", () => {
        console.log("Restart button clicked");
        location.reload(); // Restart the game
    });
};

// Challenge 1 Logic: Role Playing
const challenge1Logic = () => {
    console.log("Setting up Challenge 1 logic...");

    const role1 = document.getElementById("role1");
    const role2 = document.getElementById("role2");

    document.getElementById("generateResponse1").addEventListener("click", async () => {
        console.log("Generate First Response button clicked for Challenge 1");
        const prompt1 = `You are a ${role1.value} writing for city council. Explain renewable energy in a professional tone.`;
        console.log("Prompt 1:", prompt1);
        document.getElementById("response1").textContent = "Loading...";
        const response = await fetchAIResponse(prompt1);
        document.getElementById("response1").textContent = response;

        // Populate Role 2 Options
        console.log("Populating Role 2 options...");
        role2.innerHTML = Array.from(role1.options)
            .filter((option) => option.value !== role1.value)
            .map((option) => `<option value="${option.value}">${option.text}</option>`)
            .join("");
        console.log("Role 2 options populated");
        showSection(document.getElementById("prompt2-section")); // Show second prompt section
    });

    document.getElementById("generateResponse2").addEventListener("click", async () => {
        console.log("Generate Second Response button clicked for Challenge 1");
        const prompt2 = `You are a ${role2.value} writing for city council. Explain renewable energy in a professional tone.`;
        console.log("Prompt 2:", prompt2);
        document.getElementById("response2").textContent = "Loading...";
        const response = await fetchAIResponse(prompt2);
        document.getElementById("response2").textContent = response;
        showSection(document.getElementById("custom-prompt-section1")); // Show custom prompt section
    });

    document.getElementById("generateCustomResponse1").addEventListener("click", async () => {
        console.log("Generate Custom Response button clicked for Challenge 1");
        const customPrompt = document.getElementById("customPrompt1").value + " Limit response to 60 words.";
        console.log("Custom Prompt:", customPrompt);
        document.getElementById("customResponse1").textContent = "Loading...";
        const response = await fetchAIResponse(customPrompt, 60);
        document.getElementById("customResponse1").textContent = response;
        showSection(document.getElementById("nextChallenge1")); // Show next challenge button
    });
};

// Challenge 2 Logic: Choosing Your Audience
const challenge2Logic = () => {
    console.log("Setting up Challenge 2 logic...");

    const audience1 = document.getElementById("audience1");
    const audience2 = document.getElementById("audience2");

    document.getElementById("generateAudienceResponse1").addEventListener("click", async () => {
        console.log("Generate First Response button clicked for Challenge 2");
        const prompt1 = `You are a teacher explaining renewable energy to ${audience1.value}.`;
        console.log("Prompt 1:", prompt1);
        document.getElementById("audienceResponse1").textContent = "Loading...";
        const response = await fetchAIResponse(prompt1);
        document.getElementById("audienceResponse1").textContent = response;

        // Populate Audience 2 Options
        console.log("Populating Audience 2 options...");
        audience2.innerHTML = Array.from(audience1.options)
            .filter((option) => option.value !== audience1.value)
            .map((option) => `<option value="${option.value}">${option.text}</option>`)
            .join("");
        console.log("Audience 2 options populated");
        showSection(document.getElementById("audience2-section")); // Show second audience section
    });

    document.getElementById("generateAudienceResponse2").addEventListener("click", async () => {
        console.log("Generate Second Response button clicked for Challenge 2");
        const prompt2 = `You are a teacher explaining renewable energy to ${audience2.value}.`;
        console.log("Prompt 2:", prompt2);
        document.getElementById("audienceResponse2").textContent = "Loading...";
        const response = await fetchAIResponse(prompt2);
        document.getElementById("audienceResponse2").textContent = response;
        showSection(document.getElementById("custom-prompt-section2")); // Show custom prompt section
    });

    document.getElementById("generateCustomResponse2").addEventListener("click", async () => {
        console.log("Generate Custom Response button clicked for Challenge 2");
        const customPrompt = document.getElementById("customPrompt2").value + " Limit response to 60 words.";
        console.log("Custom Prompt:", customPrompt);
        document.getElementById("customResponse2").textContent = "Loading...";
        const response = await fetchAIResponse(customPrompt, 60);
        document.getElementById("customResponse2").textContent = response;
        showSection(document.getElementById("nextChallenge2")); // Show next challenge button
    });
};

// Challenge 3 Logic: Setting the Tone
const challenge3Logic = () => {
    console.log("Setting up Challenge 3 logic...");

    const tone1 = document.getElementById("tone1");
    const tone2 = document.getElementById("tone2");

    document.getElementById("generateToneResponse1").addEventListener("click", async () => {
        console.log("Generate First Response button clicked for Challenge 3");
        const prompt1 = `You are a climate scientist explaining renewable energy in a ${tone1.value}.`;
        console.log("Prompt 1:", prompt1);
        document.getElementById("toneResponse1").textContent = "Loading...";
        const response = await fetchAIResponse(prompt1);
        document.getElementById("toneResponse1").textContent = response;

        // Populate Tone 2 Options
        console.log("Populating Tone 2 options...");
        tone2.innerHTML = Array.from(tone1.options)
            .filter((option) => option.value !== tone1.value)
            .map((option) => `<option value="${option.value}">${option.text}</option>`)
            .join("");
        console.log("Tone 2 options populated");
        showSection(document.getElementById("tone2-section")); // Show second tone section
    });

    document.getElementById("generateToneResponse2").addEventListener("click", async () => {
        console.log("Generate Second Response button clicked for Challenge 3");
        const prompt2 = `You are a climate scientist explaining renewable energy in a ${tone2.value}.`;
        console.log("Prompt 2:", prompt2);
        document.getElementById("toneResponse2").textContent = "Loading...";
        const response = await fetchAIResponse(prompt2);
        document.getElementById("toneResponse2").textContent = response;
        showSection(document.getElementById("custom-prompt-section3")); // Show custom prompt section
    });

    document.getElementById("generateCustomResponse3").addEventListener("click", async () => {
        console.log("Generate Custom Response button clicked for Challenge 3");
        const customPrompt = document.getElementById("customPrompt3").value + " Limit response to 60 words.";
        console.log("Custom Prompt:", customPrompt);
        document.getElementById("customResponse3").textContent = "Loading...";
        const response = await fetchAIResponse(customPrompt, 60);
        document.getElementById("customResponse3").textContent = response;
        showSection(document.getElementById("nextChallenge3")); // Show next challenge button
    });
};

// Challenge 4 Logic: Simplify Complexity
const challenge4Logic = () => {
    console.log("Setting up Challenge 4 logic...");

    document.getElementById("generateComplexResponse").addEventListener("click", async () => {
        console.log("Generate Response button clicked for Challenge 4");
        const complexPrompt = document.getElementById("complexPrompt").value + " Put it simply.";
        console.log("Complex Prompt:", complexPrompt);
        document.getElementById("complexResponse").textContent = "Loading...";
        const response = await fetchAIResponse(complexPrompt, 60);
        document.getElementById("complexResponse").textContent = response;
        showSection(document.getElementById("restartBtn")); // Show restart button
    });
};

// Initialize Challenges
console.log("Initializing challenges...");
setupChallengeFlow();
challenge1Logic();
challenge2Logic();
challenge3Logic();
challenge4Logic();
console.log("Challenges initialized.");
