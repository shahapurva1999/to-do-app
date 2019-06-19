var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var data = [{title:'apurva'},{title:'darkrai'}];

var app=express();
app.use('/assets',express.static('assets'));
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('home',{data:data});
});

app.get('/add',function(req,res){
    res.render('add');
});

app.post('/',urlencodedParser, function(req,res){
    data.push({title:req.body.title});
    console.log(data);
    res.render('home',{data:data});
});

app.get('/remove',function(req,res){
    res.render('remove',{data:data});
});

app.post('/remove',urlencodedParser, function(req,res){
    var i;
    for(i=0 ; i<data.length ; ){
        var temp=data[i].title;
        if (req.body[temp]) {
          data.splice(i,1);  
        }
        else{
            i++;
        };
    }
    // data.forEach(function(item){
    //     var temp=item.title;
    //     //let value=req.body['temp'];
    //     //console.log(value);
    //     if (req.body[temp]) {
            
    //     };
    // });
    console.log(data);
    res.render('home',{data:data});
});


app.listen(3000);