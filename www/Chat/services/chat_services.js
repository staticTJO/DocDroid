//var socket = io('http://localhost:3000');

var chatFactory = angular.module('chat');

 chatFactory.factory('Socket', function(socketFactory){
  //  var myIoSocket = io.connect('http://chat.socket.io:80');
      var myIoSocket = io.connect('http://localhost:3000');
    mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});

 chatFactory.factory('Users', function(){
    var usernames = [];
    usernames.numUsers = 0;

    return {
      getUsers: function(){
        return usernames;
      },
      addUsername: function(username){
        usernames.push(username);
      },
      deleteUsername: function(username){
        var index = usernames.indexOf(username);
        if(index != -1){
          usernames.splice(index, 1);
        }
      },
      setNumUsers: function(data){
        usernames.numUsers = data.numUsers;
      }
  };
});

 chatFactory.factory('FactoryChat', function($ionicScrollDelegate, Socket, Users){

  var username;
  var users = {};
  var rooms =['Lobby']; 
  users.numUsers = 0;

  var messages = [];
  var TYPING_MSG = '. . .';

  var Notification = function(username,message,room){
    var notification          = {};
    notification.username     = username;
    notification.message      = message;
    notification.room         =room;
    notification.notification = true;
    return notification;
  };

  Socket.on('login', function (data) {
    Users.setNumUsers(data);
  });

  Socket.on('new message', function(msg){
      addMessage(msg);
  });

  Socket.on('typing', function (data) {
    var typingMsg = {
      username: data.username,
      message: TYPING_MSG
    };
    addMessage(typingMsg);
  });

  Socket.on('stop typing', function (data) {
    removeTypingMessage(data.username);
  });
    
    
    
  Socket.on('user joined', function (data) {
    var msg = data.username + ' joined ' + data.room;
    var notification = new Notification(data.username,msg, data.room);
    addMessage(notification);
    Users.setNumUsers(data);
    Users.addUsername(data.username);
  });

  Socket.on('user left', function (data) {
    var msg = data.username + ' left';
    var notification = new Notification(data.username,msg);
    addMessage(notification);
    Users.setNumUsers(data);
    Users.deleteUsername(data.username);
  });

  var scrollBottom = function(){
    $ionicScrollDelegate.resize();
    $ionicScrollDelegate.scrollBottom(true);
  };
    
  var addMessage = function(msg){
    msg.notification = msg.notification || false;
    messages.push(msg);
    scrollBottom();
  };

  var removeTypingMessage = function(usr){
    for (var i = messages.length - 1; i >= 0; i--) {
      if(messages[i].username === usr && messages[i].message.indexOf(TYPING_MSG) > -1){
        messages.splice(i, 1);
        scrollBottom();
        break;
      }
    }
  };

  return {
    getUsername: function(){
      return username;
    },
    setUsername: function(usr){
      username = usr;
    },
    getMessages: function() {
      return messages;
    },
    sendMessage: function(msg){
      messages.push({
        username: username,
        message: msg
      });
      scrollBottom();
      Socket.emit('new message', msg);
    },
    scrollBottom: function(){
      scrollBottom();
    }
  };
});

 chatFactory.factory('Chats', function() {

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});