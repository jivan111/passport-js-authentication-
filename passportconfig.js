const localStrategy=require("passport-local").Strategy
const bcrypt =require("bcrypt")
module.exports=function initilisePL(passport,getUserByEmail,getUserById){
    
  const authenticateUser=async function(email,password,done){
    const user=getUserByEmail(email);
    
    console.log(user)
    if(user===null){
        return done(null,false,{message:"no user found"})

    }
    try{
       if(await bcrypt.compare(password,user.password) ){
         return  done(null,user,{message:"success"})
       }else{
           return done(null,false,{message:"password didnot match"})
       }
       
    }catch(e){
      return done(e)
    }}
    passport.use(new localStrategy({usernameField:"email"},authenticateUser))
    
passport.serializeUser((user,done)=>{
    done(null,user.id)
 
 })
 passport.deserializeUser((id,done)=>{
    return done(null,getUserById(id))
 })
}
