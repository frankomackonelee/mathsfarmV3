(function () {
'use strict';

angular.module('quesion_selector_app', [])

.controller('QSController', function($scope){
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
  }

  $scope.topicChange = function(){
    console.log("Changed topic");
    $scope.subtopics = returnRelevantArray(topics_and_subtopics,$scope.selectedTopic);
    $scope.selectedSubtopic = "NotSelected"
    console.log("Subtopics have been changed");
  }

  $scope.subtopicChange = function(){
    console.log("Changing subtopic");
    $scope.titles = returnRelevantArray(subtopics_and_titles,$scope.selectedSubtopic);
    $scope.selectedTitle = "NotSelected"
    console.log("Titles have been changed");
  }

  $scope.titleChange = function(){
    console.log("Changing titles");
    $scope.qandas = returnRelevantArray(titles_and_questions,$scope.selectedTitle);
    console.log("Questions Have Changed");
  }

});


})();
