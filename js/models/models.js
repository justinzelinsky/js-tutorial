define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var StockModel = Backbone.Model.extend({});

    var Stocks = Backbone.Collection.extend({
        url: "http://dev.markitondemand.com/Api/v2/InteractiveChart/jsonp/?parameters=",
        model: StockModel,
        sync: function(method, model, options) {
            console.log('Options:', options);
            var params = _.extend({
                type: 'GET',
                dataType: 'jsonp',
                url: model.url,
                processData: false
            }, options);

            return $.ajax(params);
        },
        lookup: function(symbol) {
            var deferred = $.Deferred();
            this.fetch({
                data: JSON.stringify({
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
                }),
                success: function(model, object, options) {
                    console.log(model, object, options);
                    console.log("SUCCESS");
                },
                error: function(model, xhr) {
                    console.log("ERROR");
                }
            })


            return deferred;
        }
    });

    var stocks = new Stocks();

    return {
        StockModel: StockModel,
        stocks: stocks
    }
});