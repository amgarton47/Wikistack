const morgan = require('morgan');
const express = require('express');
const layout = require('./views/layout.js');
// const { db } = require('./models');
const models = require('./models');

const wikiRouter = require('./routes/wiki.js');
const userRouter = require('./routes/user.js');

const PORT = 3000;

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({extended:false}));
app.use('/wiki', wikiRouter)

app.get('/',(req,res)=>{
  // res.send(layout(""));
  res.redirect('/wiki');
})

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

const init = async () => {
  // await models.User.sync();
  // await models.User.sync();
  await models.db.sync({force: true});

  app.listen(PORT, () =>{
    console.log(`listening at port ${PORT}`);
  })
};

init();
