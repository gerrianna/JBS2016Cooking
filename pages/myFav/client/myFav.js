
Template.myFav.helpers({
	favoritesList:function(){return Favorites.find({user:Meteor.userId()})}
})

Template.myFav.helpers({
	favoriteList:function(){return Favorites.find({user:Meteor.userId()})},

	correctUrl: function(){
  //  const string = "https://spoonacular.com/recipeImages/";
    var image = this.image;
    console.log(this);
    //console.log(image);
    return image.startsWith("https://spoonacular.com/recipeImages/");
  },
});


Template.myFav.events({
	"click .js-delete-favorite": function(event){
		console.log(this.favoriteList._id);
		const favorite = Favorites.findOne({_id:this.favoriteList._id});
		console.dir(favorite);
		Meteor.call("removeFavorite",favorite);
	},

});
