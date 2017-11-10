import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './main.html';

//Define a servers object in the global space so it can be easily referred to (name and url)
    // This could be pulled from an external source easily enough, but would have to be done on the server-side

// Many servers listed here: http://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing
// These seemed to work as of 11/10/2017
//for copy paste: { url: '', name: '' },
var servers = [
    { url: 'https://syntheticmass.mitre.org/fhir', name: 'Synthetic Mass' },
    { url: 'http://spark.furore.com/fhir', name: 'Furore Spark' },
    { url: 'https://sb-fhir-dstu2.smarthealthit.org/api/smartdstu2/open', name: 'SmartHealthIT' },
    { url: 'http://wildfhir.aegis.net/fhir3-0-1', name: 'AEGIS WildFHIR' },
    { url: 'https://tbxweb.aidbox.io/fhir', name: 'Tbx Aidbox' },
    ]


// Do the same for the patient list we will eventually create
var patList = [
    { name: 'No patients yet', id: ''}
]
Session.set('patientList', patList)

// Go ahead and create the blank selected patient and servers as well
Session.set('selectedPatient', { name: 'No patient selected' })
Session.set('selectedServer', { name: 'No Server selected' })


Template.serverSelect.helpers({
    server() { //returns the values to populate the possible servers
        //should be an array of key:value pairs with url and name

        return servers
    },
    selectedServer() {
        return Session.get('selectedServer').name // Since the selected server references an individual index from the above array, we can call the nested objects url and name directly. 
    }
});

Template.serverSelect.events({
    'change .serverList'(event, instance) {
        serverIndex = event.target.value // get the server index number from the dropdown value
            // For display purposes mostly
        Session.set('selectedServer', servers[serverIndex]) //Set this 'selectedServer' session variable to that individual server object from the servers array

            // Now call the getPatients method with this server's URL and get a list of patients for the next step...
        serverUrl = Session.get('selectedServer').url
        Meteor.call('getPatients', serverUrl, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                //console.log(res)
                Session.set('patientList',res)
            }
        })
    }
})

Template.patientSelect.helpers({
    patients() {
        return Session.get('patientList')
    },
    selectedPatient() {
        return Session.get('selectedPatient').name
    }
})

Template.patientSelect.events({
    'submit form'(event, instance) {
        event.preventDefault() // do not refresh the page
        // Use the event.target.value (selected from dropdown) to get the single patient from the patientList
        patIndex = event.target.list.value
        patient = Session.get('patientList')[patIndex]
        Session.set('selectedPatient', patient)
        console.log(patient)
        //Meteor.call
    },
})