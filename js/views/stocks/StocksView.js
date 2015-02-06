define(['jquery',
    'underscore',
    'backbone',
    'highcharts',
    'text!templates/stocks/stockTemplate.html'
], function($,
    _,
    Backbone,
    Highcharts,
    StockTemplate) {

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
            console.log("Button clicked");
        },


        displayChart: function(data) {
            console.log(data);
        }
    });

    return StocksView;
});