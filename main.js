const { ObjectId } = require('mongodb')
var express = require('express')
var app = express()
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://giangntgch190083:123456abc@cluster0.fgwlg.mongodb.net/test'

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.post('/insertProduct',async(req,res)=>{
    let name = req.body.txtName
    let price = Number(req.body.txtPrice)
    let image = req.body.txtImage
    let product ={
        'name': name,
        'price': price,
        'image': image
    }
    let client= await MongoClient.connect(url);
    let dbo = client.db("Asm2");
    dbo.collection("products").insertOne(product)
    res.redirect('/')
})

app.post('/Search',async(req,res)=>{
    let name = req.body.txtSearch
    let client= await MongoClient.connect(url);
    let dbo = client.db("Asm2");
    let prods =await dbo.collection("products").find({'name':new RegExp(name,'i')}).toArray()
    console.log(prods)
    res.render('Viewproduct',{'prods':prods})
})

app.get('/delete',async(req,res)=>{
    let id = req.query.id
    console.log(id)
    let objectid = ObjectId(id)
    let client= await MongoClient.connect(url);
    let dbo = client.db("Asm2");
    let prods =await dbo.collection("products").deleteOne({_id:objectid})
    res.redirect('/')
})

app.get('/view',async(req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("Asm2");
    let prods =await dbo.collection("products").find().toArray()
    console.log(prods)
    res.render('Viewproduct',{'prods':prods})
})

app.get('/new',async(req,res)=>{
    res.render('Newproduct')
})

app.get('/',(req,res)=>{
    res.render('home')
})

const POST = process.env.POST || 5000

app.listen(POST)
console.log('server is running')
