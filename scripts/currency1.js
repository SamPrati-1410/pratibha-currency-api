var config = {
    type: 'line',
    data: {
        labels: ["8.00", "8.05", "8.10", "8.15", "8.20", "8.25", "8.30"],
        datasets: [{
            label: 'Unfilled',
            fill: false,
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [
                6488.03,
                6490.28,
                6490.82,
                6493.30,
                6492.73,
                6494.26,
                6490.92
            ],
        }] },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }]
        }
    }
};

window.onload = function () {
    var ctx = document.getElementById('myChartNew1').getContext('2d');
    window.myLine = new Chart(ctx, config);
};
$(function () {
    var arrChartDataX = [];
    var arrChartDataY = [];
    var counterr = 0;

    function globalBtcUsd() {
        var publicKey = 'YjMxZmE5MmNhMzljNDViMmFmY2VkNWVhOTkxNjdiOWU';
        var secretKey = 'ODUwZTliZGQ4MjFmNDVjOTg3MjhhZmM4OGJhYjRkMzlhMTUwNjIyOWVmNzk0ZjZkOWExNTU5ZjI3MjM3OWU5OA';
        var timeS = '';

        //timeS =Math.floor(Date.now()/1000);
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
                counterr++;
                console.log(timeS)
                $.each(data, function (i, values) {
                    // console.log(i + '' + values);
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
    $('button').click(function () {
        globalBtcUsd();
        //myvar = setInterval(globalBtcUsd,5000);
        //setInterval(function(){alert('Hi!!!')},5000)
        // myChartData = setInterval(globalBtcUsd1, 300000)
        // globalBtcUsd1();
    })
    function globalBtcUsd1() {
        var publicKey = 'YjMxZmE5MmNhMzljNDViMmFmY2VkNWVhOTkxNjdiOWU';
        var secretKey = 'ODUwZTliZGQ4MjFmNDVjOTg3MjhhZmM4OGJhYjRkMzlhMTUwNjIyOWVmNzk0ZjZkOWExNTU5ZjI3MjM3OWU5OA';
        var timeS = '';

        //timeS =Math.floor(Date.now()/1000);
        timeS = Math.floor((Date.now() / 1000 - 300000));
        var payLoad = timeS + '.' + publicKey;

        var digestValue = CryptoJS.HmacSHA256(payLoad, secretKey);
        var digestValueHex = CryptoJS.enc.Base64.stringify(digestValue);

        var signature = timeS + '.' + digestValueHex;
        $.ajax({
            url: 'https://apiv2.bitcoinaverage.com/indices/global/history/BTCUSD?period=daily&?format=json',
            //url:'https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=USD,EUR', Requires developers account
            type: 'GET',
            headers: {
                'X-Signature': signature
            },
            dataType: 'json'
        })
            .done(function (data) {
                counterr++;


                if (counterr <= 5) {
                    arrChartDataX.push(data["display_timestamp"]);
                    arrChartDataY.push(data["ask"]);
                    console.log('if counter = ' + counterr)
                } else {
                    arrChartDataX.shift();
                    arrChartDataY.shift();
                    arrChartDataX.push(data["display_timestamp"]);
                    arrChartDataY.push(data["ask"]);
                    console.log('else counter = ' + counterr)
                }

            })
            .fail(function (errorMsg) {
                console.log(errorMsg);
            });

    }


});