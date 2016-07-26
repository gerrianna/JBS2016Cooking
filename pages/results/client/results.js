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
  "click .js-talk": function(event,instance){
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
          //const dish2 = event.results[0][0].transcript;
      console.log(event.results[0][0].confidence);
      console.log("done");

      Meteor.call("getRecipeTalk",item,{returnStubValue:true},
        function(error,result){
          if(error){
            console.dir(error);
          }
          console.dir("r");
          r = JSON.parse(result);
          console.dir(r);
          var s = r.result.parameters.ingredients;
          if(r.result.parameters.page != undefined){
            t = r.result.parameters.page;
            Router.go('/'+t);
          } else if(r.result.parameters.page == undefined){
          Meteor.apply("getRecipe",[s],{returnStubValue:true},
            function(error,result){
              console.dir(error);
              r = JSON.parse(result);
              console.dir(r);
                  //return instance.state.set("recipes",r.results);
              return Session.set("recipes",r);
            })
            Router.go('/results');
          }              
        }
      );
    };
    recognition.start();
    console.log("starting the recognizer");
  },
})
