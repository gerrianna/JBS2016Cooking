Template.results.onCreated(function() {
  //this.state = new ReactiveDict();
  Session.setDefault({
    recipes:[],
  });
  console.log("creating the template");
  //console.dir(this.state);
});

Template.results.helpers({
  number: function(){
    const instance = Template.instance();
    //return instance.state.get("recipes");
    return Session.get("number");
  },
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
  /*"click .js-show": function(event,instance){
    //const ingr = $(".js-ingr").val(); //this gets what the user typed in
    const dish = $(".js-dish").val(); //this gets the dish the user want to make
   // console.log("ingr = " + ingr);
    console.log("dish = " + dish);
    const number = $(".js-show").val();
    Session.set("number",number);
    console.log("num:")
    console.log(number);
    //const number = Session.get("number");
    //Meteor.call("test1",function(e,r){console.log(r)});
    // Meteor.call("getRecipe",[text]);
    Meteor.apply("getRecipe",[dish,number],{returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("result=");
          console.dir(result);
          r = JSON.parse(result);
          console.dir("r= ");
          console.dir(r);
          x = r.results;
          console.dir(x);
          return Session.set("recipes",x);

        }
    );},
*/
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
});
