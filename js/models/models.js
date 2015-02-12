define(['jquery', 'backbone'], function($, Backbone) {
    var lookup = function(symbol) {
        var ajaxOptions = {
            url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp/",
            jsonp: "callback",
            dataType: "jsonp",
            context: this,
            data: {
                parameters: JSON.stringify({
                    Normalized: false,
                    NumberOfDays: 365,
                    DataPeriod: "Day",
                    Elements: [{
                        Symbol: symbol,
                        Type: "price",
                        Params: ["ohlc"] //ohlc, c = close only
                    }, {
                        Symbol: symbol,
                        Type: "volume"
                    }]
                })
            },
            success: function(resp) {
                if (!resp || resp.Message) {
                    console.log("Error: ", resp.Message);
                    return;
                }

                return resp;
            },
            error: function(resp, status) {
                console.log(resp, status);
                return;
            }
        };
        return $.ajax(ajaxOptions);
    }

    return {
        lookupStock: lookup
    }
});