var width = 600,
    height = 800;
sliderInputCode();

var selectedYear =  parseInt(document.getElementById("sliderId").value);
var radiusOPC = Math.min(width, height) / 2; //radiusOuterPieChart

var selectedyearBirthData = pieChartData(selectedYear);

var svg = d3.select('svg')
            .attr('width',width)
            .attr('height',height);

    svg
    .append('g')
      .attr('transform','translate('+ width/2 + ','+ height/1.8 + ')')
      .classed('chart', true);

    svg
    .append('g')
      .attr('transform','translate('+ width/2 + ','+ height/1.8 + ')')
      .classed('innerChart', true);

    svg
    .append("text")
      .classed("title", true)
      .attr("x", width / 2)
      .attr("y", 30)
      .style("font-size", "2em")
      .style("text-anchor", "middle")

createPiechart(radiusOPC,150,selectedyearBirthData);

function sliderInputCode(){
var rangeDataYears = birthData.map(d => {return d.year});
var minDataYear = d3.min(rangeDataYears);
var maxDataYear = d3.max(rangeDataYears);
  d3.select('#sliderId')
      .property('min', minDataYear)
      .property('max', maxDataYear)
      .property('value', minDataYear)
};

var sliderListenP = d3.select('#sliderId')//sliderListenCreatePiechart
                          .on('input',function(){
                          var eventVal =  parseInt(d3.event.target.value);
                          createPiechart(radiusOPC,150,pieChartData(eventVal));

                          });

function createPiechart(oR,iR,arrayData){

  var innerPieArrayData = calcInnerPieData(arrayData);

  var colorScale = d3.scaleOrdinal()
                      .domain( arrayData)
                      .range(d3.schemeCategory20);

  var pie = d3.pie()
                .sort(null);

  var arc = d3.arc()
                .innerRadius(iR)
                .outerRadius(oR);

  var innerPie = d3.pie()
                .sort(null);

  var innerArc = d3.arc()
                .innerRadius(10)
                .outerRadius(iR);

  var arcs = d3.select('.chart')
                .selectAll('.arc')
                .data(pie(arrayData))

            arcs
                .enter()
                .append('path')
                .classed('arc',true)
                  .attr('fill', (d,i) => colorScale(i))
                .merge(arcs)
                  .attr('d', arc);

var innerArcs = d3.select('.innerChart')
                .selectAll('.arc')
                .data(innerPie(innerPieArrayData))

          innerArcs
              .enter()
              .append('path')
              .classed('arc',true)
                .attr('fill', (d,i) => colorScale(i))
              .merge(innerArcs)
                .attr('d', innerArc)

var selectedYear = parseInt(document.getElementById("sliderId").value);
var pieChartTitel = d3.select(".title")
                    .text("Births by months and quarter for " + selectedYear);
}

function calcInnerPieData(array){
  if (array.length == 12){
    arr1 = array.slice(0,3);
      sumArr1 = sumUp(arr1);
      arr2 = array.slice(3,6);
      sumArr2 = sumUp(arr2);
      arr3 = array.slice(6,9);
      sumArr3 = sumUp(arr3);
      arr4 = array.slice(9,12);
      sumArr4 = sumUp(arr4);
      return [sumArr1,sumArr2,sumArr3,sumArr4];
    }
  else{
    console.log("Arraylength needs to be 12");
  }
}

function sumUp(arr){
  var res = 0;
  for (i=0; i < arr.length; i++) {
              res += arr[i]
  }
  return res
}

function pieChartData(value){
  var yearData = birthData.filter(d => d.year === value);
  var yearDataBirths = yearData.map(d => {return d.births});
  return yearDataBirths;
}
