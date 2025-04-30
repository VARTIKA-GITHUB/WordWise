const wordheading = document.getElementById("wordheading");
const definition = document.getElementById("definition");
const searchbtn = document.getElementById("searchbtn");
const searchinput = document.getElementById("searchinput");

const dictionary = (word) => {
  if (!word.trim()) {
    wordheading.innerHTML = "Please enter a word.";
    definition.innerHTML = "";
    return;
  }

  const url = 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '34f7eacbcamsh8b6c7ba4a328f08p1c1f1cjsnbf37c82e46ac',
      'x-rapidapi-host': 'dictionary-by-api-ninjas.p.rapidapi.com'
    }
  };

  // Show loading indicator
  wordheading.innerHTML = "Loading...";
  definition.innerHTML = "";

  fetch(url + word, options)
  .then(response => response.json())
  .then((response) => {
    if (response.definition) {
      wordheading.innerHTML = "Meaning of: " + response.word;
      // Format numbered definitions if they exist
      const formatted = response.definition
        .replace(/2\./g, "<br>2.")
        .replace(/3\./g, "<br>3.")
        .replace(/4\./g, "<br>4.");
      definition.innerHTML = formatted;
    } else {
      wordheading.innerHTML = "No definition found for: " + word;
      definition.innerHTML = "";
    }
  })
  .catch((err) => {
    console.error(err);
    wordheading.innerHTML = "Error fetching definition.";
    definition.innerHTML = "Please try again later.";
  });
};

searchbtn.addEventListener("click", (e) => {
e.preventDefault();
dictionary(searchinput.value);
});
