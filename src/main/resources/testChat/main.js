var client = null;
var color;
//, user, userColor
function showMessage(value) {
    var newResponse = document.createElement('p');
//    newResponse.style.color = userColor;
//    newResponse.appendChild(document.createTextNode(user));
//    newResponse.appendChild(document.createTextNode(": "));
    newResponse.appendChild(document.createTextNode(value));
    var response = document.getElementById('response');
    response.appendChild(newResponse);
}

function connect() {
    client = Stomp.client('ws://localhost:8080/chat');
    client.connect({}, function (frame) {
        client.subscribe("/topic/messages", function(message){
            showMessage(JSON.parse(message.body).value)
            //, JSON.parse(message.body).user, JSON.parse(message.body).userColor
        });
    })
}

function sendMessage() {
    var message = document.getElementById('message').value;
//    var user = document.getElementById('user').value;
    client.send("/app/chat", {}, JSON.stringify({'value': message}) );
    //, 'user': user, 'userColor': color
    document.getElementById('message').value = "";
}