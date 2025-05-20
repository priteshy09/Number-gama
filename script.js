// सर्च फीचर
function searchKnowledge() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(query) ? 'block' : 'none';
    });
}

// शिक्षा का चार्ट
const ctx = document.getElementById('educationChart').getContext('2d');
const educationChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['भारत', 'अमेरिका', 'चीन', 'जापान'],
        datasets: [{
            label: 'साक्षरता दर (%)',
            data: [74, 99, 97, 99],
            backgroundColor: ['#e94560', '#00d4ff', '#f4a261', '#2a9d8f'],
            borderColor: ['#d32f2f', '#0288d1', '#e67e22', '#1a3c34'],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

console.log("Knowledge of Humanity लोड हो गया!");
