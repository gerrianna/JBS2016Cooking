Template.results.onCreated(function() {
  //this.state = new ReactiveDict();
  Session.setDefault({
    recipes:[],
  });
  console.log("creating the template");
  //console.dir(this.state);
});

Template.results.helpers({
  recipes: function(){
    const instance = Template.instance();
    //return instance.state.get("recipes");
    return Session.get("recipes");
  },
  correctUrl: function(){
    var image = this.image;
    console.log(this);
    //console.log(image);
    return image.startsWith("https://spoonacular.com/recipeImages/");
  },

});

Template.results.events({
  "click .js-talk": function(event,instance){
    Meteor.call('pierreSpeak');
  },
  "click .js-addFavorite": function(event){
    /*console.log("adding to favorites list: ");
    console.log(this);
    console.log(this.recipe);
    console.log(this.recipe.title);
    console.log(this.recipe.image);
    */
  //  const recipe = this.recipe._id;
    const favorite = this.recipe.title;
    var shopping_obj={
      text:favorite,
      image:this.recipe.image,
      user:Meteor.userId()
    };
    Meteor.call("addFavorite",shopping_obj);
  },
})

