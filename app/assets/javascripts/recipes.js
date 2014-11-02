var recipeObject = {};
var recipeListObject = [];
var recipeSortedArray = [];

$(document).ready(function(){
  $('.eatItBody').on('click', 'a.matchedRecipeTitle', function(){
    $(this).next().next().toggle(800);
    $(this).next().toggle(1200);
  })
  $('.submit-button').on('click', function(){
    recipeObject.stop = [];
    var array = document.forms["ingredientForm"].getElementsByTagName('input');
    for(var i = 0; i < array.length - 1 ; i++){
      if(array[i].checked){recipeObject.stop.push(array[i].value.toLowerCase())}
    };
    recipeObject.go = $('#ingredientInput').val().split(',');
    recipeObject.name = $('#ex1_value').val();
  });
});

(function(){
  var app = angular.module('app', ["angucomplete"]);
  app.controller('MainController', ['$scope', '$http',
    function MainController($scope, $http) {
      $scope.hideFlag = false;
      $scope.titles = recipeTitles;
      $scope.recipe = "";
      $scope.getRecipes = function(){
        var string = 'http://localhost:3000/finder/'+ $scope.recipe.title;
        var returnedRecipes = $http.get(string);
        returnedRecipes.success(function(data){
          recipeObject.displayOrder = [], go = [], ord = [];
          for(var i = 0; i < data.recipe_list_relations.length; i++){
            if((_.intersection(data.recipe_list_relations[i].ingredient_array, recipeObject.stop).length !== 0)){
            } else if((_.intersection(data.recipe_list_relations[i].ingredient_array, recipeObject.go).length !== 0)){
              go.push(data.recipe_list_relations[i]);
            } else { ord.push(data.recipe_list_relations[i])};
          }
          var newArray = _.union(go,ord);
          $scope.resultsRecipes = _.uniq(newArray);
          for(var i = 0; i < $scope.resultsRecipes.length; i++){
            var length = ($scope.resultsRecipes[i].ingredient.length)-4;
            var array = $scope.resultsRecipes[i].ingredient.substr(2,length).split('",')
            $scope.resultsRecipes[i].ingredient = array
          }
          $('form, angucomplete, .base').toggle(3000);
          $scope.hideFlag = true;
        })
        // .
        // then(function(){
        //   $('ul').hide(3000)
        // })
        .
        error(function(){
          console.log('Error occurred on $HTTP call')
        });
      }
    }
  ]);
})();

