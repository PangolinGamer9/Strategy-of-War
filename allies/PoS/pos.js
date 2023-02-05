// Loads all the packages
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
//google.charts.setOnLoadCallback(drawChart);

// Gets the values from the spreadsheet and send them to response handler
function drawChart(column, text) {
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1alvkYtKv8PjQnVWUplkpE0Up5Byv_4vDQhXi72ABa1U/gviz/tq?sheet=Stats&headers=1&tq=select A,'+column);

  query.send(handleQueryResponse);
}


function handleQueryResponse(response) {
  // Checks to make sure the response isn't an error
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    console.log(response.getDetailedMessage);
    return;
  }

  // Gets the data
  var data = response.getDataTable();

  // Creates an array to use to visualize the data
  var items = new google.visualization.DataTable();
  items.addColumn('string', 'Country');
  items.addColumn('number', selectedText);


  // Temp code
  for (let i = 0; i <9; i++){
    items.addRows([
      [data.Wf[i].c[0].v, data.Wf[i].c[1].v]
    ])
  }
  
  // Formatter
  if (selectedText == "Money" || selectedText == "War Fund"){
    var formatter = new google.visualization.NumberFormat({prefix: '$'});
    formatter.format(items, 1);
  }
  

  // The options for the chart
  var options = {
    title: 'Distribution of ' + selectedText + " in Pact of Steel",
  };

  // Create the chart and assign it a parent element
  var chart = new google.visualization.PieChart(document.getElementById('chart-space1'));
  chart.draw(items, options);
  var chart2 = new google.visualization.Table(document.getElementById('chart-space2'));
  chart2.draw(items, {width: '100%', height: '100%'});
}



const select = document.getElementById("select-stats");
let selectedText = ''
select.addEventListener("change", function() {
  // Stuff with the text
  let selectedIndex = this.selectedIndex;
  selectedText = this.options[selectedIndex].text;

  // Does stuff with the values
  let selectedValue = this.value;
  let value = parseInt(selectedValue.substring(5));
  let columnLetter = String.fromCharCode((value+66));
  drawChart(columnLetter, {width: "100%", height: "100%"})
});


window.onload = function() {
  // Stuff with the text
  let selectedIndex = select.selectedIndex;
  selectedText = select.options[selectedIndex].text;

  // Does stuff with the values
  let selectedValue = select.value;
  let value = parseInt(selectedValue.substring(5));
  let columnLetter = String.fromCharCode((value+66));
  drawChart(columnLetter)
};