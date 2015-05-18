require.config({
    paths: {
        jquery: 'lib/jquery/jquery-1.11.2-min',
        underscore: 'lib/underscore/underscore-min',
        backbone: 'lib/backbone/backbone-min',
        highstock: 'lib/highstock/highstock-min',
        templates: '../templates'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'highstock': {
            exports: 'Highstock'
        }
    }
});

require(['app'], function(App) {
    App.initialize();
});