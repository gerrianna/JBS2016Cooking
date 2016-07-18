Template.myShopping.helpers({
	shopping:function(){return Shopping.find()}
})

Template.myShopping.events({
	"click .js-addShoppingItem": function(event){
		var item = $(" .js-shoppingItem").val();
		var shopping_obj={
			text:item
		}
		console.dir(item);
		Meteor.call("addShopping",shopping_obj);
	}
})