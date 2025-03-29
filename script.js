async function fetchJoke(category) {
    const jokeElement = document.getElementById("joke");
    const titleElement = document.getElementById("joke-title");

    /* Show loading text while finding a joke */
    jokeElement.textContent = "Loading...";

    try {
        const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?safe-mode`);
        const data = await response.json();

        jokeElement.textContent = data.type === "single" ? data.joke : `${data.setup} ... ${data.delivery}`;
        titleElement.textContent = category === "Any" ? "Joke Of The Day" : 
        category === "Pun" ? "A Random Pun" : `A Random ${category} Joke`;

    } 

    /* Tells this if the joke dosen't work*/
    catch {
        jokeElement.textContent = "Oops! Couldn't fetch a joke. Try again later.";
    }
}

// Load a random joke while the page loads
window.onload = () => fetchJoke('Any');
