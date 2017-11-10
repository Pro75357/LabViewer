//Server-side only methods for handling REST/FHIR api calls

Meteor.methods({
	'getPatients': function (endpoint) {
		patientEndpoint = endpoint + '/Patient'
		try {
			res = HTTP.call(
					'GET',
					patientEndpoint, {
						params: {
							_count: 20, //Just get the first 20 patients
						},
						headers: {
							Accept: 'application/json, application/json+fhir'
						}
					})

			//If there are no errors, we will end up here
			// First, see if the response got returned as data. Most servers do, but SmartHealthIT does not. If res.data is blank, we will have to convert the content (text string but should be JSON) into an object

			try{ // use try/catch because if the content is not JSON it will fail. 
				if (!res.data) {
					res.data = JSON.parse(res.content)
				}
			} catch (e) {
				console.log(e)
			}

			// This will return a resource "bundle" which is an array of resources that match the search
			// Since we specifically searched for "Patient" all the resources are patients. 
			// Now, we only really need the Name and ID from here. Later we could pull more info. 
			// So, lets build a simple object with a list of patient names and ID's to return to the client.
			// This will need to be in the same format as our patList on the client code
			/* eg: 
			patList = [
				{ name: 'name', id: 'id' }
			]
			*/
			// First let's initialize the array- 
			patList = []

			// If we get real data but no results we should return an array with a "no patients returned" message
			if (!res.data.entry) {
				patList.push({ name: 'No patients found!', id: '' })
				return patList // Then we just return this and thus stop here.
			}

			// Else, we will need to do a loop to populate this new array with things from each of the results
			//see for example: https://www.w3schools.com/js/js_loop_for.asp
			//console.dir(res.data.entry)
			for (x in res.data.entry) {
				
				//	console.log(res.data.entry[x].resource.name[0].given)
				pre = res.data.entry[x].resource // for simplicity

				try { // check if name exists in the result (otherwise push will error)

					patList.push({
						// the name data is unfortunately deeply nested in the FHIR object and is itself in another array. For simplicity we will just select the first given and first family names, and combine these with a space into a common "name" field

						name: pre.name[0].given + ' ' + pre.name[0].family,
						// the id is thankfully a top-level object in the resource
						id: pre.id,
						// we can also throw in sex and age in here to help set context. 
						birthDate: pre.birthDate,
						gender: pre.gender
					})
				} catch (e) {
					// Sometimes results won't have a valid name. we'll just basically ignore these errors and they simply won't make it into the patList array
					console.log('entry '+x+' found no valid name. Skipping.')
					//console.log(e)
				}
				}

			// Finally, return this array to the client. 
			return patList

		} catch (e) {
			console.log(e)
			// handle 401 (not authroized) here
		}
	},

	'getObservations': function(endpoint, patId) {
		ObsEndpoint = endpoint + '/Observation'
		try {
			res = HTTP.call(
					'GET',
					ObsEndpoint, {
						params: {
							patient: patId,
							//category: 'laboratory' // hard-code this to just return laboratory data
							//category: 'vital-signs' //
						},
						headers: {
							Accept: 'application/json, application/json+fhir'
						}
					})
			// console.dir(res)
			try { // use try/catch because if the content is not JSON it will fail. 
				if (!res.data) {
					res.data = JSON.parse(res.content)
				}
			} catch (e) {
				console.log(e)
			}

			if (!res.data.entry) { // if no data gracefully return zero results.
				return {results: 0}
			}

			return { results: res.data.entry.length, entries: res.data.entry } // just return the entry array if it exists
		} catch (e) {
			console.log(e)
			// handle 401 (not authroized) here
		}
	},
})