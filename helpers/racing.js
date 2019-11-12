/* The race is on! */

const helpers = require.main.require( './helpers/helpers.js' ),
      delay = async function( milliseconds ) {
        return new Promise( function(resolve) {
          setTimeout( function() {
            return resolve();
          }, milliseconds);
        } );
      };

module.exports = {
  racers: [
    '🚗',
    '🚙',
    '🚚',
    '🚜',
    '🚑',
    '🚌',
    '🚒',
    '🚁',
    '🚓',
    '🚲',
    '🚕',
    '🏍',
    '🚛',
    '🚐',
    '🚋',
    '🚎',
    '🏃‍♀️',
    '🛴',
    '🛵',
    '🛷'
  ], 
  getRacers: function( options ){
    const count = options.count || helpers.getRandomInt( 2, 4 );
    const _racers = helpers.getRandomFromArray( this.racers, count );

    let selectedRacers = [];

    _racers.forEach( function( racer ){
      selectedRacers.push({
        vehicle: racer,
        speed: helpers.getRandomInt( 1, 4 )
      } );
    } );
    
    return selectedRacers;
  },
  findWinner: function( racers, fullObject ){
    let maxSpeed = 0, fastestRacer;
    racers.forEach( function( racer ) {
      if ( racer.speed > maxSpeed ){
        maxSpeed = racer.speed;
        if ( fullObject ){
          fastestRacer = racer;
        } else {
          fastestRacer = racer.vehicle;
        }
      }
    } );
    return fastestRacer;
  },
  findLastRacer: function( racers ){
    let minSpeed = 0,
        lastRacer;
    racers.forEach( function( racer ) {
      if ( minSpeed === 0 || racer.speed > minSpeed ){
        minSpeed = racer.speed;
        lastRacer = racer;
      }
    } );
    return lastRacer;
  },
  race: async function( stream, options ){
    const gridSize = options.gridSize || 50;
    
    let raceOptions = {};
    
    if ( options && options.cars ){
      raceOptions.count = options.cars;
      if ( raceOptions.count > this.racers.length ){
        raceOptions.count = this.racers.length;
      }
    }

    const racers = this.getRacers( raceOptions ),
          winner = this.findWinner( racers ),
          lastRacer = this.findLastRacer( racers ),
          lastRacerIndex = gridSize/lastRacer.speed;
    
    for (let i = 0; i < gridSize + 5; i += 1) {
      try {
        let racingGrid = `${ helpers.symbols.PAGE_BREAK }\n`;
        
        racers.forEach( function( racer ){
          let repeatCount = gridSize - i * racer.speed
          if ( repeatCount < 0 ){
            repeatCount = 0;
          }
          racingGrid += `${ ' '.repeat( repeatCount ) } ${ racer.vehicle }\n`
        } );

        if ( i >= lastRacerIndex || i >= gridSize ){
          racingGrid += `\n${ winner } won the race 🏁\n\n`;
        }
        if ( !stream.destroyed ){
          stream.push( racingGrid );
        }
      } catch ( err ) { 
        console.log( err );
        stream.push( null );
      }
      await delay( 450 );
    }
    stream.push(null);
  }
};
