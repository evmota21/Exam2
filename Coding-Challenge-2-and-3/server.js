const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const { Sports } = require( './models/sport-model' );

const app = express();


/* Your code goes here */

app.delete( '/sports/delete' , jsonParser, ( req, res ) => {
    console.log("Deleting a sport.");
    console.log( "Body" , req.body );

    let idSportBody = req.body.id;

    if( !idSportBody ){
        res.statusMessage = "Please send an 'id' on the body.";

        return res.status( 406 ).end();
    }

    let idSportQuery = req.query.id;

    if( !idSportQuery ){
        res.statusMessage = "Please send an 'id' as a paramter.";

        return res.status( 406 ).end();
    }

    if( idSportBody !== idSportQuery){
        res.statusMessage = "Id on the body does not match id on the parameter.";

        return res.status( 409 ).end();
    }

    Sports
        .removeSport( idSportBody )
        .then( result => {
            if(result.message){
                res.statusMessage = "Id does not match any.";

                return res.status( 404 ).end();
            }
            else{
                return res.status( 204 ).end();
            }
        })
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});