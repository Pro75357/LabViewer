import { Obs } from '../api/Observations.js'
import Chart from 'chart.js'

// We will use chart.js to make the chart.
// this allows us to easily make charts with the provided data values
// the challenge will be to have the chart reactive, based on user-selected values. 


Template.chartjs.onRendered(function () {
    // Once the patient is selected, this gets rendered. Here we will first create the chart object with some placeholder data. 
    // See the documentation at: http://www.chartjs.org/docs/latest/

    // The Chart object builds from two main variables. One, the canvas object, which we will get and define here
    canvas = document.getElementById("canvas").getContext("2d")
    
/*   and Two, the data/labels/options object. I'll call it "config"
    Here is an example template of the whole thing.
    
var config {
    type: 'line',
    data: data,
    options: options
}
    */

// so, before we can build that we need to define each component. The type is easy. Here we want a line. NTD.
    // The data object is a little more complex. It has many optional objects that define what the chart will look like. 
    /* Example data object:
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },
    */
    // As you can see, a basic line chart will need two main data objects- labels, and datasets. 
        // labels is a basic array that stores the Y-axis categories. We can go ahead and define it with some placeholder values here
    var labels = [1, 2, 3, 4, 5, 6]

    // the datasets is an array of objects that each define an individual plot. Each object in datasets contains at least the following 
        // data: an array of data elements. this will map to the Y axis categories based on the index of the array.
        // label: not sure if required. Just labels this individual dataset. 
        // This also contains many optional components such as fillColor. 
        // Let's go ahead and define an empty dataset array
    datasets = []

        // Now lets make a default dataset object. Essentially a template object we can re-use. Pretty colors included. 
    datasetobject = {
        label: "dataset Template",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "green",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [1, 2, 3, 3, 3, 3]  // Just someplaceholder data
    }
        // Almost there- we need to insert this object into our datasets array. The array method push lets us easily do that.
    datasets.push(datasetobject)

    // Now that we have labels, and datasets we can build the top-level data object
    data = {
        labels,
        datasets
    }

    // The last top-level config object is options. For now, let's just use the default options and leave it out.
        //     var options = {}
    //

    // Finally, we have everything we need to build our config object. 

    var config = {
        type: 'line',
        data: data,
        options: {} // note here I just leave it blank.
    }

    // Now that we have our canvas object and config object defined, we can actually build the Chart.  

    myChart = new Chart(canvas, config)
});


// Here we can update the chart object based on the passed code (which lets us pick a data type)
function updateChart(code) {

            // first collect the data we need. Labels and Data. Both come from the Obs collection, findable using the passed code
            obs = Obs.find({ code: code }).fetch()

            // the data needs to be an array of all the values in the set. Need to loop through obs and get these.
            data = [] // first, create an empty array
            for (x in obs) {
                console.log(obs[x].value)
                data.push(obs[x].value) // push each value to the array. 
            }

            // now, copy the datasetobject from above for the template
            dataset = datasetobject
            // and replace the label and data fields
            // label -> can just find one of the codes and use the codeName
            dataset.label = Obs.findOne({ code: code }).codeName

            // Now, pretty much do the same thing for the dateTime fields to create the labels
            labels = []
            for (x in obs) {
                console.log(obs[x].dateTime)
                labels.push(obs[x].dateTime)
            }
            chartData.labels = labels

            // just copy the data directly
            dataset.data = data

            // finally, push this dataset object into the myChart object and update everything.
            myChart.dataset = dataset
            myChart.update();

        }


Template.chartjs.events({

});
