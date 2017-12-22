(function () {

  'use strict';

  var thisApp = angular.module('quesion_selector_app', [])
  thisApp.service('sharedProperties', sharedProperties)
  thisApp.controller('QSController', QSController)
  thisApp.controller('PageController', PageController)
  thisApp.directive('topMenuBar', TopMenuBar);
  thisApp.directive('questionSelection',QuestionSelection)

  /*Provides the html for the top menu bar
  See lecture 26
  */
  function TopMenuBar(){
    var ddo = {
      templateUrl: './html/top_menu_bar.html'
    }
    return ddo;
  }

  /*Provides the html for the dropdown selectors
  */
  function QuestionSelection(){
    var ddo = {
      templateUrl: './html/question_selection.html',
    }
    return ddo;
  }

  /*Controller responsible for the question sellectors
  which are common to all resource pages
  */
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
      qs.subtopics = returnRelevantArray(topics_and_subtopics,qs.selectedTopic);
      qs.selectedSubtopic = "NotSelected"
    };

    qs.subtopicChange = function(){
      qs.titles = returnRelevantArray(subtopics_and_titles,qs.selectedSubtopic);
      qs.selectedTitle = "NotSelected"
    };

    qs.titleChange = function(){
      sharedProperties.setqAndAArray( returnRelevantArray(titles_and_questions,qs.selectedTitle) );
    };

  }

  /*Service responsible for sharing data between
  the controller of the question selector and
  the controller of the page selector.
  Only whether answers are visible need to be shared
  */
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

  /*Responsible for control of the content of a particular page
  */
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

})();
