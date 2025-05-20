// देशों की जानकारी को स्टोर करने के लिए सरणी
let countries = [];

// देशों की जानकारी API से लाने का फ़ंक्शन
async function fetchCountries() {
    try {
        // सभी देशों का डेटा लाने के लिए /all एंडपॉइंट का उपयोग
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,languages,currencies,region,subregion,flags');
        const data = await response.json();
        countries = data.map(country => ({
            name: country.name.common || 'उपलब्ध नहीं',
            capital: country.capital ? country.capital[0] : 'उपलब्ध नहीं',
            population: country.population || 0,
            language: country.languages ? Object.values(country.languages)[0] : 'उपलब्ध नहीं',
            currency: country.currencies ? Object.values(country.currencies)[0].name : 'उपलब्ध नहीं',
            region: country.region || 'उपलब्ध नहीं',
            subregion: country.subregion || 'उपलब्ध नहीं',
            flag: country.flags ? country.flags.png : 'उपलब्ध नहीं'
        }));
        // डेटा लोड होने के बाद चार्ट को अपडेट करें
        updateChart();
        // डिफ़ॉल्ट श्रेणियाँ प्रदर्शित करें
        searchKnowledge('');
    } catch (error) {
        console.error('देश डेटा लाने में त्रुटि:', error);
        document.querySelector('.category-list').innerHTML = '<p>डेटा लोड करने में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।</p>';
    }
}

// खोज फ़ंक्शन
function searchKnowledge(searchInput = '') {
    // इनपुट को छोटे अक्षरों में बदलें या डिफ़ॉल्ट खाली स्ट्रिंग
    searchInput = typeof searchInput === 'string' ? searchInput.toLowerCase() : document.getElementById('searchInput').value.toLowerCase();
    const categoryList = document.querySelector('.category-list');
    categoryList.innerHTML = ''; // वर्तमान श्रेणियों को हटाएँ

    // खोज के आधार पर देशों को फ़िल्टर करें (नाम, राजधानी, भाषा, मुद्रा)
    const filteredCountries = countries.filter(country => 
        country.name.toLowerCase().includes(searchInput) || 
        country.capital.toLowerCase().includes(searchInput) ||
        country.language.toLowerCase().includes(searchInput) ||
        country.currency.toLowerCase().includes(searchInput)
    );

    if (searchInput === '') {
        // यदि खोज खाली है, तो डिफ़ॉल्ट श्रेणियाँ पुनर्स्थापित करें
        categoryList.innerHTML = `
            <div class="category-card">
                <h3>विज्ञान</h3>
                <p>भौतिकी, रसायन विज्ञान, और जीव विज्ञान में मानव की खोजें। उदाहरण: न्यूटन के नियम, डीएनए की खोज।</p>
            </div>
            <div class="category-card">
                <h3>इतिहास</h3>
                <p>प्राचीन सभ्यताओं से आधुनिक युग तक। उदाहरण: मेसोपोटामिया, स्वतंत्रता संग्राम।</p>
            </div>
            <div class="category-card">
                <h3>कला और संस्कृति</h3>
                <p>साहित्य, संगीत, और चित्रकला। उदाहरण: शेक्सपियर, भारतीय शास्त्रीय नृत्य।</p>
            </div>
            <div class="category-card">
                <h3>देश</h3>
                <p>विश्व भर के देशों की जानकारी, जिसमें जनसंख्या, राजधानी, और संस्कृति शामिल हैं।</p>
            </div>
        `;
    } else if (filteredCountries.length > 0) {
        // फ़िल्टर किए गए देशों को प्रदर्शित करें
        filteredCountries.forEach(country => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <h3>${country.name}</h3>
                <img src="${country.flag}" alt="${country.name} का झंडा" style="width: 50px; height: auto;">
                <p>राजधानी: ${country.capital}<br>
                   जनसंख्या: ${country.population.toLocaleString()}<br>
                   भाषा: ${country.language}<br>
                   मुद्रा: ${country.currency}<br>
                   क्षेत्र: ${country.region}<br>
                   उपक्षेत्र: ${country.subregion}</p>
            `;
            categoryList.appendChild(card);
        });
    } else {
        // यदि कोई परिणाम नहीं मिला, तो विशिष्ट एंडपॉइंट्स के साथ खोजें
        searchSpecificEndpoints(searchInput);
    }
}

// विशिष्ट एंडपॉइंट्स के साथ खोज फ़ंक्शन
async function searchSpecificEndpoints(searchInput) {
    const categoryList = document.querySelector('.category-list');
    try {
        // नाम, मुद्रा, भाषा, या राजधानी के आधार पर खोजें
        const endpoints = [
            `https://restcountries.com/v3.1/name/${searchInput}?fields=name,capital,population,languages,currencies,region,subregion,flags`,
            `https://restcountries.com/v3.1/currency/${searchInput}?fields=name,capital,population,languages,currencies,region,subregion,flags`,
            `https://restcountries.com/v3.1/lang/${searchInput}?fields=name,capital,population,languages,currencies,region,subregion,flags`,
            `https://restcountries.com/v3.1/capital/${searchInput}?fields=name,capital,population,languages,currencies,region,subregion,flags`
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await fetch(endpoint);
                if (response.ok) {
                    const data = await response.json();
                    data.forEach(country => {
                        const card = document.createElement('div');
                        card.className = 'category-card';
                        card.innerHTML = `
                            <h3>${country.name.common}</h3>
                            <img src="${country.flags.png}" alt="${country.name.common} का झंडा" style="width: 50px; height: auto;">
                            <p>राजधानी: ${country.capital ? country.capital[0] : 'उपलब्ध नहीं'}<br>
                               जनसंख्या: ${country.population.toLocaleString()}<br>
                               भाषा: ${country.languages ? Object.values(country.languages)[0] : 'उपलब्ध नहीं'}<br>
                               मुद्रा: ${country.currencies ? Object.values(country.currencies)[0].name : 'उपलब्ध नहीं'}<br>
                               क्षेत्र: ${country.region || 'उपलब्ध नहीं'}<br>
                               उपक्षेत्र: ${country.subregion || 'उपलब्ध नहीं'}</p>
                        `;
                        categoryList.appendChild(card);
                    });
                    return; // यदि परिणाम मिले, तो लूप से बाहर निकलें
                }
            } catch (error) {
                console.warn(`एंडपॉइंट ${endpoint} से डेटा लाने में त्रुटि:`, error);
            }
        }
        categoryList.innerHTML = '<p>कोई परिणाम नहीं मिला।</p>';
    } catch (error) {
        console.error('विशिष्ट खोज में त्रुटि:', error);
        categoryList.innerHTML = '<p>खोज में त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।</p>';
    }
}

// चार्ट को अपडेट करने का फ़ंक्शन
function updateChart() {
    // शीर्ष 5 देशों को जनसंख्या के आधार पर चुनें (प्रदर्शन के लिए)
    const topCountries = countries
        .filter(c => c.population > 0) // शून्य जनसंख्या वाले देशों को हटाएँ
        .sort((a, b) => b.population - a.population)
        .slice(0, 5);

    const ctx = document.getElementById('educationChart').getContext('2d');
    
    // मौजूदा चार्ट को नष्ट करें यदि यह पहले से मौजूद है
    if (window.educationChart) {
        window.educationChart.destroy();
    }

    window.educationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: topCountries.map(c => c.name),
            datasets: [{
                label: 'जनसंख्या (अरबों में)',
                data: topCountries.map(c => c.population / 1000000000), // अरबों में परिवर्तित करें
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: ['#2A80B9', '#CC4B37', '#D4A017', '#3A9C9C', '#7A52CC'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'जनसंख्या (अरबों में)'
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
}

// पेज लोड होने पर देश डेटा लाएँ
fetchCountries();

// खोज बटन के लिए इवेंट लिस्टनर
document.getElementById('searchInput').addEventListener('input', () => searchKnowledge());
