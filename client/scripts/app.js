// YOUR CODE HERE:
var app = {};

app.init = function() {
  this.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';
};
app.send = function(message) { 
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function() {
  $.ajax({
    
    url: app.server,
    type: 'GET',
    // data: JSON.stringify(message),
    // data: { format: 'json'},
    // contentType: 'application/json',
    success: function (data) {
      let messages = data.results;
      console.log('chatterbox: Message fetched', data);
      for(let i = 0; i < messages.length; i++) {
        app.renderMessage(messages[i]);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  console.log(message.roomname);
  let $messageNode = $('<div class="messageNode"></div>');
  $messageNode.addClass(message.roomname);
  let $user = $('<span></span>');
  $user.addClass(message.username);
  $user.text(message.username+': ');
  $messageNode.append($user);
  let $text = $('<span></span>');
  $text.attr('id', message.objectId);
  $text.text(message.text);
  $messageNode.append($text);
  $('#chats').append($messageNode); 
};

app.renderRoom = function(roomName) {
  let roomNode = $('<option value="' + roomName + '">' + roomName + '</option>');
  $('#roomSelect').append(roomNode);

  
};   
$( document ).ready(function() {
  app.init();
  app.fetch();
});


// var message = {
//   username: 'mikeandtony',
//   text: 'is this working',
//   roomname: '4chan'
// };

