const express = require( 'express' ),
      path = require( 'path' ),
      exphbs  = require( 'express-handlebars' ),
      bodyParser = require( 'body-parser' ),
      app = express();

app.use( express.static( 'public' ) );

app.engine( 'handlebars', exphbs( {defaultLayout: 'main'} ) );
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'handlebars' );

app.use( bodyParser.urlencoded( {
  extended: true
} ) );

app.use( bodyParser.json() );

app.use( '/', require( './routes/index.js' ) )

module.exports = app;
