var express =   require("express");
var multer  =   require('multer');
var app     =   express();
var io      =   require('socket.io')();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage}).single('sampleFile');

app.use(express.static('.'))

app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/profile',function(req,res){
    /*upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        //res.end("File is uploaded");
    });*/


});

var server = app.listen(3000,function(){
    console.log("Working on port 3000");
});

io.attach(server);

io.on('connection',function(socket){

  socket.on('postMessage', function(data) {
    console.log(data)
    io.emit('updateMessages',data);

    var output = "test";
    var test = "test";
    //var python = require('child_process').spawn('python3', ['/Users/vbhat/personal/papi_code/redirectRulesUpdate/papi_update.py'], { stdio: 'inherit' });
    var python = require('child_process').spawn('python3', ['/Users/vbhat/personal/papi_code/redirectRulesUpdate/papi_update.py','-ct ${test}'\
                '-at test']);
    /*python.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      //res.status(200).send(data)
    });*/
    python.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });


  });

  console.log('User Connected');
  socket.on('disconnect',function(){
    console.log('User Disconnected')
  });
});
