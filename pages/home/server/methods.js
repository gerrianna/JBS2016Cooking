Meteor.methods({
	"getRecipe":
	function(ingr,dish){

		console.dir("ingr2 = " + ingr);
    console.dir("dish2 = " + dish);
    const url = "http://www.recipepuppy.com/api/?i="+ingr+"&q="+dish+"&p=3";
      console.log(url);
      const z = Meteor.http.call("get",url);
      return z.content;

		/*console.dir("name =" + name);
    const z = Meteor.http.call("get",
      "http://www.recipepuppy.com/api/?q={{ingr}}");

    console.dir(z);

    return z.content;*/

  },
})