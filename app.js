var width = 600,
    height = 600;
var selectedYear = 2000;
var radius = Math.min(width, height) / 2;


var yearData = birthData.filter(d => d.year === selectedYear);
var yearDataBirths = yearData.map(d => {return d.births});
var rangeDataYears = birthData.map(d => {return d.year});

var minDataYear = d3.min(rangeDataYears);
var maxDataYear = d3.max(rangeDataYears);

function sliderInputCode(){
var sliderInput = document.getElementById("sliderId");
sliderInput.setAttribute('min',minDataYear);
sliderInput.setAttribute('max',maxDataYear);
var selectedYearV2 = parseInt(document.getElementById("sliderId").value);
};
sliderInputCode();

var colorScale = d3.scaleOrdinal()
                    .domain( yearDataBirths)
                    .range(d3.schemeCategory20);

var svg = d3.select('svg')
            .attr('width',width)
            .attr('height',height)
          .append('g')
            .attr('transform','translate('+ width/2 + ','+ height/2 + ')')
            .classed('chart', true);

var pie = d3.pie();
var arc = d3.arc()
              .innerRadius(150)
              .outerRadius(radius);

var arcs = svg.selectAll('.arc')
              .data(pie(yearDataBirths))
              .enter()
              .append('g')

              .attr('class','arc')
                .append('path')
                .attr('fill', (d,i) => colorScale(i))
                .attr('d', arc);
