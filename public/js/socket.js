const socket = io();

const $ = e => document.querySelector(e);

$('#send').addEventListener('click', e => {
    socket.emit('clint-send', $('#messageInput').value)
    $('#messageInput').value = '';
});
const scroll = e => {
$('#chatBox').scrollTop = $('#chatBox').scrollHeight;
}
let send = ``;
let receiver = ``;
socket.on('server-send', ({message, id}) => {

    if(socket.id === id) {
        send += `                <div id="send-box" class="flex items-end gap-3 flex-col mb-4">
                    <div class="bg-blue-500 w-fit text-white p-3 rounded-lg">
                        <p>${message}</p>
                        <span class="text-xs text-gray-200">10:32 AM</span>
                    </div>
                </div>`
                    $('#chatBox').innerHTML = send;
                    scroll();
    }else{
        receiver += `                <div id="receiver-box" class="flex items-start bg-red-300 gap-3 flex-col mb-4">
                    <div class="bg-gray-200 p-3 rounded-lg">
                        <p class="text-gray-800">${message}</p>
                        <span class="text-xs text-gray-500">10:30 AM</span>
                    </div>
                </div>`
                    $('#chatBox').innerHTML = receiver;
    }
})
