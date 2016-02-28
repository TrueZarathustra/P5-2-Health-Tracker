var app = app || {};

app.appView = Backbone.View.extend({
	el: 'body',

	events: {
		'click #search-button' : 'searchItem'
	},

	initialize: function() {

		this.$searchString = $('.search-string');

		this.dateView = new app.DateView();
		this.foodListView = new app.FoodListView([], {date : this.dateView.getDate()});
		this.searchListView = new app.SearchListView({collection: new app.SearchList()});

		this.counter = new app.CounterView({collection: this.collection});

		this.listenTo(this.searchListView, 'addItem', this.addItem)

		self = this;
  	},

  	addItem: function(input) {
  		var date = this.dateView.getDate();
  		input.date = date;
  		input.quantity = 1;
  		self.searchListView.collection.reset();
  		this.$searchString.val('');

  	},

	searchItem: function() {
		var apiRequestTemplate = 'https://api.nutritionix.com/v1_1/search/%SEARCH%?fields=item_name%2Cnf_calories&appId=1c120cc3&appKey=99dd94d4da2652a426b99bbfb4c3da6c';
		var searchRequest = this.$searchString.val();
		var apiRequest = apiRequestTemplate.replace('%SEARCH%',searchRequest);

		self.searchListView.collection.reset();

		$.ajax({
			url: apiRequest,
			success: function(response) {
				if (response.total_hits > 0) {
					var rawData = response.hits;
					var len = rawData.length;
					for (var i=0; i <len; i++) {
						self.searchListView.collection.add(new app.Search({
	                      													name: rawData[i].fields.item_name,
	                      													calories: rawData[i].fields.nf_calories
	                    												})
						);
					}
				}
			},
			error: function() {
				console.log('Error while working with API');
			}
		});
	}
});



/*
app.mod1 = new app.Food({
                      name: 'Food # 1',
                      calories: 321,
                      quantity: 2,
                    });

app.mod2 = new app.Food({
                      name: 'Food # 2',
                      calories: 10,
                      quantity: 30,
                    });

app.mod3 = new app.Food({
                      name: 'Food # 3',
                      calories: 21,
                      quantity: 12,
                    });

app.foodList1 = new app.FoodList([app.mod1, app.mod2, app.mod3], {date : '27022016'});
app.view = new appView({collection: app.foodList1});

//simple working example for FoodView, FoodListView, CounterView
app.mod1 = new app.Food({
                      name: 'Food # 1',
                      calories: 321,
                      quantity: 2,
                    });

app.mod2 = new app.Food({
                      name: 'Food # 2',
                      calories: 10,
                      quantity: 30,
                    });

app.mod3 = new app.Food({
                      name: 'Food # 3',
                      calories: 21,
                      quantity: 12,
                    });
*/