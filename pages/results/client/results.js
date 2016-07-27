Template.results.onCreated(function() {
  //this.state = new ReactiveDict();
  Session.setDefault(
    "recipes",[]
  );
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
  "click .js-show": function(event,instance){
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
    );
  },

  "click .js-addFavorite": function(event){
    const favorite = this.recipe.title;
    var shopping_obj={
			text:favorite,
      image:this.recipe.image,
			user:Meteor.userId()
		};
		Meteor.call("addFavorite",shopping_obj);
	},
  "click .js-showMore": function(event){
    const currentNum = Session.get("number");
    console.dir("currenNum: "+currentNum);
    const moreNum = currentNum + 10;
    console.dir("newNum: "+moreNum);
    Session.set("number",moreNum);
    const number = Session.get("number");
    console.dir("numSession: "+number);
    const search = Session.get("search");
    Session.set("search",{
      recipe:search.recipe,
      ingr:search.ingr,
      cuisine:search.cuisine,
      mealType:search.mealType,
      allergies:search.allergies,
      maxCal:search.maxCal,
      maxCarb:search.maxCarb,
      maxFat:search.maxFat,
      maxProtein:search.maxProtein,
      minCal:search.minCal,
      minCarb:search.minCarb,
      minFat:search.minFat,
      minProtein:search.minProtein,
      number:moreNum,
      //offset:0,
    });
    const updatedSearch = Session.get("search");
    console.log("searchNum: "+updatedSearch.number);
    console.dir("search_obj:"+updatedSearch);
    console.dir("search_recipe: "+updatedSearch.recipe);
    Meteor.apply("getRecipe",[updatedSearch],{returnStubValue: true},
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
    );
  }
/*
  "click .js-next": function(event){
    const skip =
    Session.set("offset",)
  },
  */
});
