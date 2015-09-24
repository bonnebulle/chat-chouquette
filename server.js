var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	messages = [],
	images = [],
	goods = [],
	sockets = [],
    formidable = require('formidable'),
    util = require('util'),
    fs   = require('fs-extra'),
    qt   = require('quickthumb');



app.use( express.static(__dirname + '/public'));


server.listen(4000,function(){
    console.log('* * * Socket.io port 4000 * * *');
});




	io.sockets.on('connection', function (socket) {

		socket.broadcast.emit('message', 'Autre utilisateur en ligne'); //ENTRE diferents clients
		//socket.emit('message', 'Vous êtes bien connecté !'); //CLIENT UNIQUE

	    	

	  sockets.push(socket);



	                        //SEND to Node Log
	                            var EventEmitter = require('events').EventEmitter;
	                                var sendgoods = new EventEmitter();                                
	                                    sendgoods.on('GoodsOk', function(goods){
	                                        // console.log('8!!!!!!!!');
	                                        // socket.emit('goods', '8!!!!!!!!');
	                                    });
	                            sendgoods.emit('GoodsOk', '---- C o n n e c t i o n ----');

	  socket.emit('goods-available', goods);

		socket.on('add-goods', function (data) {
			goods.push(data);
			console.log(data);
		      	sockets.forEach(function (socket) {
			        socket.emit('goods-added', data);
			});
		});

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------


	                        //SEND to Node Log
	                            var EventEmitter = require('events').EventEmitter;
	                                var sendimages = new EventEmitter();                                
	                                    sendimages.on('ImagesOk', function(images){
	                                        // console.log('8!!!!!!!!');
	                                        // socket.emit('images', '8!!!!!!!!');
	                                    });
	                            sendimages.emit('ImagesOk', '---- C o n n e c t i o n ----');

	  socket.emit('images-available', images);

		socket.on('add-images', function (data) {
			images.push(data);
			console.log(data);
		      	sockets.forEach(function (socket) {
			        socket.emit('images-added', data);
			});
		});

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------



	                        //SEND to Node Log
	                            var EventEmitter = require('events').EventEmitter;
	                                var sendmessage = new EventEmitter();                                
	                                    sendmessage.on('MessageOk', function(message){
	                                        console.log('(:');
	                                        socket.emit('message', '! welcolme !');

	                                    });
	                            sendmessage.emit('MessageOk', '---- C o n n e c t i o n ----');

	  socket.emit('messages-available', messages);

		socket.on('add-message', function (data) {
			messages.push(data);
			console.log(data);
		      	sockets.forEach(function (socket) {
			        socket.emit('message-added', data);
			});
		});





// Use quickthumb
app.use(qt.static(__dirname + '/public'));



		app.post('/upload', function (req, res){
		  var form = new formidable.IncomingForm();
		  form.parse(req, function(err, fields, files) {

		  res.writeHead(200, {"Content-Type": "text/html"}); //NO EROR 200 + MIME Type
		    res.write('<!DOCTYPE html>'+
		                            '<html style="margin: 0px; padding: 0px; background: #000;">'+
		                            '    <head>'+
		                            '<meta charset="utf-8" />'+
		                            '<meta http-equiv="refresh" content="3; url=/#thank-you">'+
		                            '        <title>Confirmation</title>'+
		                            '    </head>'+ 
		                            '    <body style="margin: 0px; padding: 0px;"">'+
		                            '       <div id="center" style="color: #FFF; margin: 25% auto; display: block; text-align:center; top: 50%; bottom: 50%; width: 100%; height: 0px;"><p style="font-size: 2em; font-family: helvetica, sans-serif;">Fichier envoyé avec succes. <strong>Merci</strong> !</p><p style="font-size: 2em; font-family: helvetica, sans-serif;"><small style="font-size: 0.5em;">(<a href="/" style="color: gray!important">redirection</a>)</small></p></div>'+
		                            '    </body>'+
		                            '</html>');
		    res.end();
		    
		    // res.end(util.inspect({fields: fields, files: files}));
		  });

	form.on('fileBegin', function(name, file) {
	        console.log("-> Début d\'envoi de fichier");
	        socket.broadcast.emit("newfile","Quelqun envoie un fichier");
	        socket.emit("newfile", "(Quelqun envoie un fichier)");
	    });
	    


		  form.on('end', function(fields, files) {
		    /* Temporary location of our uploaded file */
		    var temp_path = this.openedFiles[0].path;
		    /* The file name of the uploaded file */
		    var file_name = this.openedFiles[0].name;
		    /* Location where we want to copy the uploaded file */
		    var new_location = './public/uploads/';

			    fs.copy(temp_path, new_location + file_name, function(err) {  
			      if (err) {
			        console.error(err);
			      } else {
			        
				setTimeout(function(){
				console.log('--> '+ file_name +' envoyé');
				        // socket.broadcast.emit('newfile', file_name); 
				        // socket.emit('newfiledone', file_name);
			        },4*1000);

			      }
			    });
		    
		  });
		});






		// var watchr = require('watchr');

		// // Watch a directory or file
		// console.log('Watch our paths');
		// watchr.watch({
		//     paths: ['/Users/vincentb/Pictures/WATCHER/'],
		//     listeners: {
		//         log: function(logLevel){
		//             // console.log('a log message occured:', arguments);
		// 	   socket.emit('newfile', 'Files activity');
		//         },
		//         error: function(err){
		//             console.log('an error occured:', err);
		//         },
		//         watching: function(err,watcherInstance,isWatching){
		//             if (err) {
		//                 console.log("watching the path " + watcherInstance.path + " failed with error", err);
		//             } else {
		//                 console.log("watching the path " + watcherInstance.path + " completed");
		//             }


		//         },
		//         change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
		//             console.log('% event occured: %',arguments);
		//             socket.emit('newfile',arguments);
		            
		//             //NOTIFIER Message
		//             // exec('curl "http://localhost:1337/info?message=test"');

		//         }
		//     },
		//     next: function(err,watchers){
		//         if (err) {
		//             return console.log("watching everything failed with error", err);
		//         		socket.broadcast.emit('newfile', 'Files NOT checked !');
		//         } else {
		//             console.log('watching everything completed', watchers);
		//             socket.broadcast.emit('newfile', 'Files checked !');
		            
		//             // Async call to exec() == NOTIFIER start
		//                 // exec('node-osx-notifier 1337 localhost', function(status, output) {
		//                 //   // console.log('Exit status:', status);
		//                 //   console.log('Program output:', output);
		//                 // });
		            
		//         }

		//         // // Close watchers after 100 seconds
		//         // setTimeout(function(){
		//         //     var i;
		//         //     console.log('Stop watching our paths');
		//         //     for ( i=0;  i<watchers.length; i++ ) {
		//         //         watchers[i].close();
		//         //     }
		//         // },100*1000);
		//     }
		// });

	}); ///SOCKET





///// W A T C H E R //////

// Require
// require('shelljs/global');
// var version = exec('node --version', {silent:true}).output;


///////
