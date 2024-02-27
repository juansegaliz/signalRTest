const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    document.getElementById("messages").appendChild(li);
});

connection.start().catch(err => console.error(err.toString()));

function sendMessage() {
    const user = document.getElementById("user").value;
    const message = document.getElementById("message").value;
    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
}