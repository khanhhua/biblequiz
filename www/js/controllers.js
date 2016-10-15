angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CategoryListCtrl', function($scope, $state) {
  $scope.categories = [
    { title: 'Books', id: 1 },
    { title: 'Kings', id: 2 }
  ];

  $scope.play = function (categoryID) {
    $state.go('app.quiz', {
      categoryID: categoryID
    });
  };
})

.controller('QuizCtrl', [
  '$scope',
  '$stateParams',
  '$state',
  '$ionicPopup',
  'rpcClient',
  'model',
  function($scope, $stateParams, $state, $ionicPopup, rpcClient, model) {
    console.log('State params:', $stateParams);

    const PHASE_QUESTION_ASK = 1;
    const PHASE_QUESTION_RESULT = 2;
    const PHASE_QUIZ_RESULT = 3;

    const ANSWER_RESULT_NONE = 0;
    const ANSWER_RESULT_CORRECT = 1;
    const ANSWER_RESULT_WRONG = 2;

    /**
     *
     * @return {{phase: number, questionIndex: number}}
     */
    function nextPhase() {
      if ($scope.currentPhase === PHASE_QUESTION_ASK) {
        if ($scope.answerResult !== ANSWER_RESULT_NONE) {
          return {
            phase: PHASE_QUESTION_RESULT,
            questionIndex: $scope.currentIndex
          };
        }
        else {
          return {
            phase: PHASE_QUESTION_ASK,
            questionIndex: $scope.currentIndex + 1
          };
        }
      }
      else if ($scope.currentPhase === PHASE_QUESTION_RESULT) {
        if ($scope.currentIndex < $scope.questions.length - 1) {
          return {
            phase: PHASE_QUESTION_ASK,
            questionIndex: $scope.currentIndex + 1
          };
        }
        else {
          return {
            phase: PHASE_QUIZ_RESULT,
            questionIndex: -1
          };
        }
      }
    }

    function executePhase(o) {
      $scope.currentPhase = o.phase;
      $scope.currentIndex = o.questionIndex;

      if ($scope.currentPhase === PHASE_QUESTION_ASK) {
        $scope.answerResult = ANSWER_RESULT_NONE;
        $scope.currentQuestion = $scope.questions[$scope.currentIndex];
      }
      if ($scope.currentPhase === PHASE_QUESTION_RESULT) {
        var popup = $ionicPopup.show({
          template: '<div>RESULT:</div>',
          title: 'Result',
          buttons: [
            {
              text: '<b>OK</b>',
              type: 'button-positive'
            }
          ]
        });

        popup.then(function () {
          const phase = nextPhase();
          executePhase(phase);
        });
      }
      else if ($scope.currentPhase === PHASE_QUIZ_RESULT) {
        $state.go('app.quiz-result');
      }
    }

    $scope.choiceLabels = 'ABCDEF'.split('');
    $scope.questions = model.questions;

    $scope.currentPhase = PHASE_QUESTION_ASK;
    $scope.currentIndex = 0;
    $scope.currentQuestion = $scope.questions[$scope.currentIndex];

    $scope.answerResult = ANSWER_RESULT_NONE;

    $scope.choose = function (choice) {
      if (choice.correct) {
        console.log('[QuizCtrl.choose] Correct!!!');
        $scope.answerResult = ANSWER_RESULT_CORRECT;
      }
      else {
        console.log('[QuizCtrl.choose] Better luck next time <3 <3 <3');
        $scope.answerResult = ANSWER_RESULT_WRONG;
      }

      const phase = nextPhase();

      executePhase(phase);
    };

    $scope.skip = function () {
      const phase = nextPhase();

      executePhase(phase);
    };

    $scope.acceptQuestionResult = function () {
      const phase = nextPhase();

      executePhase(phase);
    };
  }]);
