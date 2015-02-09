define(['backbone', 'views/home/HomeView', 'views/stocks/StocksView'], function(Backbone, HomeView, StocksView) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'stocks': 'showStocks',
            '*actions': 'showDefault'
        }
    });

    var initialize = function() {

        var appRouter = new AppRouter;

        appRouter.on('route:showStocks', function() {
            var stocksView = new StocksView();
            stocksView.render();
        })

        appRouter.on('route:showDefault', function() {
            var homeView = new HomeView();
            homeView.render();
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});