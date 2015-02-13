define(['backbone', 'views/home/HomeView', 'views/stocks/StocksView'], function(Backbone, HomeView, StocksView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'stocks': 'showStocks',
            '*actions': 'showDefault'
        }
    });

    var initialize = function() {
        var containerEl = $('#container');
        var appRouter = new AppRouter;

        appRouter.on('route:showStocks', function() {
            var stocksView = new StocksView();
            stocksView.render();
            containerEl.html(stocksView.$el);
        })

        appRouter.on('route:showDefault', function() {
            var homeView = new HomeView();
            homeView.render();
            containerEl.html(homeView.$el);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});