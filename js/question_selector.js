

(function () {
'use strict';

angular.module('quesion_selector_app', [])

.service('sharedProperties', function () {
  var property = [];
    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
})

.controller('QSController', QSController)

.controller('PageController', PageController);

QSController.$inject = ['$scope', 'sharedProperties']
function QSController($scope, sharedProperties){
  var topics = [];
  for(var i = 0; i<topics_and_subtopics.data.length;i++){
    topics.push(topics_and_subtopics.data[i].parent);
  }
  $scope.topics = topics;
  $scope.selectedTopic = "NotSelected";
  $scope.selectedSubtopic = "NotSelected";
  $scope.selectedTitle = "NotSelected";

  var returnRelevantArray = function(unfilteredObj, selectedValue){
    for(var i = 0; i<unfilteredObj.data.length; i++){
        if(unfilteredObj.data[i].parent == selectedValue){
          return unfilteredObj.data[i].children;
        }
    }
  };

  $scope.topicChange = function(){
    console.log("Changed topic");
    $scope.subtopics = returnRelevantArray(topics_and_subtopics,$scope.selectedTopic);
    $scope.selectedSubtopic = "NotSelected"
    console.log("Subtopics have been changed");
  };

  $scope.subtopicChange = function(){
    console.log("Changing subtopic");
    $scope.titles = returnRelevantArray(subtopics_and_titles,$scope.selectedSubtopic);
    $scope.selectedTitle = "NotSelected"
    console.log("Titles have been changed");
  };

  $scope.titleChange = function(){
    console.log("Changing titles");
    sharedProperties.setProperty( returnRelevantArray(titles_and_questions,$scope.selectedTitle) );
    console.log("Questions Have Changed");
  };

}

PageController.$inject['$scope','sharedProperties']
function PageController($scope, sharedProperties){
  var pc = this;

  pc.visibility = [];

  var fillVisibility = function(fillTo){
    for(var i = pc.visibility.length; i<fillTo; i++){
      pc.visibility.push(false);
    }
  };

  pc.clickResponse = function(int){
    if(int > pc.length){
      fillVisibility(int);
    }
    pc.visibility[int] = !pc.visibility[int];
  }
  pc.visible = function(int){
    return pc.visibility[int];
  }
  pc.invisible = function(int){
    return !pc.visible(int);
  }

  pc.qandas = function(){
    return sharedProperties.getProperty();
  }

}

})();
