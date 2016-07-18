Template.advancedSearch.helpers({
  recipes: function(){
    const instance = Template.instance();
    return instance.state.get("recipes");
  },
});
