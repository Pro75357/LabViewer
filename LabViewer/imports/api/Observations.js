import { Mongo } from 'meteor/mongo'

export const Obs = new Mongo.Collection(null); // change this to a local collection only (no DB, but still get Mongo functionality!)

Meteor.methods({
    'resetDB': function () { // drop everything
        Obs.remove({})
    }
})

/*
if (Meteor.isServer) {
	Meteor.publish('obs', function () {
		return Obs.find({}) // how we publish codes to the client. For now, just return everything. 
	})


if (Meteor.isClient) {
    Meteor.subscribe('obs') // Makes the collection available to the client (Templates and stuff)
};


*/