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
      if(array[i].checked){recipeObject.stop.push(array[i].value)}
    };
    recipeObject.go = capitaliseFirstLetter($('#ingredientInput').val()).split(',');
    recipeObject.name = $('#ex1_value').val();
  });
});

function capitaliseFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

(function(){
  var app = angular.module('app', ["angucomplete"]);
  app.controller('MainController', ['$scope', '$http',
    function MainController($scope, $http) {
      $scope.titles = recipeTitles;
      $scope.recipe = "";
      $scope.restart = function(title){
        console.log('NEW RECIPE SHOULD APPEAR BELOW', title);
        var newRecipe = title;
        $('form, angucomplete, .base').toggle(1500);
        $scope.startOver = '';
        $scope.resultsRecipes = [];
        $scope.oneRecipeIngredient = [];
        $('#ex1_value').val(newRecipe);
        $scope.recipe.originalObject.name = newRecipe;
        $scope.recipe.title = newRecipe;
        $scope.find_ingredient();
      }
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
            $scope.resultsRecipes[i].ingredient = array;
          }
          $('form, angucomplete, .base').toggle(1500);
          setTimeout(function() {
            $('ul', '.eatItBody').toggle(1500);
          }, 100);
        }).error(function(){
          console.log('Error occurred on $HTTP call');
        });
      }
      $scope.oneRecipeIngredient = []
      $scope.find_ingredient = function(){
          var string = 'http://localhost:3000/find_ingredient/'+$scope.recipe.title;
          var returnedIngredientArray = $http.get(string);
        returnedIngredientArray.success(function(data){
          $scope.oneRecipeIngredient = _.values(data)[0];
          console.log(_.values(data)[0]);
        }).error(function(){
          console.log('Error occurred on $HTTP call');
        });
      }
    }
  ]);
  app.directive('myCheckBox', function(){
    return{
      restrict: 'E',
      template: '<p ng-class="{active:isChecked}" class="ingredient"><input type="checkbox" ng-model="isChecked" name="{{text}}" value="{{text}}"></input>{{text}}</p>',
      replace: true,
      scope:{
        text: '@'
      }
    }
  })
})();

