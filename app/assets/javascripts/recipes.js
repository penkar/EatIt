$(document).ready(function(){
  var recipeObject = {};

  $('.submit-button').on('click', function(){
    recipeObject.stop = [];
    var array = document.forms["ingredientForm"].getElementsByTagName('input');
    for(var i = 0; i < array.length - 1 ; i++){
      if(array[i].checked){recipeObject.stop.push(array[i].value)}
    };
    recipeObject.go = $('#ingredientInput').val().split(',');
    console.log(recipeObject);
  });
});

var app = angular.module('app', ["angucomplete"]);

app.controller('MainController', ['$scope', '$http',
    function MainController($scope, $http) {
        $scope.titles = recipeTitles;
    }
]);

