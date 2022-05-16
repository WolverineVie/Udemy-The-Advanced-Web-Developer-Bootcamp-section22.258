var width = 600;
var height = 600;
var year = Null;
var selectedYear = Null;


var yearData = birthData.filter(d => d.year === selectedYear);

var selectedYear = function chooseYear(yearSelection){
      birthData.filter(d => d.year === yearSelection)
};

var yearData2 = function (yearSelection){
        birthData.filter(function(d){ if (d.year === yearSelection) console.log(d)  })
};

// why selectedYear and yearData2 not working ?
