var chat = angular.module('chat');

chat.controller('ChatCtrl', function($scope, $stateParams, $ionicPopup, $timeout, Socket, FactoryChat) {
  $scope.data = {};
  $scope.data.message = "";
  $scope.messages = FactoryChat.getMessages();
  var typing = false;
  var lastTypingTime;
  var TYPING_TIMER_LENGTH = 250;

  Socket.on('connect',function(){

  });

 FactoryChat.scrollBottom();

  if($stateParams.username){
    $scope.data.message = "@" + $stateParams.username;
    document.getElementById("msg-input").focus();
  } 

  var sendUpdateTyping = function(){
    if (!typing) {
      typing = true;
      Socket.emit('typing');
    }
    lastTypingTime = (new Date()).getTime();
    $timeout(function () {
      var typingTimer = (new Date()).getTime();
      var timeDiff = typingTimer - lastTypingTime;
      if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
        Socket.emit('stop typing');
        typing = false;
      }
    }, TYPING_TIMER_LENGTH);
  };

  $scope.updateTyping = function(){
    sendUpdateTyping();
  };

  $scope.messageIsMine = function(username){
    return $scope.data.username === username;
  };

  $scope.getBubbleClass = function(username){
    var classname = 'from-them';
    if($scope.messageIsMine(username)){
      classname = 'from-me';
    }
    return classname;
  };

  $scope.sendMessage = function(msg){
    FactoryChat.sendMessage(msg);
    $scope.data.message = "";
  };

});

chat.controller('PeopleCtrl', function($scope, Users) {
  $scope.data = Users.getUsers();
});

chat.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});

chat.controller('AccountCtrl', function($scope, Chat) {
  $scope.username = Chat.getUsername();  
}, true);

chat.controller('listCtrl', function($scope, $http){
  $http.get('http://localhost:8080/Medroid/careteams.jsonArray').then(function(data){
      $scope.careteam = data;
      
  });  
    $scope.createRoom = function(newroom){
        mySocket.emit('switch room', newroom);
    };
});