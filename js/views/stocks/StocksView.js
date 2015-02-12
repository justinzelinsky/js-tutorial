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
            this.symbol = $('#symbol');
            this.errorDiv = $('#error');
        },

        events: {
            "click #graphButton": "graphData"
        },

        graphData: function() {
            var scope = this;
            Models.lookupStock(this.symbol.val()).then(function(stockModel) {
                scope.displayChart(stockModel);
            }, function(resp) {
                scope.errorDiv.val("Invalid Stock Symbol Chosen");
            });
        },

        _fixDate: function(dateIn) {
            var dat = new Date(dateIn);
            return Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate());
        },

        _getOHLC: function(json) {
            var dates = json.Dates || [];
            var elements = json.Elements || [];
            var chartSeries = [];

            if (elements[0]) {

                for (var i = 0, datLen = dates.length; i < datLen; i++) {
                    var dat = this._fixDate(dates[i]);
                    var pointData = [
                        dat,
                        elements[0].DataSeries['open'].values[i],
                        elements[0].DataSeries['high'].values[i],
                        elements[0].DataSeries['low'].values[i],
                        elements[0].DataSeries['close'].values[i]
                    ];
                    chartSeries.push(pointData);
                };
            }
            return chartSeries;
        },

        _getVolume: function(json) {
            var dates = json.Dates || [];
            var elements = json.Elements || [];
            var chartSeries = [];

            if (elements[1]) {

                for (var i = 0, datLen = dates.length; i < datLen; i++) {
                    var dat = this._fixDate(dates[i]);
                    var pointData = [
                        dat,
                        elements[1].DataSeries['volume'].values[i]
                    ];
                    chartSeries.push(pointData);
                };
            }
            return chartSeries;
        },


        displayChart: function(data) {
            //console.log(data)
            // split the data set into ohlc and volume
            var symbol = "Foo";
            var ohlc = this._getOHLC(data),
                volume = this._getVolume(data);

            // set the allowed units for data grouping
            var groupingUnits = [
                [
                    'week', // unit name
                    [1] // allowed multiples
                ],
                [
                    'month', [1, 2, 3, 4, 6]
                ]
            ];

            // create the chart
            $('#highcharts').highcharts({

                rangeSelector: {
                    selected: 1
                        //enabled: false
                },

                title: {
                    text: symbol + ' Historical Price'
                },

                yAxis: [{
                    title: {
                        text: 'OHLC'
                    },
                    height: 200,
                    lineWidth: 2
                }, {
                    title: {
                        text: 'Volume'
                    },
                    top: 300,
                    height: 100,
                    offset: 0,
                    lineWidth: 2
                }],

                series: [{
                    type: 'candlestick',
                    name: symbol,
                    data: ohlc,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: volume,
                    yAxis: 1,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }],
                credits: {
                    enabled: false
                }
            });
        }
    });

    return StocksView;
});