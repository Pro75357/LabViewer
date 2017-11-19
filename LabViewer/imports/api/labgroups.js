// Here we define groups of LOINC codes to represent the possible values for each group. 

// We will define these as arrays. It would be nice to pull these from an official source at some point. 
// such as https://www.nlm.nih.gov/vsac/support/usingvsac/vsacsvsapiv2.html


// We will just use LOINC codes for now
labGroupA1c = ['4548-4', '4637-5', '17856-6']
//https://vsac.nlm.nih.gov/valueset/2.16.840.1.113883.3.464.1003.198.12.1013/expansion

labGroupGlucose = [
    '15074-8'
    , '1557-8'
    , '1558-6'
    , '2339-0'
    , '2345-7'
    , '39480-9'
    , '39481-7'
    , '41651-1'
    , '41652-9'
    ]

//https://vsac.nlm.nih.gov/valueset/2.16.840.1.113762.1.4.1045.134/expansion


labGroupCreatanine = ['38483-4', '14682-9', '21232-4','2160-0', '59826-8']
//https://vsac.nlm.nih.gov/valueset/2.16.840.1.113883.3.666.5.2363/expansion

// Doing height & Weight since they are so numerous in the observations

vitalsGroupHeightWeight = ['8302-2', '29463-7', '39156-5']

vitalsGroupBloodPressure = ['55284-4']