Meteor.publish("theShoppingList", function(){
	return Shopping.find();
})


Meteor.publish("theFavoritesList", function(){
	return Favorites.find();
})

Meteor.publish("theFridgeList", function(){
	return Fridge.find();
})

Meteor.publish("theFriendsList", function(){
	return Friends.find();
})
