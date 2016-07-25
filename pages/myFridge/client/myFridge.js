Template.myFridge.helpers({
	fridgeList:function(){return Fridge.find({user:Meteor.userId()})}
});

Template.myFridge.events({
	"click .js-delete-fridgeItem": function(event){
		console.log(this.fridgeList._id);
		const fridgeItem= Fridge.findOne({_id:this.fridgeList._id});
		console.dir(fridgeItem);
		Meteor.call("removeFridge",fridgeItem);
	},
});
