const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

const sportSchema = mongoose.Schema({
    id : {
        type : String,
        unique : true,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    num_players : {
        type : Number,
        required : true
    }
})

const sportsCollection = mongoose.model( 'sports', sportSchema );

/* Your code goes here */

const Sports = {
    removeSport : function( sportId ){
        return sportsCollection
            .findOneAndDelete( { id : sportId })
            .then( allSports => {
                return allSports;
            })
            .catch ( err => {
                return err;
            })
    }
}

module.exports = { Sports };