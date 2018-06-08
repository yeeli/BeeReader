const glob = require( 'glob' )
const path = require("path")

glob.sync( path.join(__dirname, '*.js') ).forEach( function( file ) {
  require(file);
});

