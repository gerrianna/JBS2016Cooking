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
  "click .js-talk": function(event,instance){
    console.log("clicked it");
    $(".js-talk").html("Listening...");
      //https://shapeshed.com/html5-speech-recognition-api/
    var recognition = new webkitSpeechRecognition();
    console.log("webkit recognition");
    recognition.onresult = function(event) {
      console.dir(event);
      $(".js-talk").html("Talk");
      const item = event.results[0][0].transcript;
      console.log("item");
      console.log(item);
          //const dish2 = event.results[0][0].transcript;
      console.log(event.results[0][0].confidence);
      console.log("done");

      const number = 10;
          //const number = Session.get("number");

      Meteor.call("getRecipeTalk",item,{returnStubValue:true},
        function(error,result){
          if(error){
            console.dir(error);
          }
          console.dir("r");
          r = JSON.parse(result);
              //console.dir(r);
          var s = r.result.parameters.ingredients;
          if(r.result.parameters.page != undefined){
                t = r.result.parameters.page;
                Router.go('/'+t);
          } else if(r.result.parameters.page == undefined){
              console.dir("finding recipe");
              Meteor.apply("getRecipe",[s,number],{returnStubValue: true},
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
                Router.go('/results');
          }
        }
      );
      recognition.start();
      console.log("starting the recognizer");
    }
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
    var favorite_obj={
      text:favorite,
      image:this.recipe.image,
			user:Meteor.userId()
		};
		Meteor.call("addFavorite",favorite_obj);
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
