//  The 'session' variables are used because they are an easy way to make changes reactive.
// counter starts at 0
Session.setDefault('counter_0_1', 0);

Session.setDefault('counter_1_1', 0);

Session.setDefault('label_1', "January");


// First time the chart is created in the .onRendered hook of the template
// After that the chart is updated in .helpers of the template
Session.setDefault('myChartIsCreated', false);

// Create object chartData with initial values
var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "green",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "red",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};


Template.chartjs.onRendered(function () {

    // Render the chart
    myChart = new Chart(document.getElementById("canvas").getContext("2d")).Line(chartData, {
        responsive: true
    });

    Session.set('myChartIsCreated', true);
});

Template.chartjs.helpers({
    counter_0_1: function () {
        return Session.get('counter_0_1');
    },
    counter_1_1: function () {
        return Session.get('counter_1_1');
    },
    label_1: function () {
        return Session.get('label_1');
    },
    chartUpdate: function () {

        if (Session.get('myChartIsCreated')) {

            myChart.datasets[0].points[0].value = Session.get('counter_0_1');
            myChart.datasets[1].points[0].value = Session.get('counter_1_1');
            chartData.labels[0] = Session.get('label_1');
            myChart.datasets[0].points[0].label = Session.get('label_1');
            myChart.update();

        }

    }

});

Template.chartjs.events({
    'click #btnAdd': function () {

        Session.set('counter_0_1', Session.get('counter_0_1') + 5);

    },
    'click #btnSubtract': function () {

        Session.set('counter_0_1', Session.get('counter_0_1') - 5);

    },
    'change #rangeIn_1': function () {

        Session.set('counter_1_1', rangeIn_1.value);

    },
    'click #btnLabel': function () {

        Session.set('label_1', inputLabel_1.value);

    }
});