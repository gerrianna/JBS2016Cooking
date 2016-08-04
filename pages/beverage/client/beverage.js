Template.beverage.helpers({
  beverages: function(){
    const number = Session.get("number");
    const mealType = "Beverage";
    console.log(number);//10
    Session.set("search",{
      recipe:null,
      ingr:null,
      cuisine:null,
      mealType:mealType,
      allergies:null,
      maxCal:null,
      maxCarb:null,
      maxFat:null,
      maxProtein:null,
      minCal:null,
      minCarb:null,
      minFat:null,
      minProtein:null,
      number:number,
      //offset:0,
    });
    const search = Session.get("search");
    console.log(search);

    Meteor.apply("getMeal",[search],{returnStubValue: true},
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
    return Session.get("recipes");
  },
  correctUrl: function(){
    var image = this.image;
    console.log(this);
    //console.log(image);
    return image.startsWith("https://spoonacular.com/recipeImages/");
  },

})

Template.beverage.events({
  "click .js-newsearch": function(events){
   Meteor.call("removeRec");
   Router.go('/');
 },
  "click .js-reclink":function(events){
    //events.preventDefaults();
    console.log("hi");
    var recId = this.id;
    console.log("recId");
    console.log(recId);
    var name = this.title;
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
  "click .js-showMoreA": function(event,instance){
  const currentNum = Session.get("number");
  console.dir("currenNum: "+currentNum);
  const moreNum = currentNum + 10;
  console.dir("newNum: "+moreNum);
  Session.set("number",moreNum);
  const number = Session.get("number");
  console.dir("numSession: "+number);
  const search = Session.get("search");
  console.dir("mealType: "+ search.mealType);
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
  console.dir("mealType: "+updatedSearch.mealType);
  Meteor.apply("getMeal",[updatedSearch],{returnStubValue: true},
      function(error,result){
        if(error) {
          console.dir(error);
        }
        console.dir("getMealUpdated");
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
      /*console.log("adding to favorites list: ");
      console.log(this);
      console.log(this.recipe);
      console.log(this.recipe.title);
      console.log(this.recipe.image);
      */
    //  const recipe = this.recipe._id;
    console.log(this);
    const favorite = this.beverages;
    console.log(favorite);
    const title = favorite.title;
    console.log("favorite: "+favorite);
      var favorite_obj={
        title:favorite.title,
        id:favorite.id,
        image:favorite.image,
        user:Meteor.userId()
      };
      Meteor.call("addFavorite",favorite_obj);
    },
    "click .js-talk": function(event,instance){
      Meteor.call('pierreSpeak');
    },
})
