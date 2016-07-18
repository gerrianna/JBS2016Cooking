Meteor.methods({
  "addShopping":function(item){
    console.dir(item);
    console.log("clicked the button");
    Shopping.insert(item);
  }
})