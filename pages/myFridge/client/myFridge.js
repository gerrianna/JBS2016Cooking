Template.myFridge.helpers({
	fridgeList:function(){return Fridge.find({user:Meteor.userId()})}
});

Template.myFridge.events({
	"click .js-add-fridgeItem": function(event){
		var item = $(" .js-fridgeItem").val();
		var fridge_obj={
			text:item,
			user:Meteor.userId()
		};
		console.dir(item);
		Meteor.call("addFridge",fridge_obj);
	},
	"click .js-delete-fridgeItem": function(event){
		console.log(this.fridgeList._id);
		const fridgeItem= Fridge.findOne({_id:this.fridgeList._id});
		console.dir(fridgeItem);
		Meteor.call("removeFridge",fridgeItem);
	},

	"click .js-talk": function(event){
		Meteor.call('pierreSpeak');
	},
	"click .js-searchfridge": function(event){
		const fridge = document.getElementsByName("itemcheckbox");
		console.log(fridge);
		//Meteor.call("getRecipe");
	}

});
