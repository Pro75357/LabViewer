// Here we define groups of codes to represent the possible values for each group. 

// We will define these as grouped arrays to help with counting

// It would be nice to pull these from an official source at some point. 
// such as https://www.nlm.nih.gov/vsac/support/usingvsac/vsacsvsapiv2.html

// We will just use LOINC codes for now

// hematology: Red Blood, White blood, platelets, Hemoglobin, Hematocrit

hematology = {
    redBlood: ['']
    , whiteBlood: ['']
    , platelets: ['']
    , hemoglobin: ['']
    , hematocrit: ['']
}



// ChemPanel: Na, K, Cl, Hco3, Bun, Cr, glucose (can add: ca, ph, mg)

chemPanel = {
    sodium: ['2947-0']
    , potassium: ['6298-4']
    , chloride: ['2069-3']
    , bicarb: ['20565-8']
    , urea: ['6299-2']
    , creatinine: ['38483-4', '14682-9', '21232-4', '2160-0', '59826-8']
    , eGFR: ['33914-3']
    //https://vsac.nlm.nih.gov/valueset/2.16.840.1.113883.3.666.5.2363/expansion
    ,glucose: ['15074-8','1557-8','1558-6','2339-0','2345-7','39480-9','39481-7','41651-1','41652-9']
    // add
    , calcium: ['49765-1']
    , magnesium:['']
    , phosphorus: ['']
}

// Lipids

lipidPanel = {
    totalCholesterol: ['2093-3']
    , triglycerides: ['2571-8']
    , lowDensityLipo: ['18262-6']
    , highDensityLipo: ['2085-9']
}
// Other chemistry

chemOther = {
    //https://vsac.nlm.nih.gov/valueset/2.16.840.1.113883.3.464.1003.198.12.1013/expansion
    a1c: ['4548-4', '4637-5', '17856-6']

}


// Define vitals groups here since they will be returned with the observations... if nothing else we can use this to exclude them.

vitals = {
    heightWeight: ['8302-2', '29463-7', '39156-5']
    , bloodPressure: ['55284-4'] // needs work
    , temperature: ['8331-1']
    , heartRate: ['']
    , respiratoryRate: ['']
}


// for the 'everything else' function
// first, store an array of lab groups
labGroups = [hematology, chemPanel, lipidPanel, chemOther, vitals]

// Now, iterate through that list and generate a list of all codes (to be used for an exclusion list)

allCodes= []

for (x in labGroups) {
    for (y in labGroups[x]) {
        for (z in labGroups[x][y]) {
            allCodes.push(labGroups[x][y][z])
        } 
        //console.dir(labGroups[x][y])
    }
}

//console.dir(allCodes)