async function fetchJoke(category) {
    const jokeElement = document.getElementById("joke");
    const titleElement = document.getElementById("joke-title");

    // Show loading message
    jokeElement.textContent = "Loading...";

    const url = `https://v2.jokeapi.dev/joke/${category}?safe-mode`;

    try {
        const response = await fetch(url);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error("Failed to fetch the joke.");
        }

        const data = await response.json();

        // Log the data to check the structure in the console
        console.log(data);

        // Handle different types of jokes
        let jokeText = "";
        if (data.type === "single") {
            jokeText = data.joke; // For single-part jokes
        } else if (data.type === "twopart") {
            jokeText = `${data.setup} ... ${data.delivery}`; // For two-part jokes
        }

        jokeElement.textContent = jokeText;

        // Change the title based on the category
        if (category === "Any") {
            titleElement.textContent = "Joke Of The Day";
        } else if (category === "Pun") {
            titleElement.textContent = "A Random Pun";
        } else {
            titleElement.textContent = `A Random ${category} Joke`;
        }

    } catch (error) {
        jokeElement.textContent = "Oops! Couldn't fetch a joke. Please try again later.";
        console.error("Error:", error); // Log the error in the console
    }
}

// Load a random joke on page load
window.onload = () => fetchJoke('Any');
