const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose")
const env = require("./config")
const userRoute = require("./routes/userRoute")


const path = require('path')

const cors = require('cors')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const use = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  app.use(
    use(function (req, res, next) {
      next();
    })
  );
app.use("/accounts",userRoute);


app.use(function (err, req, res, next) {
    console.log(err.message);
    let er = new Error(err.message);
    res.json({
      status: false,
      message: err.message,
      data: [],
    });
  });
  

mongoose.connect(env.mongoURL,{

},(error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log("database connected ..")
    }
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))