Meteor.publish("theShoppingList", function(){
	return Shopping.find();
})