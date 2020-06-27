const next = require("next");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser  =require("cookie-parser");

const SECRET_KEY = "SECRET_KEY23oui5jr";

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({dev});


const handle = app.getRequestHandler();


const usersList = [
    {email:'testuser@gmail.com',password:'123456'},
    {email:'test321@gmail.com',password:'password123'}
];


const cookieOptions = {
    httpOnly:true,
    secure:!dev,
    signed:true,
}


app.prepare().then(()=>{
    const server = express();
    server.use(bodyParser.urlencoded({
        extended:true,
    }))
    server.use(bodyParser.json());

    server.use(cookieParser(SECRET_KEY));

    server.get("/api/profile",async (req,res)=>{
       const {signedCookies = {}} = req; //cookie attached with req object
       res.send(signedCookies['token']);

    })

    server.get("/api/logout",async (req,res)=>{
        res.clearCookie("token",cookieOptions);
        res.sendStatus(204);
    })



    server.get("*",(req,res)=>{
        // for next Router
        return handle(req,res)
    })

    server.post("/api/login",async (req,res)=>{
       const user = usersList.find(user=>user.email===req.body.email && user.password === req.body.password);
      
       if(user){
          
           res.cookie("token",user,cookieOptions);
           res.send({login:"login Successfully"});

       }else{res.send({msg:"Incorrect Credentitals"})}
       
    })


    
    
    server.listen(port,err=>{
        if(err) throw err;
        console.log("server is listening on the port "+port);
    })
})