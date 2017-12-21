

(function () {
'use strict';

angular.module('quesion_selector_app', [])

.service('sharedProperties', sharedProperties)

.controller('QSController', QSController)

.controller('PageController', PageController);

QSController.$inject = ['sharedProperties']
function QSController(sharedProperties){
  var qs = this;

  var topics = [];
  for(var i = 0; i<topics_and_subtopics.data.length;i++){
    topics.push(topics_and_subtopics.data[i].parent);
  }
  qs.topics = topics;
  qs.selectedTopic = "NotSelected";
  qs.selectedSubtopic = "NotSelected";
  qs.selectedTitle = "NotSelected";

  var returnRelevantArray = function(unfilteredObj, selectedValue){
    for(var i = 0; i<unfilteredObj.data.length; i++){
        if(unfilteredObj.data[i].parent == selectedValue){
          return unfilteredObj.data[i].children;
        }
    }
  };

  qs.topicChange = function(){
    console.log("Changed topic");
    qs.subtopics = returnRelevantArray(topics_and_subtopics,qs.selectedTopic);
    qs.selectedSubtopic = "NotSelected"
    console.log("Subtopics have been changed");
  };

  qs.subtopicChange = function(){
    console.log("Changing subtopic");
    qs.titles = returnRelevantArray(subtopics_and_titles,qs.selectedSubtopic);
    qs.selectedTitle = "NotSelected"
    console.log("Titles have been changed");
  };

  qs.titleChange = function(){
    console.log("Changing titles");
    sharedProperties.setqAndAArray( returnRelevantArray(titles_and_questions,qs.selectedTitle) );
    console.log("Questions Have Changed");
  };

}

PageController.$inject['sharedProperties'];
function PageController(sharedProperties){
  var pc = this;

  pc.clickResponse = function(int){
    sharedProperties.changeVisibiliity(int);
  }

  pc.visible = function(int){
    return sharedProperties.isVisible(int);
  }

  pc.qandas = sharedProperties.getqAndAArray;

  pc.mouseoverQuestion = function(int){
    if(sharedProperties.isVisible(int)){
      pc.EmphasiseClass = int;
    }
  }

  pc.mouseoutQuestion = function(){
    pc.EmphasiseClass = null;
  }

  pc.GetEmphasis = function(int){
    if(int == pc.EmphasiseClass){
      return "bg-info";
    }else{
      return "";
    }
  }
}

function sharedProperties() {
  var service = this;
  var qAndAArray = [];
  var visibilityArray = [];

  service.getqAndAArray = function () {
      return qAndAArray;
  }

  service.setqAndAArray = function(value) {
      qAndAArray = value;
      for(var i = 0; i<qAndAArray.length; i++){
        visibilityArray[i] = false;
      }
  }

  service.isVisible = function(int){
    return visibilityArray[int];
  }

  service.changeVisibiliity = function(int){
    visibilityArray[int] = !visibilityArray[int];
  }
}

})();
