angular.module('starter.services', [])

.service('rpcClient', ['$q', '$http', function ($q, $http) {
  function getQuestionSet () {
    return $q.when([
      {
        id:1,
        content: 'Ipsa! Ipsa molestias deleniti duis integer aperiam faucibus sapiente accumsan nihil, neque. Gravida pulvinar tristique maxime ullamco vero lorem cubilia laoreet aliqua. Minus consequuntur nullam torto',
        choices: [
          {
            id: 'A',
            text: 'English',
            correct: true,
          },
          {
            id: 'B',
            text: 'Japanese',
          },
          {
            id: 'C',
            text: 'German',
          },
          {
            id: 'D',
            text: 'Vietnamese',
          }
        ]
      },
      {
        id:2,
        content: 'Aliquam hendrerit maxime! Dignissim exercitationem ullam nullam bibendum necessitatibus voluptatem! ',
        choices: [
          {
            id: 'A',
            text: 'America',
          },
          {
            id: 'B',
            text: 'Asia',
            correct: true
          },
          {
            id: 'C',
            text: 'Europe',
          },
          {
            id: 'D',
            text: 'Artic',
          }
        ]
      }
    ])
  }

  return {getQuestionSet:getQuestionSet};
}]);