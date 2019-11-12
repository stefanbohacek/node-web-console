/*
  Basic examples of responding to curl requests.

  See https://medium.com/@atulanand94/building-web-based-uis-for-terminals-using-javascript-60b5eee31213 for more details.
*/

const style = require( 'ansi-styles' ),
      helpers = require.main.require( './helpers/helpers.js' );

const delay = async function( milliseconds ) {
  return new Promise( function(resolve) {
    setTimeout( function() {
      return resolve();
    }, milliseconds);
  } );
};

const hello = function( text ) {
  /*
    You can use the ansi-styles package to change text color.
    See: https://www.npmjs.com/package/ansi-styles
  */
  return `
${ helpers.symbols.PAGE_BREAK } 
${style.green.open}Hi${ text }${style.green.close}
\n`  
};

const animateHello = async function animateHello(stream) {
  for (let i = 0; i < 20; i += 1) {
    try {
        if ( !stream.destroyed ){
          stream.push(hello(`, it's ${new Date()}`));
        }      
    } catch (err) {
      /* noop */
    }
    await delay(1000);
  }
  stream.push(null);
};

module.exports = {
  hello,
  animateHello,
};
