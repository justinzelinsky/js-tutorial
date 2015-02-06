define(['jquery',
    'underscore',
    'backbone',
    'text!templates/home/homeTemplate.html'
], function($,
    _,
    Backbone,
    HomeTemplate) {

    var HomeView = Backbone.View.extend({

        el: $('#container'),

        render: function() {
            this.$el.html(HomeTemplate);
        }
    });

    return HomeView;
});