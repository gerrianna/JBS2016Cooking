Template.results.onCreated(function() {
  //this.state = new ReactiveDict();
  Session.setDefault({
    recipes:[],
  });
  console.log("creating the template");
  //console.dir(this.state);
});

Template.results.helpers({
  recipes: function(){
    const instance = Template.instance();
    //return instance.state.get("recipes");
    return Session.get("recipes");
  },

})

Template.results.events({
  "click .js-talk": function(event){
    console.log("clicked it");
    $(".js-talk").html("Listening...");
        //https://shapeshed.com/html5-speech-recognition-api/
    var recognition = new webkitSpeechRecognition();
    recognition.onresult = function(event) {
      console.dir(event);
      $(".js-talk").html("Talk");
      const item = event.results[0][0].transcript;
      console.log("item");
      console.log(item);
      console.log(event.results[0][0].confidence);
      console.log("done");
      Meteor.call("getRecipeTalk",item, {returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("r");
          r = JSON.parse(result);
          console.dir(r);
          var s = r.result.parameters.page;
          console.dir(s);
          Router.go('/'+s);
                //console.dir(r.result.parameters.groceryItem);
                //var arr = [r.result.parameters.groceryItem, r.result.parameters.groceryItem1];
                //var a= r.result.parameters;
                //for(var key in arr){
                  //console.log("key" + arr[key]);
          /*var s = r.result.parameters.groceryItem;
          console.dir(s);
          shopping_obj = {
            text:s,
            user:Meteor.userId()
          }
          console.log("shopping obj");
          console.dir(shopping_obj);
          Meteor.call("addShopping",shopping_obj);
          var t = r.result.fulfillment.speech;

          var pierreWords = new SpeechSynthesisUtterance(t);
          window.speechSynthesis.speak(pierreWords);*/
        }
      );
      
    };
    recognition.start();
    console.log("starting the recognizer");
  }
})
