Template.myShopping.helpers({
	shopping:function(){return Shopping.find({user:Meteor.userId()})}
})

Template.myShopping.events({
	"click .js-addShoppingItem": function(event){
		var item = $(" .js-shoppingItem").val();
		var shopping_obj={
			text:item,
			user:Meteor.userId()
		};
		console.dir(item);
		Meteor.call("addShopping",shopping_obj);
	},
	"click .js-delete-shoppingItem": function(event){
		const item = Shopping.findOne({_id:this.shopping._id});
		Meteor.call("removeShopping",item);
	}
})