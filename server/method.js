Meteor.methods({
	"getRecipe":
	function(ingr,name){
		console.dir("name =" + name);
    const z = Meteor.http.call("get",
      "http://www.recipepuppy.com/api/?q={{ingr}}");

    console.dir(z);

    return z.content;
  },
})