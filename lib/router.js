Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/',{name:"home"});
Router.route('comments');
Router.route('about');
Router.route('help');
//Router.route('friendFav');
Router.route('myFav');
Router.route('myFridge');
Router.route('myPlanned');
Router.route('myProfile');
Router.route('myShopping');
Router.route('advancedSearch');
Router.route('results');
Router.route('instructions');

//for right navigation food categories
Router.route('appetizer');
Router.route('mainCourse');
Router.route('sideDish');
Router.route('salad');
Router.route('bread');
Router.route('breakfast');
Router.route('soup');
Router.route('dessert');
Router.route('beverage');
Router.route('sauce');
