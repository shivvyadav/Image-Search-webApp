// Get DOM elements
let inputBox = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let searchForm = document.getElementById("search-form");

// Get the container element
let container = document.querySelector(".container");
let loadMoreBtn = document.getElementById("load-more");

let query = "";
let page = 1;

// Initial fetch on page load
fetchImages();
async function fetchImages() {
  // Default to "nature" if input is empty
  query = inputBox.value || "nature";
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${apiKey}&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if (page === 1) {
      // Clear previous results only on the first page
      container.innerHTML = "";
    }
    const results = data.results;
    results.map((image) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description || "Image";
      imgElement.classList.add("card-img-top");

      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      cardDiv.style.width = "18rem";
      cardDiv.appendChild(imgElement);

      container.appendChild(cardDiv);
    });
    // Show Load More button
    loadMoreBtn.style.display = "block";
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
