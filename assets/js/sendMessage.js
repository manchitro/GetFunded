$(document).ready(function () {
  $("#sendButton").click(function () {
    var msg = $("#messageText").val();
    var receiverId = $("#receiverId").val();
    
    sendMessage(msg, receiverId);
  });
});

function sendMessage(msg, receiverId){
    $.ajax({
        url: '/admin/messages/send',
        method: 'post',
        datatype : 'json',
        data : {
            'msg':msg,
            'receiverId': receiverId
        },
        success:function(response){
            if (response.status === 'success'){
                console.log("message sent");
                location.reload(true);
            }
            else{
                console.log("message not sent");
            }
        }
    })
}