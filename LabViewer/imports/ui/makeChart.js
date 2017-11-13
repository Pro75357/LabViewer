import { Obs } from '../api/Observations.js'
import Chart from 'chart.js'

// We will use chart.js to make the chart.
// this allows us to easily make charts with the provided data values
// the challenge will be to have the chart reactive, based on user-selected values. 

// Here we need update the chart object based on the passed lab code
updateChart = function (code) {


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
            var labels = [0]

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
                data: [0]  // Just someplaceholder data
            }
            // Almost there- we need to insert this object into our datasets array. The array method push lets us easily do that.
            datasets.push(datasetobject)

            // Now that we have labels, and datasets we can build the top-level data object
            data = {
                labels,
                datasets
            }

            // The last top-level config object is options. Since we are doing a time-based scale, we will set this as an option. 
            // time stuff http://www.chartjs.org/docs/latest/axes/cartesian/time.html
            options = {
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
        }

        // We start here if the chart was already rendered and just needs updated. 

        // We need to basically update and replace the config object in the myChart object.
        // But, we're only concerned with the 'data' element within it for now

        // now, we can copy the datasetobject from above to use as a template
        dataset = datasetobject

        // We can now replace elements of the dataset object as we please. 
        dataset.fillColor= "blue", // blue fill


        // so we need to replace the label and data fields

        // label -> can just find one of the codes and use the codeName
            dataset.label = Obs.findOne({ code: code }).codeName


        // first collect the data we need. Labels and values. Both come from the Obs collection, findable using the passed code
        obs = Obs.find({ code: code }).fetch()

        // the data values needs to be an array of all the values in the set. Need to loop through obs and get these.
        values = [] // first, create an empty array
        for (x in obs) {
            // console.log(obs[x].value)
            values.push(obs[x].value) // push each value to our values array. 
        }

        // just copy the values directly
        dataset.data = values

        // Now, pretty much do the same thing for the dateTime fields to create the top-level labels
            // Since these are dates we will need to deal with dates. 
            // For now I will cheat and just count the number of results...
        labels = []
        for (x in obs) {
           // console.log(obs[x].dateTime)
            labels.push(obs[x].dateTime)
            //labels.push(x)
        }

        // finally, push this dataset object and new labels into the myChart object and update everything.
        myChart.data.dataset = dataset
        myChart.data.labels = labels
        myChart.update();

    }