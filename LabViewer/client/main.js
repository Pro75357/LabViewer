import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import Chart from 'chart.js'

import './main.html';
import '../imports/ui/tableTemplates.html'
import '../imports/ui/tableHelpers.js'

import { Obs } from '../imports/api/Observations.js'
import '../imports/ui/makeChart.js'

import '../imports/ui/ObsSumm.js'

//Define a servers object in the global space so it can be easily referred to (name and url)
    // This could be pulled from an external source easily enough, but would have to be done on the server-side

// Many servers listed here: http://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing
// These seemed to work as of 11/10/2017
//for copy paste: { url: '', name: '' },
/* Hardcode server for now = Synthetic Mass
var servers = [
    { url: 'https://syntheticmass.mitre.org/fhir', name: 'Synthetic Mass' },
    { url: 'http://spark.furore.com/fhir', name: 'Furore Spark' },
    { url: 'https://sb-fhir-dstu2.smarthealthit.org/api/smartdstu2/open', name: 'SmartHealthIT' },
    //{ url: 'http://wildfhir.aegis.net/fhir3-0-1', name: 'AEGIS WildFHIR' },
    //{ url: 'https://fhirtest.uhn.ca/baseDstu3', name: 'Hapi-FHIR' },
    //{ url: 'http://api.hackathon.siim.org/fhir/', name: 'SIIM Hackathon'}
    ]
*/

// Do the same for the patient list we will eventually create
var patList = [
    { name: 'No patients yet', id: ''}
]
Session.set('patientList', patList)

// Go ahead and create the blank selected patient and servers as well
Session.set('selectedPatient', { name: 'No patient selected' })

//Session.set('selectedServer', { name: 'Synthetic Mass' })
Session.set('selectedServer', { url: 'https://syntheticmass.mitre.org/fhir', name: 'Synthetic Mass' })


// Create a blank Session variable for the observations

Session.set('observations', 'nothing found yet')

// Create some page control session variables
Session.set('graphReady', false)
Session.set('chartRendered', false)
Session.set('PatientReady', false)


Session.set('patListReady', true)

Template.body.helpers({
    serverSelected() {
        if (Session.get('patListReady')) {
            return true
        }
    },
    patientSelected() {
        if (Session.get('PatientReady')) {
            return true
        }
    },
    graphReady() {
        return Session.get('graphReady')
    }
})


Template.serverSelect.helpers({
    bgcolor() {
        if (Session.get('patListReady')) {
            return 'bg-success'
        } else {
            return 'bg-danger'
        }
    },
    server() { //returns the values to populate the possible servers
        //should be an array of key:value pairs with url and name
        return servers
    },
    selectedServer() {
        return Session.get('selectedServer').name // Since the selected server references an individual index from the above array, we can call the nested objects url and name directly. 
    }
});

Template.header.rendered = function(){ //funcion that runs when the header loads
    
        serverUrl = Session.get('selectedServer').url
        Meteor.call('getPatients', serverUrl, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                //console.log(res)
                Session.set('patientList', res)

            }
        })
    }


Template.patientSelect.helpers({
    bgcolor() {
        if (Session.get('selectedPatient').gender) {
            return 'bg-success'
        } else {
            return 'bg-danger'
        }
    },
    patients() {
        return Session.get('patientList')
    },
    selectedPatientName() {
        return Session.get('selectedPatient').name
    },
    selectedPatientGender() {
        return Session.get('selectedPatient').gender
    },
    selectedPatientAge() {
        // calculate patient age from DOB
        dob = Session.get('selectedPatient').birthDate
        years = moment().diff(dob, 'years')
        return years
    },
    selectedPatientBirthDate() {
        return Session.get('selectedPatient').birthDate
    }
})

Template.patientSelect.events({
    'submit form'(event, instance) {
        event.preventDefault() // do not refresh the page
        // Use the event.target.value (selected from dropdown) to get the single patient from the patientList
        patIndex = event.target.list.value
        patient = Session.get('patientList')[patIndex]
        Session.set('selectedPatient', patient)

        // Now we need to fetch the lab observations. 
        // To do this, we will need to send the patient ID and server URL to the method
        // The method will return the data, then we can save that in a Session variable for later use.
        url = Session.get('selectedServer').url
        patID = Session.get('selectedPatient').id
        Meteor.call('getObservations', url, patID, function (err, res) {
            if (err) {
                console.log(err)
            } else {
                Obs.remove({}) // remove any old results
                try {
                    for (x in res) {
                        //console.log(res[x])
                        Obs.insert(res[x])
                    }
                } catch (e) {
                    console.log(e)
                }
                Session.set('dataReady', true)
                //console.dir(Obs.find({}).fetch())
            }
        })
        Session.set('patListReady', true)
        Session.set('PatientReady', true)
    },
})

Template.chartjs.events({
    'click .button': function () {
        resetChart()
    }
})

Template.chartjs.helpers({
    chartRendered() {
        return Session.get('chartRendered')
    }
})


Template.registerHelper('formatDate', function (date) {
    return moment(date).format('l, LT');
});

Template.registerHelper('formatNumber', function (number) {
    return parseFloat(Math.round(number * 100) / 100).toFixed(2)
})