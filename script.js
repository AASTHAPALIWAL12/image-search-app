const accessKey = "0MJJQ8byunF-3p0_i_-qV7QkgnC4KoskY2cg6ZTn8qw";

const formE1 = document.querySelector("#search-form");
const inputE1 = document.getElementById("Search-input");
const searchResults = document.getElementById("Search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add("Search-result");

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description || "Unsplash Image";

            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description || "View Image";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResults.appendChild(imageWrapper);
        });

        page++;

        if (results.length > 0) {
            showMore.style.display = "block";
        } else {
            showMore.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});
