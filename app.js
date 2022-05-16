var width = 600;
var height = 600;
var selectedYear = Null;


var yearData = birthData.filter(d => d.year === selectedYear);

var colorScale = d3.scaleOrdial()
                    .domain() // valueinput
                    .range(d3.schemeCategory10);

var svg = d3.select('svg')
            .attr('width',width)
            .attr('height',height)
          .append('g')
            .attr('transform','translate('+ width/2 + ','+ height/2 + ')')
            .classed('chart', true);
