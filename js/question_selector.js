

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
    sharedProperties.setProperty( returnRelevantArray(titles_and_questions,qs.selectedTitle) );
    console.log("Questions Have Changed");
  };

}

PageController.$inject['sharedProperties']
function PageController(sharedProperties){
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
