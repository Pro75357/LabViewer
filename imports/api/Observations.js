import { Mongo } from 'meteor/mongo'

export const Obs = new Mongo.Collection('obs');

if (Meteor.isClient) {
	Meteor.subscribe('obs') // Makes the collection available to the client (Templates and stuff)
};

if (Meteor.isServer) {
	Meteor.publish('obs', function codesPublication() {
		return Obs.find({}) // how we publish codes to the client. For now, just return everything. 
	})

	Meteor.methods({
		'resetDB': function() { // drop everything
			Obs.rawCollection().drop()
		}
	})
}