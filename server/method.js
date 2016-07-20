Meteor.methods({
  "getRecipe":
  function(dish){
    //console.dir("ingr2 = " + ingr);
    console.dir("dish2 = " + dish);
    var apikey = Meteor.settings.spoonacular;
    //const url = "http://www.recipepuppy.com/api/?i="+ingr+"&q="+dish+"&p=3";
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+dish+"&limitLicense=false&number=10&ranking=1";
    //const url = "http://www.recipepuppy.com/api/?q="+dish+"&p=3";
    console.log(url);
    const z = HTTP.call("GET",
      url,
     {headers: {
    "X-Mashape-Key": apikey,
    "Accept": "application/json"
      }}/*, function(error, result) {
        if(!error) {
          console.log("successful");
          console.log("result");
          console.dir(result.content);
          console.dir("end");
          return result.content;
        }
      } */
      );
     console.dir(z);
     return z.content;
    /*console.dir("name =" + name);
    const z = Meteor.http.call("get",
      "http://www.recipepuppy.com/api/?q={{ingr}}");

    console.dir(z);

    return z.content;*/

  },

  "advancedGet":
  function(recipe,cuisine,ingr,allergies,diet,maxCal,maxCarb,maxFat,maxProtein,mealType){
    var apikey = Meteor.settings.spoonacular;
    const url ="https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?cuisine="+cuisine+"&excludeIngredients="+allergies+"&fillIngredients=false&includeIngredients="+ingr+"&intolerances="+allergies+"&limitLicense=false&maxCalories="+maxCal+"&maxCarbs="+maxCarbs+"&maxFat="+maxFat+"&maxProtein="+maxProtein+"minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=10&offset=0&query="+recipe+"&ranking=1&type="+mealType;

    console.log(url);
    const y = HTTP.call("GET",
      url,
      {headers: {
       "X-Mashape-Key": apikey,
       "Accept": "application/json"
      }}
    );

    console.dir(y);
    return y.content;
  },
})
