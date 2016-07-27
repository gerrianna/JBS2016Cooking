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

Meteor.publish("theIns",function(){
	return Ins.find();
})

Meteor.publish("theHealth", function(){
	return Health.find();
})
