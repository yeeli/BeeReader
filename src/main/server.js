const Koa = require('koa')
const Router = require('koa-router')
const koaBody = require('koa-body')
const Routes = require('./config/routes')
const app = new Koa()
const router = new Router()
const glob = require( 'glob' )
const path = require("path")
const _ = require('lodash')

let controllers = {}

glob.sync( path.join(__dirname, 'controllers/*.js') ).forEach( function( file ) {
  basename = path.basename(file,"_controller.js")
  controller = require(file)
  controllers[basename] = controller;
})


// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(koaBody({multipart: true}))

for(let route in Routes) {
  let [method, path] = route.split(" ")
  let [controller, action] = Routes[route]['to'].split("#")
  let controlObject = new controllers[controller]
  let callback = (ctx, next) => {
    let params = _.isEmpty(ctx.request.query) ? ctx.request.body : ctx.request.query
    controlObject.request = { params: params }
    controlObject.response = {}
    let func = eval(`controlObject.${action}()`)
    let body = ""
    if(_.isObject(func)){
      return func.then(res => {
        ctx.body = controlObject.response.body
      })
    } else {
      ctx.body = controlObject.response.body
    }
  }
  eval(`router.${method}('${path}', callback)`)
}



// response
app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(5678)
