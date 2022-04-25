async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
//Fetch data from twelvedata.com
    let response = await fetch('https://api.twelvedata.com/time_series?apikey=5c57b35fdfeb4889b9c923bdee1ffa78&interval=1day&symbol=GME,MSFT,DIS,BNTX');

    let result = await response.json();
    console.log(result);


    const {GME, MSFT, DIS, BNTX} = result;
    const stocks = [GME, MSFT, DIS, BNTX];

    //Color function for 
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    stocks.forEach(stock => stock.values.reverse());

    //Time Chart
    var myChart = new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

    //         //Loop over Array for High Chart
    //         let temp = 0
    //         stocks.forEach((values) => {
    //             if(temp < values) {
    //                 temp = values;
    //             }
    //         }
    //         );

    // //High Chart
    // var highPriceChart = new Chart(highestPriceChartCanvas.getContext('2d'), {
    //     type: 'bar',
    //     data: {
    //     labels: stocks[0],
    //     datasets: `${temp}`,
    //     backgroundColor: getColor(stock.meta.symbol),
    //     borderColor: getColor(stock.meta.symbol),
    //     },
    
    //     }
    // );


}

main()