Meteor.methods({
  "getRecipe":
  function(dish){
    //console.dir("ingr2 = " + ingr);
    console.dir("dish2 = " + dish);
    var apikey = Meteor.settings.spoonacular;
    //const url = "http://www.recipepuppy.com/api/?i="+ingr+"&q="+dish+"&p=3";
    const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1";
    //const url = "http://www.recipepuppy.com/api/?q="+dish+"&p=3";
      console.log(url);
      //const z = Meteor.https.call("get",apikey,url);
      //return z.content;
     HTTP.call("GET", 
      "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=apples%2Cflour%2Csugar&limitLicense=false&number=5&ranking=1",
     {headers: {
    "X-Mashape-Key": apikey,
    "Accept": "application/json"
      }}, function(error, result) {
        if(!error) {
          console.log("successful");
          console.dir(result);
          return result;
        }
      }
      );
    /*console.dir("name =" + name);
    const z = Meteor.http.call("get",
      "http://www.recipepuppy.com/api/?q={{ingr}}");

    console.dir(z);

    return z.content;*/

  },
})