import express from 'express'; 
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import indexRouter from './routes/index.js';

const app = express();
const whitelist = [ '*']

app.use((req,res,next) => {
  const origin = req.get('referer');
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
    if(isWhitelisted) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type', 'Authorization');
      res.setHeader('Access-Control-Allow-Credentials', true);
    }
    if(req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
});

const setContext = (req,res,next) => {
  if(!req.context) {
    req.context = {};
    next();
  }
}
app.use(setContext);
app.use('/', indexRouter);

module.exports = app;


