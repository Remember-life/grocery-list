import React, { useRef, useState } from 'react';
import * as d3 from 'd3';

function Chart ({ user, cart }) {
  // console.log('CHART_USER', user);
  // console.log('CHART_cart', cart);

  // macro array of objects (lower, cart, upper)
  var macroArray = [];
  var carb = {};
  var protein = {};
  var fat = {};

  for (var key in user) {
    if (key === 'lower_carb') {
      carb.lower = user.lower_carb;
    }
    if (key === 'upper_carb') {
      carb.upper = user.upper_carb;
    }
    if (key === 'lower_protein') {
      protein.lower = user.lower_protein;
    }
    if (key === 'upper_protein') {
      protein.upper = user.upper_protein;
    }
    if (key === 'lower_fat') {
      fat.lower = user.lower_fat;
    }
    if (key === 'upper_fat') {
      fat.upper = user.upper_fat;
    }
  }
  carb.name = 'carb';
  protein.name = 'protein';
  fat.name = 'fat';
  carb.cart = cart.carb;
  protein.cart = cart.protein;
  fat.cart = cart.fat;

  macroArray.push(carb);
  macroArray.push(protein);
  macroArray.push(fat);

  // non-macro array of objects (user, cart)
  var nonMacroArray = [];

  if (user && cart) {

    const subgroups = ['name', 'lower', 'cart', 'upper'];
    const groups = ['carb', 'protein', 'fat'];

    var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 430 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    // const width = 500;
    // const height = 300;
    // const scale = 10;
    const svgCanvas = d3
      .select("#vis")
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
    .range(['#e41a1c','#377eb8','#4daf4a'])

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
      // .attr("y", function(d) {  return y(d.value);  })
      .attr("y", function(d) {  return y(d.value);  })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) {
        if (typeof d.value === 'number') {
          return height - y(d.value);
        }
      })
      .attr("fill", function(d) { return color(d.key); });
  }

  return (
    <div id="vis"></div>
  )
}

// class Chart extends React.Component {
//   constructor(props) {
//     super(props);

//     this.drawChart = this.drawChart.bind(this);
//   }

//   componentDidMount() {
//     // const data = this.props.user;
//     console.log('CHART', this.props);
//     var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

//     this.drawChart(data);
//   }

//   drawChart(data) {

//     const width = 500;
//     const height = 300;
//     const scale = 10;
//     const svgCanvas = d3
//       .select(this.refs.canvas)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height)
//       .style('border', '1px solid black');

//     svgCanvas.selectAll('rect')
//       .data(data).enter()
//         .append('rect')
//         .attr('width', 30)
//         .attr('height', (datapoint) => datapoint * 10)
//         .attr('fill', 'orange')
//         .attr('x', (datapoint, iteration) => iteration * 35)
//         .attr('y', (datapoint) => height - datapoint * scale);

//     svgCanvas.selectAll('text')
//       .data(data).enter()
//         .append('text')
//         .attr('x', (dataPoint, i) => i * 35 + 10)
//         .attr('y', (dataPoint, i) => height - dataPoint * scale - 10)
//         .text(dataPoint => dataPoint)

//   }

//   render() {
//     return (

//       <div ref="canvas">
//         {console.log('RETURN CHART', this.props.cart)}
//         {console.log('RETURN CHART', this.props.user)}
//       </div>
//     )
//   }
// }

export default Chart;