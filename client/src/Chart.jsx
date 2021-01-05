import React, { useRef, useState } from 'react';
import * as d3 from 'd3';

// function Chart ({ user }) {
//   const canvas = useRef();
//   const data = user;
//   var width = 450, height = 450, margin = 50;
//   var radius = Math.min(width, height) / 2 - margin;

//   var svg = d3.select(canvas)
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .style("border", "1px solid black")
//   // const drawChart = (data) => {
//   //   const svgCanvas = d3.select(refs.canvas)
//   // }

//   // // drawChart(data);

//   return (
//     <div ref={canvas}>HERE HERE HERE</div>
//   )
// }

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    // const data = this.props.user;
    var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    this.drawChart(data);
  }

  drawChart(data) {
    const width = 300;
    const height = 300;
    const scale = 10;
    const svgCanvas = d3
      .select(this.refs.canvas)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid black');

    svgCanvas.selectAll('rect')
      .data(data).enter()
        .append('rect')
        .attr('width', 30)
        .attr('height', (datapoint) => datapoint * 10)
        .attr('fill', 'orange')
        .attr('x', (datapoint, iteration) => iteration * 35)
        .attr('y', (datapoint) => height - datapoint * scale);

    svgCanvas.selectAll('text')
      .data(data).enter()
        .append('text')
        .attr('x', (dataPoint, i) => i * 35 + 10)
        .attr('y', (dataPoint, i) => height - dataPoint * scale - 10)
        .text(dataPoint => dataPoint)

  }

  render() {
    return (
      <div ref="canvas"></div>
    )
  }
}

export default Chart;