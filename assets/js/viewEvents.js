$( document ).ready(function() {
    
    // GET REQUEST
    $("#gFeedaj").click(function(event){
        event.preventDefault();
        console.log("Clicked");
        ajaxGet();
    });
    
    // DO GET
    function ajaxGet(){
    $.ajax({
            type     : "GET",
      url      : "/userSupport/view",
      datatype : 'json',
            
            success: function(result){
                $('#allEvents table').empty();
                $.each(result, function(i, result){
                    $('#allEvents #events').append(
          "<tr>"+
          "<td rowspan='4' height='150px'><img height='150' src='/abc/img/"+result.eventPicture+"'></td>"+
          "<td colspan='3'>" + result.description + "</td>" +
          "</tr>"+
          "<tr>"+
          "<td>ID:" + result.id + "</td>"+
          "<td>Creator Id:" + result.creatorId + "</td>" +
          "<td>Name:" + result.eventName + "</td>" +
          "</tr>"+
          "<tr>"+
          "<td>Category Id:" + result.categoryId + "</td>" +
          "<td>Goal Amount:" + result.goalAmount + "</td>" +
          "<td>Goal Date:" + result.goalDate + "</td>" +
          "</tr>"+
          "<tr>"+
          "<td colspan='2'>" + result.createdAt + "</td>"+
          "<td align='right'>"+
          "<a class='btn btn-dark' href='/userSupport/eventDonation/"+result.id+"'>Donation</a>"+
          "</td>"+
          "</tr>"
          )
                });
                console.log("Success: ", result);
            },
            error : function(e) {
                $("#getfeed").html("<strong>Error</strong>");
                console.log("ERROR: ", e);
            }
        }); 
    }
})