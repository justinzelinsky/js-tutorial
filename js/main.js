require.config({
    paths: {
        jquery: 'lib/jquery/jquery-1.11.2-min',
        underscore: 'lib/underscore/underscore-min',
        backbone: 'lib/backbone/backbone-min',
        highcharts: 'lib/highcharts/highcharts-min',
        templates: '../templates'
    }

});

require(['app'], function(App) {
    App.initialize();
});