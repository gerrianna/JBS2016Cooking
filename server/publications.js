Meteor.publish("theShoppingList", function(){
	if(this.userId){
		return Shopping.find();
	} else {
		this.ready();
	}
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
