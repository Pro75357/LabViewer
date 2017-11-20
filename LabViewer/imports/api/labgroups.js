// Here we define groups of codes to represent the possible values for each group. 

// We will define these as grouped arrays to help with counting

// It would be nice to pull these from an official source at some point. 
// such as https://www.nlm.nih.gov/vsac/support/usingvsac/vsacsvsapiv2.html

// We will just use LOINC codes for now

// hematology: Red Blood, White blood, platelets, Hemoglobin, Hematocrit

hematology = {
    whiteBlood: ['26464-8', '49498-9', '6690-2', '804-5'] // 2.16.840.1.113883.3.666.5.2403
    , platelets: ['13056-7', '26515-7', '26516-5', '777-3', '778-1'] //	2.16.840.1.113883.3.666.5.2405
    , hemoglobin: ['30313-1', '30350-3', '30351-1', '59260-0', '718-7'] // 	2.16.840.1.113762.1.4.1045.131
    , hematocrit: ['20570-8','31100-1','32354-3','41654-5','41655-2','4544-3','4545-0','71829-6','71830-4','71832-0','71833-8'] //	2.16.840.1.113762.1.4.1045.114
}



// ChemPanel: Na, K, Cl, Hco3, Bun, Cr, glucose (can add: ca, ph, mg)

chemPanel = {
    sodium: ['2947-0','2951-2','32717-1','39791-9','41567-8'] //	2.16.840.1.113762.1.4.1045.119
    , potassium: ['2823-3','32713-0','39789-3','41656-0','6298-4'] //		2.16.840.1.113762.1.4.1045.117
    , chloride: ['2069-3','2075-0','41649-5','41650-3'] //	2.16.840.1.113762.1.4.1045.123
    , bicarb: ['20565-8','14627-4','19229-4','1959-6','1960-4','2028-9'] //	2.16.840.1.113762.1.4.1045.138 // plus an extra code that is used by Synthetic Mass (20565-8)
    , urea: ['6299-2','12961-9','12962-7','12963-5','14937-7','3094-0','59570-2'] //	2.16.840.1.113762.1.4.1104.5
    , creatinine: ['38483-4', '14682-9', '21232-4', '2160-0', '59826-8'] //	2.16.840.1.113883.3.666.5.2364
    , eGFR: ['33914-3','45066-8','48642-3','48643-1','50044-7','50210-4','50384-7','62238-1','69405-9','70969-1','76633-7'] //	2.16.840.1.113883.17.4077.3.2029
    //https://vsac.nlm.nih.gov/valueset/2.16.840.1.113883.3.666.5.2363/expansion
    ,glucose: ['15074-8','1557-8','1558-6','2339-0','2345-7','39480-9','39481-7','41651-1','41652-9']
    // add
    , calcium: ['49765-1','17861-6','24321-2','24323-8','24362-6'] //   2.16.840.1.113762.1.4.1164.8  // also an extra from Synthetic Mass
    , magnesium: ['19123-9'] // not in any valuesets, just used loinc: https://s.details.loinc.org/LOINC/19123-9.html?sections=Comprehensive
    , phosphorus: ['2777-1'] // not in any valuesets, just used loinc: https://s.details.loinc.org/LOINC/2777-1.html?sections=Comprehensive
}

// Lipids

lipidPanel = {
    totalCholesterol: ['2093-3','14647-2'] // 2.16.840.1.113883.3.600.879
    , triglycerides: ['2571-8','12951-0','14927-8','47210-0'] //	2.16.840.1.113883.3.600.883
    , lowDensityLipo: ['18262-6','12773-8','13457-7','18261-8','2089-1','22748-8','39469-2','49132-4','55440-2'] //2.16.840.1.113883.3.600.872
    , highDensityLipo: ['2085-9','14646-4','18263-4'] //2.16.840.1.113883.3.600.875
}
// Other chemistry

chemOther = {
    //https://vsac.nlm.nih.gov/valueset/2.16.840.1.113883.3.464.1003.198.12.1013/expansion
    a1c: ['4548-4', '4637-5', '17856-6']

}


// Define vitals groups here since they will be returned with the observations... if nothing else we can use this to exclude them.

vitals = {
    height: ['8302-2', '3137-7', '3138-5', '8306-3', '8307-1', '8308-9'] // 2.16.840.1.113883.3.464.1003.121.12.1014
    , weight: ['18833-4','29463-7','3141-9','3142-7','8341-0','8349-3','8350-1','8351-9'] //2.16.840.1.113883.3.464.1003.121.12.1015
    , BMI: ['39156-5'] //2.16.840.1.113883.3.600.1.681
    , bloodPressure: ['55284-4'] // 	2.16.840.1.113883.3.600.2012
    , temperature: ['8331-1','8310-5','8328-7','8329-5','8332-9','8333-7'] //2.16.840.1.113883.17.4077.3.2023
    , heartRate: ['8867-4'] //2.16.840.1.113883.3.526.3.1176
    , respiratoryRate: ['9279-1'] //	2.16.840.1.113762.1.4.1045.130
}


// for the 'everything else' function
// first, store an array of lab groups
labGroups = { hematology, chemPanel, lipidPanel, chemOther, vitals }

// Now, iterate through that list and generate a list of all codes (to be used for an exclusion list) in a single array

allCodes= []

for (x in labGroups) {
    for (y in labGroups[x]) {
        for (z in labGroups[x][y]) {
            allCodes.push(labGroups[x][y][z])
        } 
        //console.dir(labGroups[x][y])
    }
}

// For group counts we will need all codes from an entire group in a single array i.e. Hematology.all
// Note we CANNOT do this BEFORE the allCodes function above... else it will loop!

for (x in labGroups) {
    for (y in labGroups[x]) {
        if (!labGroups[x].all) { // if the array does not exist (and it will not the first loop) - create it. Else, don't overwrite what whas there.
            labGroups[x].all = []
        }
        for (z in labGroups[x][y]) {
            labGroups[x].all.push(labGroups[x][y][z])
        }
    }
}

// Uncomment this to have the entire labGroups object in the client console
//console.dir(labGroups)