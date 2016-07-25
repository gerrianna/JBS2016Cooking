Template.myFav.helpers({
	favoriteList:function(){return Favorites.find({user:Meteor.userId()})}
});


Template.myFav.events({
	"click .js-delete-favorite": function(event){
		console.log(this.favoriteList._id);
		const favorite = Favorites.findOne({_id:this.favoriteList._id});
		console.dir(favorite);
		Meteor.call("removeFavorite",favorite);
	},
});
