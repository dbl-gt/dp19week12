const express= require('express');
const exhbs= require('express-handlebars');
const bodyParser=require('body-parser');
const fs=require('fs');
const app=express();

app.use('/static', express.static('static'));

// setup handlebars - middleware
app.engine('handlebars', exhbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

function getData(){
    var rawdata=fs.readFileSync("file.json");
    var data=JSON.parse(rawdata);
    return data;
}

app.get('/', (req,res)=>{
    var data=getData();
    res.render('view2d', {
        encodedJson:encodeURIComponent(JSON.stringify(data))
    });
});

app.get('/3d', (req,res)=>{
    var data=getData();
    res.render('view3d',{
        encodedJson:encodeURIComponent(JSON.stringify(data))
    });
});

app.post("/update", (req,res)=>{
    var data=req.body.details;
    data='['+data+']';
    fs.writeFileSync("file.json", data);
    res.redirect('/');
});

app.get('/loaders', (req,res)=>{
    res.render("loaders3d");
})

// table routing
app.get('/table', (req,res)=>{
    var rawdata=fs.readFileSync("file.json");
    var data=JSON.parse(rawdata);
    res.render("table",{
        encodedJson:encodeURIComponent(JSON.stringify(data))
    });
});
app.post('/updateTable', (req,res)=>{
    var data=req.body.details;
    data='['+data+']';
    fs.writeFileSync('file.json', data);
    res.redirect('/table');
});

// view all routing
app.get('/viewAll', (req, res)=>{
    var data=getData();
    res.render("viewAll", {
        encodedJson:encodeURIComponent(JSON.stringify(data))
    });
});
app.post('/updateAll', (req,res)=>{
    var data=req.body.details;
    data='['+data+']';
    fs.writeFileSync('file.json', data);
    res.redirect('/viewAll');
});


const port=5500;
app.listen(port, ()=>{
    console.log('server listening on port '+port);
});