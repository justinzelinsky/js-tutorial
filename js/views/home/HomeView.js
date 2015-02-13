define(['jquery', 'backbone', 'text!templates/home/homeTemplate.html'], function($, Backbone, HomeTemplate) {
    var HomeView = Backbone.View.extend({
        render: function() {
            this.$el.html(HomeTemplate);
        }
    });

    return HomeView;
});