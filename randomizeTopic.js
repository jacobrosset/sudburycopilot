document.addEventListener("DOMContentLoaded", () => {
    console.log("Randomizing topics...");

    // Define topics for each challenge
    const topics = [
        { topic: "renewable energy", audience: ["city council", "5-year-old children"], tones: ["professional tone", "engaging tone"] },
        { topic: "climate change", audience: ["environmental activists", "college students"], tones: ["serious tone", "hopeful tone"] },
        { topic: "AI technology", audience: ["business leaders", "school teachers"], tones: ["technical tone", "casual tone"] },
        { topic: "space exploration", audience: ["astronomy enthusiasts", "high school students"], tones: ["informative tone", "inspiring tone"] },
    ];

    // Randomly select one topic object
    const selectedTopic = topics[Math.floor(Math.random() * topics.length)];
    console.log("Selected Topic:", selectedTopic);

    // Update Challenge 1
    const challenge1Header = document.querySelector("#challenge1 h2");
    const prompt1Section = document.querySelector("#prompt1-section p");
    if (challenge1Header && prompt1Section) {
        challenge1Header.textContent = `Challenge 1: Role Playing (${selectedTopic.topic})`;
        prompt1Section.innerHTML = `You are a 
            <select id="role1">
                <option value="teacher">teacher</option>
                <option value="climate scientist">climate scientist</option>
                <option value="storyteller">storyteller</option>
            </select>
            writing for city council. Explain ${selectedTopic.topic} in a professional tone.`;
    }

    // Update Challenge 2
    const challenge2Header = document.querySelector("#challenge2 h2");
    const audience1Section = document.querySelector("#audience1-section p");
    if (challenge2Header && audience1Section) {
        challenge2Header.textContent = `Challenge 2: Choosing Your Audience (${selectedTopic.topic})`;
        audience1Section.innerHTML = `You are a teacher explaining ${selectedTopic.topic} to
            <select id="audience1">
                <option value="${selectedTopic.audience[0]}">${selectedTopic.audience[0]}</option>
                <option value="${selectedTopic.audience[1]}">${selectedTopic.audience[1]}</option>
            </select>.`;
    }

    // Update Challenge 3
    const challenge3Header = document.querySelector("#challenge3 h2");
    const tone1Section = document.querySelector("#tone1-section p");
    if (challenge3Header && tone1Section) {
        challenge3Header.textContent = `Challenge 3: Setting the Tone (${selectedTopic.topic})`;
        tone1Section.innerHTML = `You are a climate scientist explaining ${selectedTopic.topic} in a
            <select id="tone1">
                <option value="${selectedTopic.tones[0]}">${selectedTopic.tones[0]}</option>
                <option value="${selectedTopic.tones[1]}">${selectedTopic.tones[1]}</option>
            </select>.`;
    }

    // Update Challenge 4
    const challenge4Header = document.querySelector("#challenge4 h2");
    const challenge4Prompt = document.querySelector("#challenge4 p");
    if (challenge4Header && challenge4Prompt) {
        challenge4Header.textContent = `Challenge 4: Simplify Complexity (${selectedTopic.topic})`;
        challenge4Prompt.textContent = `Ask the most complicated question you can think of about ${selectedTopic.topic} and finish the prompt with '...put it simply.'`;
    }

    console.log("Topics successfully randomized.");
});
