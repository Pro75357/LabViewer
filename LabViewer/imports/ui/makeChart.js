import { Obs } from '../api/Observations.js'
import Chart from 'chart.js'

// We will use chart.js to make the chart.
// this allows us to easily make charts with the provided data values
// the challenge will be to have the chart reactive, based on user-selected values. 

// Here we need update the chart object based on the passed lab code
updateChart = function (newLabel, newData) {


    if (!Session.get('chartRendered')) {
        // The first time a lab is selected, this gets called to render the initial chart. Here we will first create the chart object with some placeholder data. 
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
        var labels = []

        // the datasets is an array of objects that each define an individual plot. Each object in datasets contains at least the following 
        // data: an array of data elements. this will map to the Y axis categories based on the index of the array.
        // label: not sure if required. Just labels this individual dataset. 
        // This also contains many optional components such as fillColor. 
        // Let's go ahead and define an empty dataset array
        var datasets = []

        // Now lets make a default dataset object. Essentially a template object we can re-use. Pretty colors included. 
        //http://www.chartjs.org/docs/latest/charts/line.html#dataset-properties
        datasetobject = {
            label: newLabel, // from the call
            backgroundColor: 'transparent',
            borderColor: 'blue',
            pointBackgroundColor: 'black',
            data: newData.values // from the call
        }


        // Almost there- we need to insert this object into our datasets array. The array method push lets us easily do that.
        datasets.push(datasetobject)

        // Now that we have labels, and datasets we can build the top-level data object
        var data = {
            // labels,
            datasets
        }

        // The last top-level config object is options. Since we are doing a time-based scale, we will set this as an option. 
        // time stuff http://www.chartjs.org/docs/latest/axes/cartesian/time.html
        var options = {
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            quarter: 'MMM YYYY'
                        }
                    }

                }]
            }
        }
        //

        // Finally, we have everything we need to build our config object. 

        var config = {
            type: 'line',
            data: data,
            options: options
        }

        // Now that we have our canvas object and config object defined, we can actually build the Chart.  

        myChart = new Chart(canvas, config)
        Session.set('chartRendered', true)
    } else {


        // We start here if the chart was already rendered and just needs updated. 

        // We need to basically update the config object in the myChart object.
        // But, we're only concerned with the 'data' element within it for now

        // now, we can copy the object from the current myChart to use as a template

        var newdatasetobject = {
            label: newLabel, // from the call
            backgroundColor: 'transparent',
            borderColor: getRandomColor(),
            pointBackgroundColor: 'black',
            data: newData.values // from the call
        }

        // datasets.push(newdatasetobject) // This will REPLACE the current chart. 
        // myChart.data.datasets = datasets // but we want to ADD the dataset...

        myChart.data.datasets.push(newdatasetobject)

        myChart.update();

        console.dir(myChart.data)

    }
        
}
// this is a global function available to any file that imports this one
resetChart = function () {
    // To reset, we will just delete all active datasets
    myChart.data.datasets = []
    myChart.update()
}

// this is a local function (not available outside this file)
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}