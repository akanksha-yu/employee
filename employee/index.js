const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require("mongoose");
const keys=require("./config/keys")
const cors=require("cors");

app.use(cors({origin:"http://localhost:3000"}) )      

const PORT=process.env.PORT || 5000;
mongoose.Promise=global.Promise;
mongoose.connect(keys.mongoURI,{useNewUrlParser:true, useUnifiedTopology: true },()=>{
  console.log("connected to database")
})
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json())
require("./routes/userRoutes")(app)
require("./routes/todoRoutes")(app)
if (process.env.NODE_ENV === 'production') {
 
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT,()=>{
    console.log(`server started on ${PORT}`)
})