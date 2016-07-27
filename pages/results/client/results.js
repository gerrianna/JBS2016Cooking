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
    let user = Ins.findOne({})
    return user && user.steps;
  },
  ingredient: function(){
    let ingr = Ins.findOne({})
    var ingredients = [];
    for(var i=0; i<ingr.steps.length; i++){
      for(var j=0; j<ingr.steps[i].ingredients.length; j++){
          ingredients.push(ingr.steps[i].ingredients[j].name);
      }
    }
    var newone = _.uniq(ingredients);
   
    function register(){
      var printThis = "";
      for(var i = 0; i < newone.length; i++){
        printThis += "<br>"+newone[i];
      }
      return printThis; 
    }
    document.getElementById('ingredients').innerHTML = register();
    
  },
  equipment: function(){
    let equip = Ins.findOne({})
    var eq = [];
    for(var i=0; i<equip.steps.length; i++){
      for(var j=0; j<equip.steps[i].equipment.length; j++){
          eq.push(equip.steps[i].equipment[j].name);
      }
    }
    var newone = _.uniq(eq);
   
    function reg(){
      var printThis = "";
      for(var i = 0; i < newone.length; i++){
        printThis += "<br>"+newone[i];
      }
      return printThis; 
    }
    document.getElementById('eq').innerHTML = reg();
  },
  recipeInfo : function(){
    return He.find({});
  },
  headername: function(){
    var x = Session.get("recname");
    console.log(x);
    return x;
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
    
    events.preventDefault();
    var recId = this.id;
    var name = this.title;
    var id = this._id;
    Session.setPersistent("selectedrecipe", id);
    Session.setPersistent("recname", name);
    Meteor.call("removeIns");

    Meteor.apply("getInstructions",[recId],
        function(error,result){
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
    Meteor.apply("getRecipeIngredients", [recId],
      function(error, result){
        a = JSON.parse(result);
        console.log(a);
        He.insert(a);
      }
    );
    
    Router.go('/instructions');

    
    
    
  },
  "click .js-newsearch": function(events){
    Meteor.call("removeRec");
    Router.go('/');
  }
})