var socket = io.connect('http://localhost:4000');


// function addGoods (data) {
//                   setTimeout(function(){ 
// 			$('#hs-wrapper0').prepend('<li class="list-group-goods">' +
// 			'<h4 class="list-group-item-heading">' + data.goods + '</h4>' +
// 			'</li>');
//                   },10);
// };

function addGoods (data) {
                  setTimeout(function(){ 
			$('#hs-wrapper0').prepend('<li class="list-group-goods" style="background-image: url(\'http://localhost:4000/uploads/' + data.goods + '\'); display: block;" bkg="http://localhost:4000/uploads/' + data.goods + '" onerror="reloadImage(this);">'+
			'</li>');
                  },10);
};
 
    function reloadImage(pThis) {
        // To prevent this from being executed over and over
        pThis.onerror = null; 
     
        // Refresh the src attribute, which should make the
        // browsers reload the iamge.
        pThis.src = pThis.src;
    };

	// This will be fired
	// socket.on('images-available', function (data) {
	//   for (var i = 0; i < data.length; i++) {
	//     addImages(data[i]);
	//   }
	// This will be fired
	socket.on('goods-available', function (data) {
	  for (var i = 0; i < data.length; i++) {
	    addGoods(data[i]);
	  }
});

// // This listens for any individual messages coming back from the server
// socket.on('images-added', addImages);


// This listens for any individual messages coming back from the server
socket.on('goods-added', addGoods);
