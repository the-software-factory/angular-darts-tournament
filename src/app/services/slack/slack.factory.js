'use strict';

angular
  .module('app')
  /**
   * @ngdoc service
   * @name app.service:Slack
   * @kind function
   * @description
   * Provides functions to handle the slack integration
   */
  .factory('Slack', [
    '$http',
    'Match',
    'Storage',
    '$filter',
    function($http, Match, Storage, $filter) {

      /**
       * @ngdoc property
       * @name Slack#url
       * @type {String}
       * @propertyOf app.service:Slack
       */
      var url = Storage.get('slackUrl');

      /**
       * @ngdoc method
       * @name Slack#postShouout
       * @kind function
       * @methodOf app.service:Slack
       * @param {Object} player the shoutouted player
       * @description
       * Posts a message with the shoutouted player
       */
      function postShoutout(player) {
        $http({
          url: url,
          method: "POST",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: 'payload= ' + JSON.stringify({
            "username" : "Darts Tournament",
            "icon_emoji": ":dart:",
            "attachments": [
              {
                "mrkdwn_in": ["text"],
                "color": "FF3515",
                "pretext": "Cappotto!",
                "text": "*" + player.name + "* è stato cappottato!"
              }
            ]
          })
        });
      }

      /**
       * @ngdoc method
       * @name Slack#postWinners
       * @kind function
       * @methodOf app.service:Slack
       * @description
       * Posts a message with the winner(s) of the match
       */
      function postWinner() {
        var winnersText = getWinnersText();
        $http({
          url: url,
          method: "POST",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          data: 'payload=' + JSON.stringify({
            "username" : "Darts Tournament",
            "icon_emoji": ":dart:",
            "attachments": [
              {
                "mrkdwn_in": ["text"],
                "color": "0AEB12",
                "pretext": "Congratulazioni!",
                "text": winnersText
              }
            ]
          })
        });
      }

      /**
       * @ngdoc method
       * @name Slack#getWinnersText
       * @kind function
       * @methodOf app.service:Slack
       * @description
       * Provide the text for the winners' message
       */
      function getWinnersText() {
        var winners = Match.getWinners();

        if (winners.length == 1) {
          return '*' + winners[0].name + '*' + $filter('translate')('ONEWINNER');
        }

        var string = winners[0].name;
        for (var i = 1; i < winners.length; i++) {
          string += ' ' + winners[i].name;
        }
        return  '*' + string + '*' + $filter('translate')('MOREWINNERS');
      }

      return {
        postWinner: postWinner,
        postShoutout: postShoutout
      };
    }
  ]);
