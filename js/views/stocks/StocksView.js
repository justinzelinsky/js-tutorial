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

    var HomeView = Backbone.View.extend({

        el: $('#container'),

        render: function() {
            this.$el.html(StockTemplate);
        }
    });

    return HomeView;
});