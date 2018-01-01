(function () {

  'use strict';

  var thisApp = angular.module('quesion_selector_app', [])
  thisApp.service('sharedProperties', sharedProperties)
  thisApp.controller('QSController', QSController)
  thisApp.controller('QuestionPageController', QuestionPageController)
  thisApp.controller('CatchPhrasePageController', CatchPhrasePageController)
  thisApp.directive('questionSelection',QuestionSelection)

/*Start of control of the top navbar, common to multiple all pages...*/
  thisApp.directive('navDirective', NavDirective);

  function NavDirective(){
      var ddo = {
        templateUrl: './html/top_menu_bar.html',
        controller: TopNavController,
        controllerAs: 'navCtrl',
        bindToController: true,
        scope:{
          currentpage: '@currentpage'
        }
      }
      return ddo;
  }

  function TopNavController(){
      var navCtrl = this;
      navCtrl.pageClassStatus = function(name){
        if(name == navCtrl.currentpage){
          return "active";
        }else{
          return null;
        }
      }
  }
  /*End of control of the top navbar*/

  /*Provides the html for the dropdown selectors
  */
  function QuestionSelection(){
    var ddo = {
      templateUrl: './html/question_selection.html',
      restrict: 'E'
    }
    return ddo;
  }

  /*Controller responsible for the question sellectors which are common to all resource pages
  This will talk to the APIs to access quesiton titles and quesitons etc, and manage the display of these
  EXCEPT the question titles which it passes to the sharedProperties service to be displayed differently
  on each page.
  TODO: make this a point to read out of cookies the questions which are available...
  TODO: involves writing a read to cookies function.
  */
  QSController.$inject = ['sharedProperties']
  function QSController(sharedProperties){
    var qs = this;

    var topics = [];
    for(var i = 0; i<topics_and_subtopics.data.length;i++){
      topics.push(topics_and_subtopics.data[i].parent);
    }

    /*This is where to read from the cookies*/
    qs.topics = topics;
    qs.selectedTopic = "NotSelected";
    qs.selectedSubtopic = "NotSelected";
    qs.selectedTitle = "NotSelected";

    qs.writeCookie = function(name,value){
      document.cookie = encodeURI(name + "=" + value + ";");
    }

    qs.readCookie = function(name){
      var cname = name + "=";
      var decodedCookie = decodeURIComponent(document.cookie)
      var ca = decodedCookie.split(";");
      for(var i = 0; i<ca.length; i++){
        var c = ca[i];
        while(c.charAt(0)==" "){
          c = c.substring(1);
        }
        if(c.indexOf(cname)==0){
          return c.substring(cname.length,c.length);
        }
      }
      //TODO: here is where to get the default questions in:
      //Note if you change this, need to adjust where this is read too below...
      return "";
    }

    //TODO: read questions from cookies here:
    sharedProperties.setqAndAArray(JSON.parse(qs.readCookie("questions")))

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
      var qandas = returnRelevantArray(titles_and_questions,qs.selectedTitle);
      sharedProperties.setqAndAArray( qandas );
      qs.writeCookie("questions",JSON.stringify(qandas));
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
    //var qAndAArray = [{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"},{question:"easy question",answer:"easy answer"}];
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

    //setqAndAArray([{question:"easy question",answer:"easy answer"}]);

    service.isVisible = function(int){
      return visibilityArray[int];
    }

    service.changeVisibiliity = function(int){
      visibilityArray[int] = !visibilityArray[int];
    }

    //TODO: this randomiser needs to be more er... random
    //But always generate the same response for a given seed
    service.indexToNumberRandomiser = function(index, seed){
      var random1 = [3,6,9,12,15,1,4,7,10,13,16,2,5,8,11,14,17,0];
      var position = random1[index]
      return position;
    }
    service.positionToIndexRandomiser = function(position){
      var random1 = [3,6,9,12,15,1,4,7,10,13,16,2,5,8,11,14,17,0];
      var index;
      for(var i=0; i<random1.length; i++){
        if(random1[i]==position){
          index = i;
        }
        return index;
      }
    }
  }

  /*Responsible for control of the content of the Question (Resourse) page: question.html
  */
  QuestionPageController.$inject['sharedProperties'];
  function QuestionPageController(sharedProperties){
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

  /*Responsible for control of the content of the Question (Resourse) page: question.html
  */
  CatchPhrasePageController.$inject['sharedProperties'];
  function CatchPhrasePageController(sharedProperties){
    var pc = this;
    var makeLastClicked = function(qOrA, number){
      lastClicked = {
        qOrA: qOrA,
        number: number,
      }
      return lastClicked;
    }
    var lastClicked = makeLastClicked();
    pc.qandas = function(){
      var justQandAs = sharedProperties.getqAndAArray();
      for (var i = 0; i<justQandAs.length; i++) {
        justQandAs[i].answerAtIndex = justQandAs[sharedProperties.indexToNumberRandomiser(i)].answer;
      }
      return justQandAs;
    };

    /* Start Controlling the change of visibility as questions are cliked */
    pc.questionClick = function(number){
      pc.commonClickFunction(number, "question");
    };
    pc.answerClick = function(index){
      var number = sharedProperties.indexToNumberRandomiser(index);
      pc.commonClickFunction(number, "answer");
    };
    pc.commonClickFunction = function(number, qOrA){
      if(lastClicked.qOrA == null){
        lastClicked = makeLastClicked(qOrA,number);
      }else{
        if(lastClicked.qOrA!=qOrA&&lastClicked.number==number){
          pc.questionAnswered(number);
        }else{
          alert("whoops got Question "+number+" wrong")
        }
        lastClicked = makeLastClicked();
      }
    }
    pc.questionAnswered = function(number){
      sharedProperties.changeVisibiliity(number);
    };
    /* End controlling the change of visibility as questions are cliked */

    /* Start of control of visibility during the digest cycle*/
    pc.answerMissing = function(index){
      var number = sharedProperties.indexToNumberRandomiser(index);
      return pc.isMissing(number);
    }
    pc.isMissing = function(number){
      return sharedProperties.isVisible(number)
    }
    /* End of control of visibilty during the digest cycle*/
  }

})();
