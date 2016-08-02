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
Meteor.publish("Today", function(){
	return Today.find();
})

Meteor.publish("Weekly",function(){
	return Weekly.find();
})

Meteor.publish("Monthly", function(){
	return Monthly.find();
})
