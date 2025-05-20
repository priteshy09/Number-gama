// Sample country data (replace with API call in production)
const countries = [
    { name: "India", capital: "New Delhi", population: 1400000000, language: "Hindi, English", currency: "Indian Rupee" },
    { name: "United States", capital: "Washington, D.C.", population: 331000000, language: "English", currency: "US Dollar" },
    { name: "China", capital: "Beijing", population: 1440000000, language: "Mandarin", currency: "Chinese Yuan" },
    { name: "Brazil", capital: "Brasília", population: 213000000, language: "Portuguese", currency: "Brazilian Real" }
];

// Search function
function searchKnowledge() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = ''; // Clear current categories

    // Filter countries based on search
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(searchInput) || 
        country.capital.toLowerCase().includes(searchInput)
    );

    if (searchInput === '') {
        // Restore default categories if search is empty
        categoryList.innerHTML = `
            <div class="category-card">
                <h3>Science</h3>
                <p>Discoveries in physics, chemistry, and biology. Examples: Newton's laws, DNA discovery.</p>
            </div>
            <div class="category-card">
                <h3>History</h3>
                <p>From ancient civilizations to the modern era. Examples: Mesopotamia, independence movements.</p>
            </div>
            <div class="category-card">
                <h3>Art and Culture</h3>
                <p>Literature, music, and painting. Examples: Shakespeare, Indian classical dance.</p>
            </div>
            <div class="category-card">
                <h3>Countries</h3>
                <p>Explore information about countries worldwide, including population, capital, and culture.</p>
            </div>
        `;
    } else if (filteredCountries.length > 0) {
        // Display filtered countries
        filteredCountries.forEach(country => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <h3>${country.name}</h3>
                <p>Capital: ${country.capital}<br>
                   Population: ${country.population.toLocaleString()}<br>
                   Language: ${country.language}<br>
                   Currency: ${country.currency}</p>
            `;
            categoryList.appendChild(card);
        });
    } else {
        categoryList.innerHTML = '<p>No results found.</p>';
    }
}

// Chart.js configuration for population data
const ctx = document.getElementById('educationChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: countries.map(c => c.name),
        datasets: [{
            label: 'Population (in billions)',
            data: countries.map(c => c.population / 1000000000), // Convert to billions
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
            borderColor: ['#2A80B9', '#CC4B37', '#D4A017', '#3A9C9C'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Population (Billions)'
                }
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    }
});

// Example API call (uncomment and configure for production)
/*
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        countries = data.map(country => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'N/A',
            population: country.population,
            language: country.languages ? Object.values(country.languages)[0] : 'N/A',
            currency: country.currencies ? Object.values(country.currencies)[0].name : 'N/A'
        }));
    } catch (error) {
        console.error('Error fetching country data:', error);
    }
}
fetchCountries();
*/
