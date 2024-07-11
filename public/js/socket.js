const socket = io();
const $ = (e) => document.querySelector(e);

// taking the name of user
let username;
do{
  username = prompt('Please enter your username')
}while(!username)


// this is sending the message value to a server

$("#send").addEventListener("click", (e) => {
  const message = $("#messageInput").value;
  if (message.trim() !== "") {
    socket.emit("client-send", {message, username});
    $("#messageInput").value = "";
  }
});

// scrolling down when a message box are fully loaded!

const scroll = (e) => {
  $("#chatBox").scrollTop = $("#chatBox").scrollHeight;
};

//this is the receiving the message fome the server

socket.on("server-send", ({ message, id, name }) => {
  const messageContainer = $("#chatBox");
  let messageElement = "";
  if (socket.id === id) {
    messageElement = `
            <div class="flex items-end flex-col mb-4">
                <h4 class="text-sm">${name}</h4>
                <div class="bg-blue-500 w-fit text-white p-3 rounded-lg">
                    <p>${message}</p>
                    <span class="text-xs text-gray-200">10:32 AM</span>
                </div>
            </div>`;
  } else {
    messageElement = `
            <div class="flex items-start flex-col mb-4">
                <h4 class="text-sm">${name}</h4>
                <div class="bg-gray-200 p-3 rounded-lg">
                    <p class="text-gray-800">${message}</p>
                    <span class="text-xs text-gray-500">10:30 AM</span>
                </div>
            </div>`;
  }

  messageContainer.innerHTML += messageElement;
  scroll();
});

//showing the typing words on the every user without me

const typingWords = (e) => {


    // sending typing words data to the server

  $("#messageInput").addEventListener("input", e => {
    if (e.target.value.length > 0) { 
        socket.emit('type', true);
    } else {
        socket.emit('type', false);
    }
  });


    // receiving typing words data to the server

    socket.on('server-type', type => {
        const typing = `Typing...`;
        if(type){
            $("#type").innerHTML = typing;
        }else{
            $("#type").innerHTML = '';
        }
    })


};
typingWords();

