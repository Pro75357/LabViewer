import { Template } from 'meteor/templating';
import { Obs } from '../api/Observations.js'

import '../api/labgroups.js'

Template.observationsSummary.helpers({
    total() {
        //return Session.get('observations').length
        if (Session.get('dataReady')) {
            ///res = Obs.find({}).fetch()
            return Obs.find({}).fetch().length
        }

    },
    obsVomit() { // for debugging, not used currently
        //return JSON.stringify(Session.get('observations'), null, 2)
        if (Session.get('dataReady')) {
            res = Obs.find({}).fetch()
            return JSON.stringify(res, null, 2)
        }
    },
    // Returns all Observation entries- 
    entries() {
        //return Session.get('observations')
        //return Session.get('obsTable')
        if (Session.get('dataReady')) {
            return Obs.find({}, { sort: { dateTime: -1 } }).fetch()
        }
    },

        // We will need to create group-specific helpers for each lab type we want
})


Template.observationsSummary.events({
    'click .obsrow': function (event, template) {
        Session.set('graphReady', true)
        code = this.resource.code.coding[0].code

        // need to call updateChart with newLabel = 'groupName' and newData = {Values:[],Labels[] }

        // we can build this object using the 'this' as well as Obs calls
        console.log(this)
        newLabel = this.resource.code.coding[0].display

        //We will match the code with other ones in the Obs to get the data array. Would be nice to be able to match groups...
        newData = { values: [], labels: [] }
        numbers = Obs.find({ 'resource.code.coding.0.code': code }).fetch()
        for (x in numbers){
            console.log(numbers[x].resource.valueQuantity.value)
            newData.values.push(numbers[x].resource.valueQuantity.value)
            newData.labels.push(numbers[x].resource.effectiveDateTime)
        }
            
        //console.log(Obs.find({ code: {"$in": labGroupA1c }}).fetch())
        //console.log(code)
        // Meteor.call('getOneCode', this.endpoint, this.patId, this.code,)       
        Session.set('code', code)
        // Update the chart with this code

        updateChart(newLabel, newData)
        // Sort the table by code, this one on top
        // todo 
        //Session.set('obsTable', Obs.find({code: code}).fetch())
    }
})

