
const express =require("express")
const bcrypt =require("bcrypt")
const passport=require("passport")
const initialise =require("./passportconfig")
const session =require("express-session")
const flash=require("express-flash")

const app=express();
app.set("view engine","ejs")

app.use(flash())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    secret:"encrypted data",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
var users=[ ];
initialise(passport,
    email=>{users.find((user)=>{user.email==email})},
    id=>{users.find(user=>{user.id==id})})
    
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.get("/login",(req,res)=>{
   res.render("login.ejs")
})
app.get("/register",(req,res)=>{
   res.render("register.ejs")
})
app.post("/register",async (req,res)=>{

try {
        
    var hashPassword=await bcrypt.hash(req.body.password,10);
    users.push({
        id:Date.now().toString(),
        email:req.body.email,
        password:hashPassword
    })
    console.log(users );
    res.redirect("/login");
}  catch   {
    res.render("register"); 
}

})
app.post("/login",passport.authenticate("local",{
    successRedirect:"/index",
    failureRedirect:"/login",
    failureFlash:true
    

}
))

app.listen(3000,()=>{
    console.log("fine");
})