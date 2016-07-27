Template.myShopping.helpers({
	shoppingList:function(){return Shopping.find({user:Meteor.userId()})}
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
		console.log(this.shoppingList._id);
		const item = Shopping.findOne({_id:this.shoppingList._id});
		console.dir(item);
		Meteor.call("removeShopping",item);
	},
	"click .js-talk": function(event){
    Meteor.call('pierreSpeak');
	}
})
