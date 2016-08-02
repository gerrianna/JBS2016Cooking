Template.myPlanned.helpers({
	
});

Template.myPlanned.events({
	'click .js-today':function(){
		Router.go('/today');
	},
	'click .js-weekly':function(){
		Router.go('/weekly');
	},
	'click .js-monthly':function(){
		Router.go('/monthly');
	},

});