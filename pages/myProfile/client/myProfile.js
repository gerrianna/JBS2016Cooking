Template.myProfile.events({
	"click .js-talk": function(event){
		Meteor.call('pierreSpeak');
	}

});