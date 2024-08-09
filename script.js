document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.search');
    const clearButton = document.querySelector('.clear');
    const resultsContainer = document.querySelector('.searchResult');

    // Function to fetch data from JSON file
    async function fetchData() {
        try {
            const response = await fetch('./recommendation.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // re-throw the error to propagate it further
        }
    }

    // Function to handle search based on user input
    function handleSearch(keyword) {
        fetchData().then(data => {
            keyword = keyword.toLowerCase();
            let results = [];

            // Check if keyword matches any category
            if (keyword === 'beach' || keyword === 'beaches') {
                results = data.beaches || [];
            } else if (keyword === 'temple' || keyword === 'temples') {
                results = data.temples || [];
            } else if (keyword === 'australia' || keyword === 'countries') {
                results = data.countries[0].cities || [];
            }else if (keyword === 'japan' || keyword === 'countries') {
                results = data.countries[1].cities || [];
            }
            else if (keyword === 'brazil' || keyword === 'countries') {
                results = data.countries[2].cities || [];
            }
             else {
                resultsContainer.innerHTML = 'Destination not found.';
                return;
            }

            displayResults(results);
        }).catch(error => {
            console.error('Error in handleSearch:', error);
            resultsContainer.innerHTML = 'Error fetching data. Please try again later.';
        });
    }

    // Function to display search results
    function displayResults(results) {
        resultsContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        results.forEach(result => {
            const card = document.createElement('div');
            card.classList.add('resultCard');
            card.innerHTML = `
                <img src="${result.imageUrl}" alt="${result.name}">
                <h2>${result.name}</h2>
                <p>${result.description}</p>
                <a href="#book-now" class="book-now-button">Visit</a>
            `;
            resultsContainer.appendChild(card);
        });
    }

    // Event listener for search button click
searchButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission
        const searchInput = document.querySelector('.search_input').value.trim();
        if (searchInput) {
            handleSearch(searchInput);
        } else {
            resultsContainer.innerHTML = '<p>Please enter a keyword.</p>';
        }
    });

    // Event listener for clear button click
    clearButton.addEventListener('click', function () {
        resultsContainer.innerHTML = '';
        document.querySelector('.search_input').value = '';
    });
});