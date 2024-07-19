const socket = io();

const $ = (e) => document.querySelector(e);

//taking the name input value

document.querySelector(".inputname").addEventListener("input", (e) => {
  let userName = e.target.value;
});

document.querySelector(".name-send").addEventListener('click', () => {
  let userName = document.querySelector(".inputname").value;
  socket.emit("input", userName);
});



socket.on("user-show", (data) => {
  $(".online").innerHTML = `${data} user online`;
});

// this is sending the message value to a server

$("#send").addEventListener("click", (e) => {
  const message = $("#messageInput").value;
  if (message.trim() !== "") {
    socket.emit("client-send", message);
    $("#messageInput").value = "";
  }
});

// scrolling down when a message box are fully loaded!

const scroll = (e) => {
  $("#chatBox").scrollTop = $("#chatBox").scrollHeight;
};

//this is the receiving the message fome the server

socket.on("server-send", ({ message, id }) => {
  const messageContainer = $("#chatBox");
  let messageElement = "";

  if (socket.id === id) {
    messageElement = `
            <div class="flex items-end gap-3 flex-col mb-4">
                <div class="bg-blue-500 w-fit text-white p-3 rounded-lg">
                    <p>${message}</p>
                    <span class="text-xs text-gray-200">10:32 AM</span>
                </div>
            </div>`;
  } else {
    messageElement = `
            <div class="flex items-start gap-3 flex-col mb-4">
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

  $("#messageInput").addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
      socket.emit("type", true);
    } else {
      socket.emit("type", false);
    }
  });

  // receiving typing words data to the server

  socket.on("server-type", (type) => {
    const typing = `Typing...`;
    if (type) {
      $("#type").innerHTML = typing;
    } else {
      $("#type").innerHTML = "";
    }
  });
};
typingWords();
