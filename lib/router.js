Router.configure({
	layoutTemplate: 'layout',
});

Router.route('/',{name:"home"});
Router.route('comments');
Router.route('about');
Router.route('friendFav');
Router.route('myFav');
Router.route('myFridge');
Router.route('myPlanned');
Router.route('myProfile');
Router.route('myShopping');
Router.route('advancedSearch');
Router.route('results');

//for right navigation food categories
Router.route('appetizers');
Router.route('soups');
Router.route('chicken');
Router.route('beef');
Router.route('seafood');
Router.route('vegetarian');
Router.route('salads');
Router.route('pasta');
Router.route('desert');
Router.route('beverages');



Router.route('instructions');
