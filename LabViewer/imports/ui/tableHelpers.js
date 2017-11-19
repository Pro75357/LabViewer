import { Template } from 'meteor/templating';
import { Obs } from '../api/Observations.js'
import '../api/labgroups.js'

Template.A1cTable.helpers({

    groupName() {
        return 'A1c'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroupA1c } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroupA1c } }).fetch().length
    },

})

Template.glucoseTable.helpers({

    groupName() {
        return 'Glucose'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroupGlucose } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroupGlucose } }).fetch().length
    },

})

Template.creatanineTable.helpers({

    groupName() {
        return 'Creatanine'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroupCreatanine } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroupCreatanine } }).fetch().length
    },

})

Template.heightWeightTable.helpers({

    groupName() {
        return 'Height_Weight'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: vitalsGroupHeightWeight } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: vitalsGroupHeightWeight } }).fetch().length
    },

})