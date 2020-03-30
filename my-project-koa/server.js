const koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const fs = require('fs');
const app = new koa();
const router = new Router();
const config = require('./config/config');
const onerror = require('koa-onerror');


onerror(app);

router.get('/getJson', async ctx => {
  // await cors();
  ctx.body = JSON.parse(fs.readFileSync('./static/demo.json'))
})



app.use(async(ctx, next) => {
  const start = Date.now();
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}).use(router.routes()).use(router.allowedMethods());

app.listen(config.node.port);