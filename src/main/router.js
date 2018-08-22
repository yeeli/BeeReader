const Routes = require('./config/routes')
const glob = require( 'glob' )
const path = require("path")
const _ = require('lodash')

let controllers = {}

glob.sync( path.join(__dirname, 'controllers/*.js') ).forEach( function( file ) {
  basename = path.basename(file,"_controller.js")
  controller = require(file)
  controllers[basename] = controller;
})

const callback = function() {
  
}

for(let route in Routes){
  let [controller, action] = Routes[route]['to'].split("#")
  let controlObject = new controllers[controller]
  controlObject.request = action
  controlObject.response = {}
  let func = eval(`controlObject.${action}()`)
  if(_.isObject(func)){
    func.then(res => {
      console.log(controlObject.response)
    })
  } else {
    console.log(controlObject.response)
  }
}

