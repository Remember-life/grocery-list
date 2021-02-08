import React from 'react';
import * as d3 from 'd3';

function MacroChart ({ user, cart }) {
  // console.log('CHART_USER', user);
  // console.log('CHART_cart', cart);

  const generateMacroChart = () => {
    // macro array of objects (lower, cart, upper)
    var macroArray = [];
    var carb = {};
    var protein = {};
    var fat = {};

    carb.name = 'carb';
    protein.name = 'protein';
    fat.name = 'fat';

    carb.cart = cart.carb;
    protein.cart = cart.protein;
    fat.cart = cart.fat;

    carb.lower = user.lower_carb;
    carb.upper = user.upper_carb;
    protein.lower = user.lower_protein;
    protein.upper = user.upper_protein;
    fat.lower = user.lower_fat;
    fat.upper = user.upper_fat;

    macroArray.push(carb, protein, fat);

    const subgroups = ['name', 'lower', 'cart', 'upper'];
    const groups = ['carb', 'protein', 'fat'];

    var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 430 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    const svgCanvas = d3
      .select("#macro")
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      // .style('border', '1px solid black');

    // Add X axis
    var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
    svgCanvas.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 500])   //active male upper_carb = 487
    .range([height, 0]);

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
    .domain(subgroups)
    // .range(['#e41a1c','#377eb8','#4daf4a'])
    .range(['#4394c3', '#8c74b5', '#f16c49']);

    // Show the bars
    svgCanvas.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(macroArray)
    .enter()
    .append("g")
      .attr("transform", function(d) {
        return "translate(" + x(d.name) + ",0)";
      })
    .selectAll("rect")
    .data(function(d) {
      // console.log('d1', d);
      return subgroups.map(function(key) { return {key: key, value: d[key]}; });
    })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) {  return y(d.value);  })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) {
        if (typeof d.value === 'number') {
          return height - y(d.value);
        }
      })
      .attr("fill", function(d) {
        // console.log('d', d, 'color(d.key)', color(d.key))
        return color(d.key);
      });

    //legends ====================================================
    const legends = ['Upper Limit', 'Lower Limit', 'Your cart'];
    var legendSvg = d3.select("#macro-legends")
    .append('svg')
    .attr('width', 400)
    .attr('height', 400);

    var legendColor = d3.scaleOrdinal()
    .domain(legends)
    // .range(d3.schemeSet1);
    .range(['#4394c3', '#8c74b5', '#f16c49'])

    legendSvg.selectAll("mydots")
    .data(legends)
    .enter()
    .append("circle")
      .attr("cx", 100)
      .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
      .attr("r", 5)
      .style("fill", function(d){ return legendColor(d)})

    legendSvg.selectAll("mylabels")
    .data(legends)
    .enter()
    .append("text")
      .attr("x", 120)
      .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function(d){
        // console.log('d', d, 'legendColor(d)', legendColor(d));
        return legendColor(d)
      })
      .text(function(d){
        // console.log('legends', d);
        return d
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
      .style("font-size", "17px")

  }

  if (user && cart) {
    generateMacroChart();
  }

  return (
    <div className="macro-container" style={macroContainer}>
      <div id="macro" style={macro}></div>
      <div id="macro-legends" style={macro}></div>
    </div>

  )
}

const macroContainer = {
  display: 'inline-flex', //'inline-block'
}

const macro = {
  display: 'inline',
  width: 'fit-content',
  height: 'fit-content',
}


export default MacroChart;