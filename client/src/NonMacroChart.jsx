import React from 'react';
import * as d3 from 'd3';

function NonMacroChart ({ user, cart }) {
  // console.log('CHART_USER', user);
  // console.log('CHART_cart', cart);

  // non-macro array of objects (user, cart)
  var highLevelArray = [];
  var lowLevelArray = [];
  var calcium = {}, fiber = {}, iron = {}, magnesium = {}, potassium = {},
  sodium = {}, vitamin_a = {}, vitamin_b6 = {}, vitamin_b12 = {}, vitamin_c = {},
  vitamin_d = {};

  calcium.name = 'calcium';
  fiber.name = 'fiber';
  iron.name = 'iron';
  magnesium.name = 'magnesium';
  potassium.name = 'potassium';
  sodium.name = 'sodium';
  vitamin_a.name = 'vitamin_a';
  vitamin_b6.name = 'vitamin_b6';
  vitamin_b12.name = 'vitamin_b12';
  vitamin_c.name = 'vitamin_c';
  vitamin_d.name = 'vitamin_d';

  calcium.user = user.calcium;
  fiber.user = user.fiber;
  iron.user = user.iron;
  magnesium.user = user.magnesium;
  potassium.user = user.potassium;
  sodium.user = user.sodium;
  vitamin_a.user = user.vitamin_a;
  vitamin_b6.user = user.vitamin_b6;
  vitamin_b12.user = user.vitamin_b12;
  vitamin_c.user = user.vitamin_c;
  vitamin_d.user = user.vitamin_d;

  calcium.cart = cart.calcium;
  fiber.cart = cart.fiber;
  iron.cart = cart.iron;
  magnesium.cart = cart.magnesium;
  potassium.cart = cart.potassium;
  sodium.cart = cart.sodium;
  vitamin_a.cart = cart.vitamin_a;
  vitamin_b6.cart = cart.vitamin_b6;
  vitamin_b12.cart = cart.vitamin_b12;
  vitamin_c.cart = cart.vitamin_c;
  vitamin_d.cart = cart.vitamin_d;

  highLevelArray.push(calcium, magnesium, potassium, sodium, vitamin_a);
  lowLevelArray.push(fiber, iron, vitamin_b6, vitamin_b12, vitamin_c, vitamin_d);

  const subgroups = ['name', 'user', 'cart'];
  const highGroups = ['calcium', 'magnesium', 'potassium', 'sodium', 'vitamin_a', ];
  const lowGroups = ['fiber', 'iron', 'vitamin_b6', 'vitamin_b12', 'vitamin_c', 'vitamin_d'];



  const groupedBarChart = (w, h, subgroups, groups, scale, dataArr) => {
    var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

    const svgCanvas = d3
      .select("#non-macro")
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
    .domain([0, scale])
    .range([height, 0]);

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#f16c49', '#8c74b5'])

    // Show the bars
    svgCanvas.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(dataArr)
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
      .attr("fill", function(d) { return color(d.key); });
  }


  if (user && cart) {
    groupedBarChart(450, 450, subgroups, highGroups, 2800, highLevelArray);
    groupedBarChart(500, 400, subgroups, lowGroups, 80, lowLevelArray);
  }

  return (
    // <div>
    //   <div id="high-level"></div>
    //   <div id="low-level"></div>
    // </div>
    <div id="non-macro"></div>

  )
}


export default NonMacroChart;