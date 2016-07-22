Meteor.methods({
  "getRecipe":
  function(dish){
    console.dir("dish2 = " + dish);
    var apikey = Meteor.settings.spoonacular;
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+dish+"&limitLicense=false&number=10&ranking=1";
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
  }
})