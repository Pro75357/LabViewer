import { Template } from 'meteor/templating';
import { Obs } from '../api/Observations.js'
import '../api/labgroups.js'

Template.labTables.helpers({
    // Here we will make helpers for the entire lab table- mostly group counts


})

Template.A1cTable.helpers({

    groupName() {
        return 'A1c'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemOther.a1c } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemOther.a1c } }).fetch().length
    },

})

Template.glucoseTable.helpers({

    groupName() {
        return 'Glucose'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.glucose } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.glucose } }).fetch().length
    },

})

Template.creatinineTable.helpers({

    groupName() {
        return 'Creatinine'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.creatinine } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.creatinine } }).fetch().length
    },

})

Template.heightWeightTable.helpers({

    groupName() {
        return 'Height_Weight'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: vitals.heightWeight } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: vitals.heightWeight } }).fetch().length
    },

})



Template.otherTable.helpers({

    groupName() {
        return 'Other'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $nin: allCodes } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $nin: allCodes } }).fetch().length
    },

})