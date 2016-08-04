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
Meteor.publish("Weekly", function(){
	return Weekly.find();
})

Meteor.publish("Mon",function(){
	return Mon.find();
})
Meteor.publish("Tues",function(){
	return Tues.find();
})
Meteor.publish("Wed",function(){
	return Wed.find();
})
Meteor.publish("Thur",function(){
	return Thur.find();
})
Meteor.publish("Fri",function(){
	return Fri.find();
})
Meteor.publish("Sat",function(){
	return Sat.find();
})
Meteor.publish("Sun",function(){
	return Sun.find();
})

