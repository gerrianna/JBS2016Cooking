Template.friendFav.helpers({
	friendsList:function(){return Friends.find({user:Meteor.userId()})}
});
