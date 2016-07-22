Template.myShopping.helpers({
	favoritesList:function(){return Favorites.find({user:Meteor.userId()})}
})
