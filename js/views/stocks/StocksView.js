define(['jquery',
    'underscore',
    'backbone',
    'highcharts',
    'text!templates/stocks/stockTemplate.html',
    'models/models'
], function($,
    _,
    Backbone,
    Highcharts,
    StockTemplate,
    Models) {

    var StocksView = Backbone.View.extend({

        el: $('#container'),

        render: function() {
            this.$el.html(StockTemplate);
            this.highchartContainer = $('#highcharts');
        },

        events: {
            "click #graphButton": "graphData"
        },

        graphData: function() {
            Models.stocks.lookup("AAPL").then(function(StockModel){
                console.log(StockModel);
                console.log("Successful lookup");
            });
        },


        displayChart: function(data) {
            console.log(data);
        }
    });

    return StocksView;
});