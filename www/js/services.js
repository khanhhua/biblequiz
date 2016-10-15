angular.module('starter.services', [])

.service('rpcClient', ['$q', '$http', function ($q, $http) {
  const API_PREFIX = 'http://biblequiz2016.herokuapp.com/';
  const QUESTION_SET_DEFAULT_SIZE = 2;

  function getQuestionSet (category, size) {
    if (!category) {
      throw new Error('Category missing');
    }
    size = size || QUESTION_SET_DEFAULT_SIZE;

    return $http.post(API_PREFIX + 'api/client/getQuestionSet?size=' + size, {
      category: category
    }).then(function(res) {
      const data = res.data;
      if (data.ok === true) {
        return data.result;
      }

      throw new Error('Could not get question set');
    });
  }

  return {getQuestionSet:getQuestionSet};
}])
.service('scoreTracker', ['rpcClient', function (rpcClient) {
  var scoring = {
    correct: 0,
    wrong: 0
  };

  function reset () {
    scoring.correct = 0;
    scoring.wrong = 0;
  }

  function track (result) {
    if (result.correct === true) {
      scoring.correct++;
    }
    else {
      scoring.wrong++;
    }
  }

  function getScoring () {
    return angular.copy(scoring);
  }

  return {
    reset: reset,
    track: track,
    getScoring: getScoring
  };
}])
;