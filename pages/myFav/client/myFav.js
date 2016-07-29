
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
	"click .js-talk": function(event){
		Meteor.call('pierreSpeak');
	},
	"click .js-reclink":function(events){
    //events.preventDefaults();
    console.log("hi");
		console.log(this);
    var recId = this.id;
    console.log("recId");
    console.log(recId);
    var name = this.text;
    console.log("name");
    console.log(name);
    var id = this._id;
    //Sessions.setPersistent("selectedrecipe",id);
    Session.set("recname",name);
    var u = Session.get("recname");
    console.log(u);
    Meteor.call("removeIns");
		Meteor.call("removeHealth");
    Meteor.apply("getInstructions",[recId],
      function(error,result){
        x = JSON.parse(result);
        console.dir(x);
        const text = x[0].name;
        console.dir("text");
        console.dir(text);
        const instructionsArray = x[0].steps;
        console.dir(x[0]);
        Meteor.call("insertIns",x[0]);
        /*for(var i=0;i<x.length; i++){
          console.dir("hello");
          console.dir(x[i]);
          var c = x[i];
          console.dir(c);
          Meteor.call("insertIns",c);
        }*/
        //return Ins.find({});
      }
    );
    Meteor.apply("getRecipeIngredients", [recId],
      function(error, result){
        a = JSON.parse(result);
        console.log(a);
        Health.insert(a);
      }
    );
    Router.go('/instructions');
  },

});
