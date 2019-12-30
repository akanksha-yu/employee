const {userSignup}=require("../middlewares/userSignup")
const controllers=require("../controllers/userControllers")
module.exports=app=>{
    app.post("/api/signup",userSignup,controllers.signupHandler);
    app.post("/api/login",controllers.loginHandler)
}