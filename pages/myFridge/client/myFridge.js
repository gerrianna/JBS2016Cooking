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

	"click .js-talkFridgeItem": function(event){
		console.log("clicked it");
      	$(".js-talkFridgeItem").html("Listening...");//starting to listen
      	//https://shapeshed.com/html5-speech-recognition-api/
      	var recognition = new webkitSpeechRecognition();
     	  recognition.onresult = function(event) {
          console.dir(event);
          $(".js-talkFridgeItem").html("Talk");//finished listening
          const item = event.results[0][0].transcript;//processed transcript
          console.log("item");
          console.log(item);
          console.log(event.results[0][0].confidence);//the confidence level of transcript
          console.log("done");
          var fridge_obj={
          	text:item,
          	user:Meteor.userId()
          }
          console.dir(shopping_obj);
          Meteor.call("addFavoriteTalk",fridge_obj,item, {returnStubValue: true},
          	function(error,result){
              if(error) {
                console.dir(error);
              }
              console.dir("r");
              r = JSON.parse(result);
              console.dir(r);
                var s = r.result.parameters.groceryItem;
                console.dir(s);
                fridge_obj = {
                  text:s,
                  user:Meteor.userId()
                }
                Meteor.call("addFridge",fridge_obj);
              //}
              /*for each (){
                console.log("item");
              };*/
              //console.dir(a);
              //return Session.set("recipes",r);

            }
          );
        };

        recognition.start();
        console.log("starting the recognizer");
	}

});
