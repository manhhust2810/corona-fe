import React, { useState, useEffect, useRef } from "react";
import {
  select,
  scaleLinear,
  scaleBand,
  scaleTime,
  axisLeft,
  min,
  max,
  axisBottom,
  line,
  // bisector,
  // pointer
  // extent,
} from "d3";
import { data } from "./data/dataLineChart";
import * as d3 from "d3";
import moment from "moment";

const tooltipContent = data.map((item)=>{
  return{
    "Total": item.total,
    "Recover": item.recover,
    "Death": item.death
  }
})

const margin = {
  top: 30,
  bottom: 30,
  left: 40,
  right: 10,
},

tooltip = { width: 100, height: 100, x: 10, y: -30 };

const canvasHeight = 280;

const canvasWidth = 330;

const Chart = () => {

  console.log("tooltipContent", tooltipContent)
  const svgRef = useRef();

  function drawChart(svgCanvas) {
    const xScale = scaleBand()
      .domain(data.map((d) => d.date))
      .range([0, canvasWidth - margin.left - margin.right]);

    // const xScale = scaleTime()
    //   .domain(data.map((d) => d.date))
    //   .range([0, canvasWidth - margin.left - margin.right]);

    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d.total) + 500])
      .range([canvasHeight - margin.top - margin.bottom, 0]);

    // xScale.append("path").attr('stroke', 'blue');

    // function mousemove() {
    //   var x0 = x.invert(d3.mouse(this)[0]),
    //       i = bisectDate(data, x0, 1),
    //       d0 = data[i - 1],
    //       d1 = data[i],
    //       d = x0 - d0.date > d1.date - x0 ? d1 : d0;
    //   focus.attr("transform", "translate(" + x(d.date) + "," + y(d.likes) + ")");
    //   focus.select(".tooltip-total").text((d) => d.total);
    //   focus.select(".tooltip-recover").text((d) => d.recover);
    // }

    //

    const g = svgCanvas
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    g.append("g")
      .attr('class', 'grid')
      .call(axisBottom(xScale)
      .tickSize(-(canvasHeight - margin.top - margin.bottom))
      // .tickFormat(`${d.date}`),
      )
      .attr("stroke-width", 0.25)
      .attr(
        "transform",
        `translate(0, ${canvasHeight - margin.top - margin.bottom})`
      );

    g.append("g")
    .attr('class', 'grid')
    .call(axisLeft(yScale)
    .tickSize(-(canvasWidth - margin.left - margin.right))
    .tickFormat(''),
    )
    .attr("stroke-width", 0.25);

    g
    .append('g')
    .attr('class', 'x-axis')
    .attr('transform', `translate(0,${canvasHeight})`)
    .call(axisBottom().scale(xScale).tickSize(15));
    
    g
    .append('g')
    .attr('class', 'y-axis')
    .call(axisLeft(yScale));
    
    g.append("text")
    .attr("y", -10)
    .attr("x", -35)
    // .attr("y", 10)
    .attr("fill", "white")
    // .attr("dy", ".36em")
    // .attr("transform", "rotate(-90)")
    // .style("text-anchor", "end")
    .text("Total cases");

    g.append("text")
    .attr("y", -10)
    .attr("x", 170)
    // .attr("y", 10)
    .attr("fill", "white")
    // .attr("dy", ".36em")
    // .attr("transform", "rotate(-90)")
    // .style("text-anchor", "end")
    .text("31st Week of 2021");

    g.append("path")
      .datum(data)
      .attr("transform", `translate(20, 0)`)
      .attr("fill", "none")
      .transition()
      .duration(6666)
      .attr("stroke", "yellow")
      .attr("stroke-width", 2)
      .attr(
        "d",
        line()
          .x((d) => xScale(d.date))
          .y((d) => yScale(d.total))
      );

  // const focus = g.append("g")
  //     .attr("class", "focus")
  //     .style("display", "none");

  // focus.append("circle")
  //     .attr("r", 5);

  // focus.append("rect")
  //     .attr("class", "tooltip")
  //     .attr("width", 100)
  //     .attr("height", 50)
  //     .attr("x", 10)
  //     .attr("y", -22)
  //     .attr("rx", 4)
  //     .attr("ry", 4);

  // focus.append("text")
  //     .attr("class", "tooltip-total")
  //     .attr("x", 18)
  //     .attr("y", -2);

  // focus.append("text")
  //     .attr("x", 18)
  //     .attr("y", 18)
  //     .text("Likes:");

  // focus.append("text")
  //     .attr("class", "tooltip-death")
  //     .attr("x", 60)
  //     .attr("y", 18);

  // g.append("rect")
  //     .attr("class", "overlay")
  //     .attr("width", canvasWidth)
  //     .attr("height", canvasHeight)
  //     .on("mouseover", function() { focus.style("display", null); })
  //     .on("mouseout", function() { focus.style("display", "none"); })
  //     .on("mousemove", mousemove);

  // function mousemove(event) {
  //   const bisect = d3.bisector(d => d.total).left;
  //   const xPos = d3.pointer(this)[0];
  //   const x0 = bisect(data, xScale.invert(xPos));
  //   const d0 = data[x0];
  //   focus.attr(
  //     'transform',
  //     `translate(${xScale(d0.date)},${yScale(d0.total)})`,
  // );
  // tooltip
  //     .transition()
  //     .duration(300)
  //     .style('opacity', 0.9);
  //     focus.attr("transform", "translate(" + xScale(tooltipContent.total) + "," + yScale(tooltipContent.death) + ")");
  //     focus.select(".tooltip-total").text(tooltipContent.total);
  //     focus.select(".tooltip-death").text(tooltipContent.death);
  // }

  }

  useEffect(() => {
    // draw canvas
    const svgCanvas = select(svgRef.current)
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .attr("margin", 0)
      .style("border", "1px solid #28A745");

    drawChart(svgCanvas);
    return () => {
      // remove canvas
      svgCanvas.remove();
    };
  }, [data]);

  return (
    <div className="flex-container">
      <div
        ref={svgRef}
        style={{
          marginLeft: 2.5,
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          color: "white"
        }}
        className="flex-item"
      ></div>
    </div>
  );
}

export default Chart;