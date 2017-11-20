import { Template } from 'meteor/templating';
import { Obs } from '../api/Observations.js'
import '../api/labgroups.js'

Template.labTables.helpers({
    // Here we will make helpers for the entire lab table- mostly group counts
    // Hematology group counts
    hematologyCount() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroups.hematology.all } }).fetch().length
    },

    chemPanelCount() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroups.chemPanel.all } }).fetch().length
    },

    chemOtherCount() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroups.chemOther.all } }).fetch().length
    },

    lipidPanelCount() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroups.lipidPanel.all } }).fetch().length
    },

    vitalsCount() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: labGroups.vitals.all } }).fetch().length
    }

})

// Hematology tables here

Template.whiteBloodTable.helpers({

    groupName() {
        return 'A1c'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.whiteBlood } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.whiteBlood } }).fetch().length
    },

})

Template.plateletsTable.helpers({

    groupName() {
        return 'A1c'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.platelets } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.platelets } }).fetch().length
    },

})

Template.hemoglobinTable.helpers({

    groupName() {
        return 'A1c'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.hemoglobin } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.hemoglobin } }).fetch().length
    },

})


Template.hematocritTable.helpers({

    groupName() {
        return 'A1c'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.hematocrit } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: hematology.hematocrit } }).fetch().length
    },

})

// Chemistry helpers here

// Chemistry Panel

// sodium
Template.sodiumTable.helpers({

    groupName() {
        return 'Sodium'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.sodium } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.sodium } }).fetch().length
    },

})
// potassium
Template.potassiumTable.helpers({
    groupName() {
        return 'Potassium'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.potassium } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.potassium } }).fetch().length
    },

})
// chloride
Template.chlorideTable.helpers({

    groupName() {
        return 'Chloride'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.chloride } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.chloride } }).fetch().length
    },

})
// bicarb
Template.bicarbTable.helpers({

    groupName() {
        return 'Bicarbonate'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.bicarb } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.bicarb } }).fetch().length
    },

})
// bun
Template.ureaTable.helpers({

    groupName() {
        return 'Urea'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.urea } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.urea } }).fetch().length
    },

})
// cr

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

//eGFR

Template.eGFRTable.helpers({

    groupName() {
        return 'eGFR'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.eGFR } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.eGFR } }).fetch().length
    },

})

// glucose
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

// calcium
Template.calciumTable.helpers({

    groupName() {
        return 'Calcium'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.calcium } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.calcium } }).fetch().length
    },

})
// mag
Template.magTable.helpers({

    groupName() {
        return 'Magnesium'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.magnesium } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.magnesium } }).fetch().length
    },

})
// phos
Template.phosTable.helpers({

    groupName() {
        return 'Phosphorus'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.phosphorus } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: chemPanel.phosphorus } }).fetch().length
    },

})

//// Lipid Panel

// T Chol
Template.tCholTable.helpers({

    groupName() {
        return 'TChol'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.totalCholesterol } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.totalCholesterol } }).fetch().length
    },

})

// trigs
Template.trigTable.helpers({

    groupName() {
        return 'Triglycerides'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.triglycerides } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.triglycerides } }).fetch().length
    },

})
// LDL
Template.LDLTable.helpers({

    groupName() {
        return 'LDL'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.lowDensityLipo } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.lowDensityLipo } }).fetch().length
    },

})
// HDL
Template.HDLTable.helpers({

    groupName() {
        return 'HDL'
    },

    dataArray() { // This works for now but need to figure out how to search all codes, not just the first one.
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.highDensityLipo } }).fetch()
    },

    dataLength() {
        return Obs.find({ 'resource.code.coding.0.code': { $in: lipidPanel.highDensityLipo } }).fetch().length
    },

})

//// Other Chemistry 

// A1c
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