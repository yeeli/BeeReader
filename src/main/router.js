const {ipcMain} = require('electron')
const Routes = require('./config/routes')
const glob = require( 'glob' )
const path = require("path")
const _ = require('lodash')

let controllers = {}

glob.sync( path.join(__dirname, 'controllers/*.js') ).forEach( function( file ) {
  let basename = path.basename(file,"_controller.js")
  let controller = require(file)
  controllers[basename] = controller;
})

const callback = function(event, route, ktm, body) {
  event.sender.send(`${route}Response?ktm=${ktm}`, body)
}

for(let route in Routes){
  let [method, path] = route.split(" ")
  ipcMain.on(path, (event, ctx, ktm) => {
    console.log(`${route}Response?ktm=${ktm}`)
    params = _.isNil(ctx) ? {} : ctx
    console.log('params:', params)
    let [controller, action] = Routes[route]['to'].split("#")
    let controlObject = new controllers[controller]
    controlObject.request = { params: params }
    controlObject.response = {}
    let func = eval(`controlObject.${action}()`)
    if(_.isObject(func)){
      func.then(res => {
        callback(event, path, ktm, controlObject.response.body)
      })
    } else {
      callback(event, route, ktm, controlObject.response.body)
    }
  })
}

