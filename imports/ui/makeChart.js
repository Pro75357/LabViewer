import {Obs} from '../api/Observations.js'

// We will use chart.js to make the chart.
// this allows us to easily make charts with the provided data values
// the challenge will be to have the chart reactive, based on user-selected values. 

// First, we will need to define the session variables that will populate the labels (x-axis) and datasets (y-axis)
// the labels are simply an array of strings. Since we want our X-axis to be dates, we will use the date/time values from the FHIR data to create this array. For now, we just make a default array
Session.setDefault('chartLabels',[1,2,3,4,5,6])

// Next, we need an array of datasets. datasets are objects with many values used by chartJS to create the chart.
datasets = []
    // lets make a default dataset object. Essentially a template object we can re-use.
datasetobject = {
    label: "dataset Template",
    fillColor: "rgba(220,220,220,0.2)",
    strokeColor: "green",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    pointHighlightFill: "#fff",
    pointHighlightStroke: "rgba(220,220,220,1)",
    data: []  // needs to be empty else we have to empty it first.
}

datasets.push(datasetobject)// this loads the first dataset into the session variable.

// then we'll save that as our first dataset session variable'
Session.set('datasets',datasets) 

// First time the chart is created in the .onRendered hook of the template
// After that the chart is updated in .helpers of the template
Session.setDefault('myChartIsCreated', false);

// Create object chartData with initial values
var chartData = {
    labels: Session.get('chartLabels'),
    datasets: Session.get('datasets')
};

Template.chartjs.onRendered(function () {
    // Render the chart
    myChart = new Chart(document.getElementById("canvas").getContext("2d")).Line(chartData, {
        responsive: true
    });
    Session.set('myChartIsCreated', true);
});

Template.chartjs.helpers({

    chartUpdate: function () {

        if (Session.get('myChartIsCreated')) {

            /*
            myChart.datasets[0].points[0].value = Session.get('counter_0_1');
            myChart.datasets[1].points[0].value = Session.get('counter_1_1');
            chartData.labels[0] = Session.get('label_1');
            myChart.datasets[0].points[0].label = Session.get('label_1');
            */
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

    }

});

Template.chartjs.events({

});

    function updateChart(code) {

    }