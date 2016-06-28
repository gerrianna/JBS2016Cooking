Meteor.methods({
	"getRecipe":
	function(ingr,name){
		console.dir(ingr);
    const z = Meteor.http.call("get",
      "http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3");
      console.dir(z);
      return z.content;
  },
})
