Meteor.methods({
	"getRecipe":
	function(ingr,name){
    const z = Meteor.http.call("get",
      "http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3");

      console.dir(z);
      return z.content;
  },
})