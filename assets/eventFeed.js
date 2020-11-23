$( document ).ready(function() {
	
	// GET REQUEST
	$("#ajaxB").click(function(event){
        event.preventDefault();
        console.log("Clicked");
		ajaxGet();
	});
	
	// DO GET
	function ajaxGet(){
		$.ajax({
			type : "GET",
            url : "moderator/feed",
            datatype : 'json',
            
			success: function(result){
				$('#getfeed ul').empty();
				var custList = "";
				$.each(result, function(i, result){
					$('#getfeed .getfeeds').append(result.EventName + " " + result.eventId + "<br>")
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