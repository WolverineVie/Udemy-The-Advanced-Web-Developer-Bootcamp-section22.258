var width = 600,
    height = 600;
sliderInputCode();

var selectedYear =  parseInt(document.getElementById("sliderId").value);
var radiusOPC = Math.min(width, height) / 2; //radiusOuterPieChart

var yearData = birthData.filter(d => d.year === selectedYear);
var yearDataBirths = yearData.map(d => {return d.births});
var quartalDatabirths = calcInnerPieData(yearDataBirths);

createPiechart(radiusOPC,150,yearDataBirths); //outer Piechart
createPiechart(150,50,quartalDatabirths);// inner Piechart

function sliderInputCode(){
var rangeDataYears = birthData.map(d => {return d.year});
var minDataYear = d3.min(rangeDataYears);
var maxDataYear = d3.max(rangeDataYears);
  d3.select('#sliderId')
  .property('min', minDataYear)
  .property('max', maxDataYear)
  .property('value', minDataYear)
};

d3.select('#sliderId')
.on('input.one', function(){//input.one -> .one is namespace needed if element has same multiple listeners
  var eventVal =  parseInt(d3.event.target.value);
  var test2 = innerPieChartData(eventVal);
  createPiechart(150,50,innerPieChartData(eventVal));
  console.log(eventVal);
  console.log(test2)
});

d3.select('#sliderId')
.on('input.two',function(){ //input.two -> .two is namespace needed if element has same multiple listeners
var eventVal =  parseInt(d3.event.target.value);
createPiechart(radiusOPC,150,outerPieChartData(eventVal));
  console.log('outerPie:' +eventVal);
});

function createPiechart(oR,iR,arrayData){
var colorScale = d3.scaleOrdinal()
                    .domain( arrayData)
                    .range(d3.schemeCategory20);

var svg = d3.select('svg')
            .attr('width',width)
            .attr('height',height)
          .append('g')
            .attr('transform','translate('+ width/2 + ','+ height/2 + ')')
            .classed('chart', true);

var pie = d3.pie()
              .sort(null);
var arc = d3.arc()
              .innerRadius(iR)
              .outerRadius(oR);

var arcs = svg.selectAll('.arc')
              .data(pie(arrayData))
              .enter()
              .append('g')
              .attr('class','arc')
                .append('path')
                .attr('fill', (d,i) => colorScale(i))
                .attr('d', arc);
}

function calcInnerPieData(array){
  if (array.length = 12){
      arr1 = array.slice(0,3);
      sumArr1 = sumUp(arr1);
      arr2 = array.slice(3,6);
      sumArr2 = sumUp(arr2);
      arr3 = array.slice(6,9);
      sumArr3 = sumUp(arr3);
      arr4 = array.slice(9,12);
      sumArr4 = sumUp(arr4);
      return [sumArr1,sumArr2,sumArr3,sumArr4]
  }
  else console.log("Array does not have size of 12");
  //throw 'monthlenght other than 12'
}

function sumUp(arr){
  var res = 0;
  for (i=0; i < arr.length; i++) {
              res += arr[i]
  }
  return res
}

function outerPieChartData(value){
  var yearData = birthData.filter(d => d.year === value);
  var yearDataBirths = yearData.map(d => {return d.births});
  return yearDataBirths;
}
function innerPieChartData(value){
  var yearData = birthData.filter(d => d.year === value);
  var yearDataBirths = yearData.map(d => {return d.births});
  var quartalDatabirths = calcInnerPieData(yearDataBirths);
  return quartalDatabirths;
}
