var myMApp = angular.module('myMApp', ['ngRoute']);

myMApp.config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/Home', {
        templateUrl : 'views/home.html',
        controller : 'MainController',
    })
    .when('/directory', {
        templateUrl : 'views/directory.html',
        controller : 'MainController',
    }).otherwise({
        redirectTo : '/Home'
    })
}])

myMApp.directive('foreignPlayer', [function(){
    return {
        restrict : 'E',
        scope : {
            players : '=',
            title : '='
        },
        templateUrl : 'views/random.html',
        transclude : true,
        replace : true,
         controller : function($scope){
            $scope.$watch('players', (pl) => {
                players = pl; 
            if(pl !== undefined) $scope.foreign = $scope.players.filter(a => a.team != 'India')               
            })               
         }
    }
}]);

myMApp.factory('IndianPlayer', [ function(){
    return {
        IndianPlayer : function(players){
           var indian = players.filter(a => a.team == 'India');
           return indian;
        }
    }
}])

myMApp.controller('MainController', ['$scope','$http','IndianPlayer', function ($scope,$http,IndianPlayer) {
    $scope.Message = "Team CSK";
    $scope.removePlayer = function (player) {
        var removedPlayer = $scope.players.indexOf(player);
        $scope.players.splice(removedPlaye$routeProviderr, 1);
    }
    $scope.addNinja = function () {
        $scope.players.push({
            name: $scope.newPlayer.name,
            team: $scope.newPlayer.team,
            cost: parseFloat($scope.newPlayer.cost),
            fit: true
        })
        $scope.clearForm();
    }

    $scope.clearForm = function () {
        $scope.newPlayer.name = "";
        $scope.newPlayer.team = "";
        $scope.newPlayer.cost = "";
    }

    $http.get('data/players.json').then(function(res){
        $scope.players = res.data;
        $scope.indians = IndianPlayer.IndianPlayer(res.data);
    })
   
}])

