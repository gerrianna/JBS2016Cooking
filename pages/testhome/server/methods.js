import unirest from 'unirest';

Meteor.methods({
	/*"getnewRecipe":
	function(ingr){
		const apikey = Meteor.settings.spoonacular;
    	const url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/classify";
      	console.log(url);
      	const z = Meteor.http.call("get",apikey, url);
      	return z.content;

		/*console.dir("name =" + name);
    const z = Meteor.http.call("get",
      "http://www.recipepuppy.com/api/?q={{ingr}}");

    console.dir(z);

    return z.content;*/
    "getnewRecipe" : function(ingr){
    	unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients="+ingr)
		.header("X-Mashape-Key", Meteor.settings.spoonacular)
		.header("Accept", "application/json")
		.end(function (result) {
  		console.log(result.status, result.headers, result.body);
  		return result.body
  		});
    }

})
 