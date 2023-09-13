document.addEventListener("DOMContentLoaded", function () {
    const companyInput = document.getElementById("companyInput");
    const searchButton = document.getElementById("searchButton");
    const stockData = document.getElementById("stockData");
    const companyName = document.getElementById("companyName");
    const stockSymbol = document.getElementById("stockSymbol");
    const stockPrice = document.getElementById("stockPrice");
    const stockChange = document.getElementById("stockChange");

    searchButton.addEventListener("click", async function () {
        const symbol = companyInput.value.toUpperCase();
        const apiKey = 'Your Api'; // Your Alpha Vantage API key
        const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Check if the API response contains an error message
            if (data.hasOwnProperty('Error Message')) {
                console.error("Error fetching data:", data['Error Message']);
                return;
            }

            // Access the metadata and time series data
            const metaData = data['Meta Data'];
            const timeSeries = data['Time Series (1min)'];

            // Get the most recent data point
            const lastRefreshed = Object.keys(timeSeries)[0];

            companyName.textContent = metaData['2. Symbol'];
            stockSymbol.textContent = metaData['2. Symbol'];
            stockPrice.textContent = timeSeries[lastRefreshed]['4. close'];
            stockChange.textContent = timeSeries[lastRefreshed]['4. close'] - timeSeries[lastRefreshed]['1. open'];

            stockData.classList.remove("hidden");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
});
