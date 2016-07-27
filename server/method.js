Meteor.methods({
  "getRecipe":
  function(dish,number){
    console.dir("here");
  //  const dish = Session.get("dish");
    //const number = Session.get("number");
    console.dir("dish2 = " + dish);
    console.dir("number = " + number);
    var apikey = Meteor.settings.spoonacular;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number="+number+"&offset=0&query="+dish;
    //const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+dish+"&limitLicense=false&number=10&ranking=1";
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
  },

  "advancedGet":
  function(search){
    console.dir("hi");
    var apikey = Meteor.settings.spoonacular;
    //console.log('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?cuisine=american&excludeIngredients=coconut%2C+mango&fillIngredients=false&includeIngredients=onions%2C+lettuce%2C+tomato&intolerances=peanut%2C+shellfish&limitLicense=false&maxCalories=1500&maxCarbs=100&maxFat=100&maxProtein=100&minCalories=150&minCarbs=5&minFat=5&minProtein=5&number=10&offset=0&query=burger&ranking=1&type=main+course');

  /*  var i;
    var diets = "";
    for (i = 0; i <	diet.length; i++) {
      diets+diet[i];
    }
    */
  //  const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?cuisine="+encodeURIComponent(cuisine)+"&excludeIngredients="+encodeURIComponent(allergies)+"&fillIngredients=false&includeIngredients="+encodeURIComponent(ingr)+"&intolerances="+encodeURIComponent(allergies)+"&limitLicense=false&maxCalories="+maxCal+"&maxCarbs="+maxCarb+"&maxFat="+maxFat+"&maxProtein="+maxProtein+"&minCalories="+minCal+"&minCarbs="+minCarb+"&minFat="+minFat+""&minProtein="+minProtein+"&number=10&offset=0&query="+encodeURIComponent(recipe)+"&ranking=1&type="+encodeURIComponent(mealType);
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/searchComplex?";
    console.log(search.cuisine);
   if(search.cuisine){
     url += "cuisine=";
     url += encodeURIComponent(search.cuisine);
   }

   if(search.allergies){
     url +="&excludeIngredients=";
     url += encodeURIComponent(search.allergies);
   }

   if(search.ingr){
     url += "&fillIngredients=false&includeIngredients=";
     url += encodeURIComponent(search.ingr);
   }

   if(search.allergies){
     url += "&intolerances=";
     url += encodeURIComponent(search.allergies);
   }

   if(search.maxCal){
     url += "&limitLicense=false&maxCalories=";
     url += search.maxCal;
   }

   if(search.maxCarb){
     url += "&maxCarbs=";
     url += search.maxCarb;
   }

   if(search.maxFat){
     url += "&maxFat=";
     url += search.maxFat;
   }

   if(search.maxProtein){
     url += "&maxProtein=";
     url += search.maxProtein;
   }

   if(search.minCal){
     url += "&minCalories="
     url += search.minCal;
   }

   if(search.minCarb){
     url += "&minCarbs=";
     url += search.minCarb;
   }

   if(search.minFat){
     url += "&minFat=";
     url += search.minFat;
   }

   if(search.minProtein){
     url += "&minProtein=";
     url += search.minProtein;
   }

   if(search.number){
     url += "&number=";
     url += search.number;
   }
   if(search.offset){
     url += "&offset=";
     url += search.offset;
   }
   if(search.recipe){
     url += "&query=";
     url += encodeURIComponent(search.recipe);
   }

   if(search.mealType){
     url += "&ranking=1&type=";
     url += encodeURIComponent(search.mealType);
   }




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
  "getRecipeTalk":function(dish){
    var apikey = Meteor.settings.spoonacular;
    var apiKeySpeech = Meteor.settings.apiSpeechKey;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+dish+"&limitLicense=false&number=10&ranking=1";
    const speechUrl = "https://api.api.ai/v1/query?v=20150910&query="+dish+"&lang=en&contexts=shoppingList&sessionId="+Meteor.userId();

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
  },
  //--------------SHOPPING LIST-------------------------
  "addShoppingTalk":function(shopping_obj,item){
    console.dir(item);
    console.log("clicked the button");
    var apiKey = Meteor.settings.apiSpeechKey;
    const url = "https://api.api.ai/v1/query?v=20150910&query="+item+"&lang=en&contexts=shoppingList&sessionId="+Meteor.userId();
    //const url = "https://api.api.ai/v1/intents/?v=20150910"
    //const url = "https://api.api.ai/v1/query?v=20150910";
    console.log(url);
    const z = HTTP.call("GET",
      url,
      {
        headers:{
          "Authorization": "Bearer" + apiKey,
          "Content-type": "application/json"
        }
      },
      /*function(error,result){
        console.log("result");
        console.dir(result);
        return result.content;
      }*/
      );
    //console.dir(z);
    //Shopping.insert(shopping_obj);
    return z.content;
  },

  "removeShopping":function(item){
    console.dir(item);
    console.log("clicked the x");
    Shopping.remove(item);
  },
  "addShopping":function(item){
    console.log("item");
    console.dir(item);
    Shopping.insert(item);
  },

  //--------------FAVORITES LIST-------------------------
  "removeFavorite":function(favorite){
    console.dir(favorite);
    console.log("clicked the x");
    Favorites.remove(favorite);
  },
  "addFavorite":function(favorite){
    console.log("favorite");
    console.dir(favorite);
    Favorites.insert(favorite);
  },
/*
  "addFavoriteTalk":function(fridge_obj,item){
    console.dir(item);
    console.log("clicked the button");
    var apiKey = Meteor.settings.apiSpeechKey;
    const url = "https://api.api.ai/v1/query?v=20150910&query="+item+"&lang=en&contexts=shoppingList&sessionId="+Meteor.userId();
    console.log(url);
    const z = HTTP.call("GET",
      url,
      {
        headers:{
          "Authorization": "Bearer" + apiKey,
          "Content-type": "application/json"
        }
      },

      );

    return z.content;
  },
  */
  //--------------FRIDGE LIST-------------------------
  "removeFridge":function(fridgeItem){
    console.dir(fridgeItem);
    console.log("clicked the x");
    Fridge.remove(fridgeItem);
  },
  "addFridge":function(fridgeItem){
    console.log("fridge");
    console.dir(fridgeItem);
    Fridge.insert(fridgeItem);
  },

})
