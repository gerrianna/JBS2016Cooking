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
	"click .js-talkShoppingItem": function(event){
		console.log("clicked it");
      	$(".js-talkShoppingItem").html("Listening...");
      	//https://shapeshed.com/html5-speech-recognition-api/
      	var recognition = new webkitSpeechRecognition();
     	recognition.onresult = function(event) {
          console.dir(event);
          $(".js-talkShoppingItem").html("Talk");
          const item = event.results[0][0].transcript;
          console.log("item");
          console.log(item);
          console.log(event.results[0][0].confidence);
          console.log("done");
          var shopping_obj={
          	text:item,
          	user:Meteor.userId()
          }
          console.dir(shopping_obj);
          Meteor.call("addShopping",shopping_obj,item, {returnStubValue: true},
          	function(error,result){
          		console.dir(error);
          		r = JSON.parse(result);
          		console.dir(r);
          	}
          );
        };

        recognition.start();
        console.log("starting the recognizer");
	}
})

/*console.log("clicked it");
      $(".js-talk").html("Listening...");
      //https://shapeshed.com/html5-speech-recognition-api/
      var recognition = new webkitSpeechRecognition();
     // var dish2 = "";
      recognition.onresult = function(event) {
          console.dir(event);
          $(".js-talk").html("Talk");
          const dish2 = event.results[0][0].transcript;
          console.log(dish2);
          //const dish2 = event.results[0][0].transcript;
          console.log(event.results[0][0].confidence);
          console.log("done");

          Meteor.apply("getRecipe",[dish2],{returnStubValue: true},
            function(error,result){
              console.dir(error);
              r = JSON.parse(result);
              console.dir(r);
              //return instance.state.set("recipes",r.results);
              return Session.set("recipes",r);
            }
          );
         // console.log("done");
        };

        recognition.start();
        console.log("starting the recognizer");
*/