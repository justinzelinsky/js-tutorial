var express = require('express');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
var app = express();

var RequestParams = function(symbol) {
    return {
        "Normalized": false,
        "NumberOfDays": 365,
        "DataPeriod": "Day",
        "Elements": [{
            "Symbol": symbol,
            "Type": "price",
            "Params": [
                "c"
            ]
        }]
    }
}

app.get('/', function(req, res) {
    var symbol = req.query.symbol;
    if (symbol === null) {
        res.send('Error: Invalid symbol');
    } else {
        var params = {
            parameters: JSON.stringify(RequestParams(symbol))
        }

        $.ajax({
            data: params,
            url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp",
            dataType: "jsonp",
            context: this,
            success: function(json) {
                //Catch errors
                if (!json || json.Message) {
                    console.error("Error: ", json.Message);
                    return;
                }
                res.type('json');
                res.json(JSON.parse(json));
            },
            error: function(response, txtStatus) {
                console.log("Error");
                console.log(response, txtStatus)
            }
        });
    }
});

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('Example app listening at http://%s:%s', host, port)
});