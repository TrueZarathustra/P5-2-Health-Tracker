var app = app || {};

app.CounterView = Backbone.View.extend({

	el:  '#counter',

	initialize: function() {
	    this.render();
	    this.listenTo(this.collection, 'all', this.render);
  	},

	render: function() {
		if (this.collection) {
			this.$el.html(this.collection.totalCalories() );
		} else {
			this.$el.html('0');
		}
		return this;
	}
});