Template.results.onCreated(function() {
  //this.state = new ReactiveDict();
  //Session.setDefault({
    //recipes:[],
  //});
  console.log("creating the template");
  //console.dir(this.state);
});
Template.instructions.helpers({
  instruction: function(){
    return Ins.find({});
  } 
});

Template.results.helpers({
  recipes: function(){
    const instance = Template.instance();
    //return instance.state.get("recipes");
    //return Session.get("recipes");
    return Rec.find({});
  }

});
Template.results.events({
  "click .js-reclink":function(events){
    Meteor.call("removeRec");
    events.preventDefault();
    var recId = this.id;
    var id = this._id;
    Session.set("selectedrecipe", id);
    Meteor.call("removeIns");
    Meteor.apply("getInstructions",[recId],{returnStubValue: true},
        function(error,result){
          if(error) {
            console.dir(error);
          }
          console.dir("x");
          x = JSON.parse(result);

          for(var i=0; i<x.length; i++){
            Ins.insert(x[i]);
            //var hello = Session.get('selectedrecipe');
            //Rec.update({_id:hello}, {$set:{
              //steps: this.steps
            //}});
          }
          return Ins.find({});
        
        }

    );
    
    Router.go('/instructions');

    
    
    
  }
})