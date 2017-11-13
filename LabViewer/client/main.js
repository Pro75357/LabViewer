import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import Chart from 'chart.js'

import './main.html';
import { Obs } from '../imports/api/Observations.js'
import '../imports/ui/makeChart.js'

//Define a servers object in the global space so it can be easily referred to (name and url)
    // This could be pulled from an external source easily enough, but would have to be done on the server-side

// Many servers listed here: http://wiki.hl7.org/index.php?title=Publicly_Available_FHIR_Servers_for_testing
// These seemed to work as of 11/10/2017
//for copy paste: { url: '', name: '' },
var servers = [
    { url: 'https://syntheticmass.mitre.org/fhir', name: 'Synthetic Mass' },
    { url: 'http://spark.furore.com/fhir', name: 'Furore Spark' },
    { url: 'https://sb-fhir-dstu2.smarthealthit.org/api/smartdstu2/open', name: 'SmartHealthIT' },
    //{ url: 'http://wildfhir.aegis.net/fhir3-0-1', name: 'AEGIS WildFHIR' },
    //{ url: 'https://fhirtest.uhn.ca/baseDstu3', name: 'Hapi-FHIR' },
    //{ url: 'http://api.hackathon.siim.org/fhir/', name: 'SIIM Hackathon'}
    ]


// Do the same for the patient list we will eventually create
var patList = [
    { name: 'No patients yet', id: ''}
]
Session.set('patientList', patList)

// Go ahead and create the blank selected patient and servers as well
Session.set('selectedPatient', { name: 'No patient selected' })
Session.set('selectedServer', { name: 'No Server selected' })

// Create a blank Session variable for the observations

Session.set('observations', 'nothing found yet')

// Create some page control session variables
Session.set('graphReady', false)
Session.set('chartRendered', false)
Session.set('patListReady', false)
Session.set('PatientReady', false)

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
                Session.set('patientList', res)
                Session.set('patListReady', true)
            }
        })
    }
})

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
                Session.set('dataReady', true)
            }
        })
        Session.set('patListReady', true)
        Session.set('PatientReady', true)
    },
})


Template.observationsSummary.helpers({
    total() {
        //return Session.get('observations').length
        if (Session.get('dataReady')) {
            res = Obs.find({}).fetch()
            return res.length
        }
        
    },
    obsVomit() { // for debugging, not used currently
        //return JSON.stringify(Session.get('observations'), null, 2)
        if (Session.get('dataReady')) {
            res = Obs.find({}).fetch()
            return JSON.stringify(res, null, 2)
        }
    },
    entries() {
        //return Session.get('observations')
        //return Session.get('obsTable')
        if (Session.get('dataReady')) {
            return Obs.find({}, { sort: { dateTime: -1 } }).fetch()
        }
    },
    graphReady() {
        return Session.get('graphReady')
    }
})



Template.observationsSummary.events({
    'click .obsrow': function (event, template) {
        Session.set('graphReady', true)
        code = this.code
       // Meteor.call('getOneCode', this.endpoint, this.patId, this.code,)       
        Session.set('code', code)
        // Update the chart with this code

        updateChart(code)
        // Sort the table by code, this one on top
            // todo 
        //Session.set('obsTable', Obs.find({code: code}).fetch())
    }
})


Template.registerHelper('formatDate', function (date) {
    return moment(date).format('l, LT');
});

Template.registerHelper('formatNumber', function (number) {
    return parseFloat(Math.round(number * 100) / 100).toFixed(2)
})