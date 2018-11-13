// arrays to store x and y axis data
var arrChartDataX = [];
var arrChartDataY = [];
// to get historical data for 2 hours
var counterr = 0;
// get canvas to draw graph
var ctx = document.getElementById('myChartNew1').getContext('2d');

function drawBTCUSDchart() {
    var config = {
        type: 'line',
        data: {
            labels: arrChartDataX,
            datasets: [{
                label: 'fill',
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#F1EA7F',
                borderColor: '#F1EA7F',
                data: arrChartDataY,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                fontSize: 40,
                text: 'BTC to USD',
                fontColor: '#fff'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#fff',
                titleFontSize: 22,
                titleFontColor: '#DD4132',
                titleSpacing: 3,
                bodySpacing: 2,
                bodyFontSize: 22,
                bodyFontColor: '#6B5B95',
                xPadding: 8,
                yPadding: 8,
                borderColor: '6B5B95'

            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontColor: '#F1EA7F',
                    fontSize: 50,
                    display: false,
                    boxWidth: 70,

                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        color: "#fff"
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Hourly',
                        fontSize: 40,
                        fontColor: '#fff',
                        fontFamily: "'Oldenburg', Arial, sans-serif'"
                    },
                    ticks: {
                        fontColor: "#E47A2E",
                        fontSize: 30,

                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        color: "#fff",
                        borderDash: [2, 5],
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return '$' + value;
                        },
                        fontColor: "#F0EAD6",
                        fontSize: 35
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'USD',
                        fontColor: '#fff',
                        fontSize: 40
                    }
                }]
            }
        }
    };
    window.myLine = new Chart(ctx, config);
}

function globalBtcUsd() {
    var publicKey = 'YjMxZmE5MmNhMzljNDViMmFmY2VkNWVhOTkxNjdiOWU';
    var secretKey = 'ODUwZTliZGQ4MjFmNDVjOTg3MjhhZmM4OGJhYjRkMzlhMTUwNjIyOWVmNzk0ZjZkOWExNTU5ZjI3MjM3OWU5OA';
    var timeS = '';
    timeS = Math.floor((Date.now() / 1000));
    var payLoad = timeS + '.' + publicKey;
    var digestValue = CryptoJS.HmacSHA256(payLoad, secretKey);
    var digestValueHex = CryptoJS.enc.Base64.stringify(digestValue);
    var signature = timeS + '.' + digestValueHex;

    $.ajax({
        url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD',
        //url:'https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=USD,EUR', Requires developers account
        type: 'GET',
        headers: {
            'X-Signature': signature
        },
        dataType: 'json'
    })
        .done(function (data) {

            $.each(data, function (i, values) {
                $('#digestvalue').html(data["ask"])
                $('#hour').html(data["open"].hour)
                $('#day').html(data["open"]["day"])
                $('#week').html(data["open"].week)
                $('#avgDay').html(data["averages"].day)
                $('#avgWeek').html(data["averages"]["week"])
                $('#avgMonth').html(data["averages"].month)
            })
        })
        .fail(function (errorMsg) {
            console.log(errorMsg);
        });
}

function globalBtcUsdChart() {

    $.ajax({
        url: 'https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json',
        type: 'GET'
    })
        .done(function (data) {
            var timeNow = new Date();
            $.each(data, function (i, val) {
                counterr++;
                if (counterr <= 61) {
                    var arrTimeSplit = val["time"].split(' ');

                    arrChartDataX.push(arrTimeSplit[1].slice(-8, -3));
                    arrChartDataY.push(val["average"]);
                }
            })
            arrChartDataX.sort();
            drawBTCUSDchart();
        })
        .fail(function (errorMsg) {
            console.log(errorMsg);
        });
}
// call globalBtcUsd function every 5 seconds to display current price
//myvar = setInterval(globalBtcUsd, 5000);
//function to get last 2 hours data and calls drawBTCUSDchart
globalBtcUsd();
globalBtcUsdChart();
// call drawBTCUSDchart to draw chart for 2 hours data

