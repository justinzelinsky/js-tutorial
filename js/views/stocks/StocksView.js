define(['jquery',
    'underscore',
    'backbone',
    'highstock',
    'text!templates/stocks/stockTemplate.html',
    'models/models'
], function($,
    _,
    Backbone,
    Highstock,
    StockTemplate,
    Models) {

    var StocksView = Backbone.View.extend({
        render: function() {
            this.$el.html(StockTemplate);
            this.symbolInput = $('#symbol', this.$el);
            this.errorDiv = $('#error', this.$el);
        },

        events: {
            "click #graphButton": "graphData"
        },

        graphData: function() {
            var scope = this;
            this.symbol = this.symbolInput.val();
            console.log(this.symbol);

            Models.lookupStock(this.symbol).then(function(stockModel) {
                stockModel.Dates = _.map(stockModel.Dates, function(date) {
                    var dateObject = new Date(date);
                    return Date.UTC(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
                });
                scope.displayChart(scope.extractData(stockModel));
            });
        },

        extractData: function(data) {
            var ohlcSeries = [];
            var volumeSeries = [];
            var dates = data.Dates;
            var ohlcElement = data.Elements[0];
            var volumeElement = data.Elements[1];

            for (var i = 0; i < dates.length; i++) {
                var date = dates[i];
                ohlcSeries.push([date,
                    ohlcElement.DataSeries['open'].values[i],
                    ohlcElement.DataSeries['high'].values[i],
                    ohlcElement.DataSeries['low'].values[i],
                    ohlcElement.DataSeries['close'].values[i]
                ]);
                volumeSeries.push([
                    date,
                    volumeElement.DataSeries['volume'].values[i]
                ]);
            }

            return {
                volume: volumeSeries,
                ohlc: ohlcSeries
            }
        },

        displayChart: function(data) {
            var groupingUnits = [
                [
                    'week', [1]
                ],
                [
                    'month', [1, 2, 3, 4, 6]
                ]
            ];

            $('#highcharts').highcharts({
                chart: {
                    width: 800,
                    height: 500
                },
                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: this.symbol + ' Historical Price'
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
                    name: this.symbol,
                    data: data.ohlc,
                    dataGrouping: {
                        units: groupingUnits
                    }
                }, {
                    type: 'column',
                    name: 'Volume',
                    data: data.volume,
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