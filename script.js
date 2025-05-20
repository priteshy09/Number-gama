* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f0f2f5;
    color: #333;
}

header {
    background-color: #1a1a2e;
    color: white;
    padding: 1.5rem;
    position: sticky;
    top: 0;
    z-index: 100;
}

nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.8rem;
    font-weight: bold;
}

.search-bar {
    display: flex;
    gap: 0.5rem;
}

.search-bar input {
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    width: 200px;
}

.search-bar button {
    padding: 0.5rem 1rem;
    background-color: #e94560;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.search-bar button:hover {
    background-color: #d32f2f;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
}

nav ul li a {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
}

nav ul li a:hover {
    color: #00d4ff;
}

section {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
}

#home {
    text-align: center;
    background: linear-gradient(135deg, #00d4ff, #90caf9);
    color: white;
    padding: 4rem;
    border-radius: 10px;
}

#categories {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.category-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.category-card {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
    transition: transform 0.3s;
}

.category-card:hover {
    transform: translateY(-5px);
}

#stats {
    text-align: center;
    background-color: #f9f9f9;
}

.chart-container {
    max-width: 600px;
    margin: 2rem auto;
}

#about {
    text-align: center;
    background-color: white;
    border-radius: 10px;
}

footer {
    text-align: center;
    padding: 1.5rem;
    background-color: #1a1a2e;
    color: white;
}

/* रिस्पॉन्सिव डिज़ाइन */
@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }

    .search-bar input {
        width: 100%;
    }

    section {
        padding: 1.5rem;
    }
      }
