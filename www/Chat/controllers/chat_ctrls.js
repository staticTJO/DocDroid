var chat = angular.module('chat');

chat.controller('ChatCtrl', function($scope, $stateParams, $ionicPopup, $timeout, Socket, FactoryChat)
{
  $scope.data = {};
  $scope.data.message = "";
  $scope.messages = FactoryChat.getMessages();
  var typing = false;
  var lastTypingTime;
  var TYPING_TIMER_LENGTH = 250;

  Socket.on('connect',function(){
      //Socket.emit('add user','Dr.'+$stateParams.doctorid.lastName);
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

chat.controller('roomCtrl', function($scope,$state){
   //var careteamID = "123"
    $scope.createRoom = function(careteamID){
      Socket.emit('room', careteamID);
    };
    $state.go("main.chats" + careteamID);
    
});