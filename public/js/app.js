var socket = io.connect('http://localhost:4000');

function addMessage (data) {
	$('#messages').prepend('<li class="list-group-item">' +
		    '<h4 class="list-group-item-heading">' + data.name + '</h4>' +
		    '<p class="list-group-item-text">' + data.message + '</p>' +
		  '</li>');
	};

	// This will be fired
	socket.on('messages-available', function (data) {
	  for (var i = 0; i < data.length; i++) {
	    addMessage(data[i]);
	  }
});

// This listens for any individual messages coming back from the server
socket.on('message-added', addMessage);

// When someone clicks the "Create Message" button, we'll emit the data to the server
$('#create-message').submit(function (e) {
	  // Don't let the form actually post to the server
	  e.preventDefault();

	  // Send the "add-message" message to the server with our values
	  socket.emit('add-message', {
	    name: $('input[name="name"]').val(),
	    message: $('textarea[name="message"]').val()
	  });

	  // Clear out the message value
	  $('textarea[name="message"]').val('');

});












function addImages (data) {
                  setTimeout(function(){ 
			$('#images').prepend('<li class="list-group-images">' +
				'<img class="images" src="/uploads/' + data.images + '">'+
			'</li>');
                  },10);

                  setTimeout(function(){ 
			$('#goods').prepend('<li class="list-group-images">' +
				'<form id="create-goodvalid" class="well row">'+
	    				'<fieldset class="col-lg-8 col-offset-2">'+
						'<input type="checkbox" data="'+ data.images +'" name="goods-name" id="i_check" value="'+ data.images +'">'+
						'<img class="images" src="/uploads/' + data.images + '" onerror="reloadImage(this);">'+
					'</fieldset>'+
				'</form>'+
			'</li>');
                  },200);

		                  
		    function reloadImage(pThis) {
		        // To prevent this from being executed over and over
		        pThis.onerror = null; 
		     
		        // Refresh the src attribute, which should make the
		        // browsers reload the iamge.
		        pThis.src = pThis.src;
		    };

};
 

	// This will be fired
	socket.on('images-available', function (data) {
	  for (var i = 0; i < data.length; i++) {
	    addImages(data[i]);
	  }
});

// This listens for any individual messages coming back from the server
socket.on('images-added', addImages);

// When someone clicks the "Create Message" button, we'll emit the data to the server
$('#create-images').submit(function (e) {
	  // Don't let the form actually post to the server
	  // e.preventDefault();

	  // Send the "add-message" message to the server with our values
	  socket.emit('add-images', {
	    images: $('input[name="images-name"]').val(),
	  });

	  // Clear out the message value
	  // $('textarea[name="message"]').val('');

});








function addGoods (data) {
                  setTimeout(function(){ 
			$('#goodsvalid').prepend('<li class="list-group-goods">' +
			'<h4 class="list-group-item-heading">' + data.goods + '</h4>' +
			'</li>');
                  },10);
};
 

	// This will be fired
	socket.on('goods-available', function (data) {
	  for (var i = 0; i < data.length; i++) {
	    addGoods(data[i]);
	  }
});

// This listens for any individual messages coming back from the server
socket.on('goods-added', addGoods);
// When someone clicks the "Create Message" button, we'll emit the data to the server
$('#create-goods').submit(function (e) {
	  socket.emit('add-goods', {
	     goods: $('input[name="goods-name"]:checked').each().val(),
	  });
	  // Clear out the message value
	  // $('textarea[name="message"]').val('');
});