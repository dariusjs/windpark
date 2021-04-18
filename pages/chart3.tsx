import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
// import useDataApi from '../../hooks/useDataApi';
// import { boroughLegend } from '../../services/legend'
// import './styles.css'

// const url = fetch('/netherlands.json').then((resp) => resp.json());
// const url = '/netherlands.json';

// .then((data) => setMapData(data));

const Map = (props) => {
  // let [{ data }] = JSON.parse(url);
  const svgRef = useRef();
  const projRef = useRef(d3.geoMercator().center([52.1326, 5.2913]).scale(5750));
  const pathRef = useRef();

  const [data, setMapData] = useState([]);

  useEffect(() => {
    fetch('/provinces.json')
      .then((resp) => resp.json())
      .then((data) => setMapData(data));
  }, []);

  useEffect(() => {
    // GRAB CURRENT WIDTH/HEIGHT OF DIV ID="MAP"
    const height = svgRef.current.clientHeight;
    const width = svgRef.current.clientWidth;
    // FINE TUNE THE POSITION THE MAP WITHING THE ELEMENT
    projRef.current.translate([width / 2, height / 2]);
    // ASSING THE GEOPATH A PROJECTION
    pathRef.current = d3.geoPath().projection(projRef.current);
  }, [data]);

  // RENDER THE MAP
  const renderChart = () => {
    return data[0].features.map((d, i) => {
      const featurePath = `${pathRef.current(d)}`;
      // return <path key={i} d={featurePath} className={d.properties.name} fill={boroughLegend(d.properties.borough)} />;
      return (
        <path key={i} d={featurePath} className={d.properties.name} fill={`rgba(38,50,56,${d.properties.name * i})`} />
      );
    });
  };

  // RENDER THE PARKS
  const renderParks = (parks) => {
    const circles = d3
      .select(svgRef.current)
      .selectAll('.parks')
      .data(parks, (d) => d.name);

    circles
      .enter()
      .append('circle')
      .attr('transform', (d) => 'translate(' + projRef.current([+d.lon, +d.lat]) + ')')
      .attr('r', 4)
      .attr('class', (d, i) => `parks park-${d.code}`)
      .style('fill', (d) => d.color)
      .style('opacity', 0)
      .transition()
      .duration(500)
      .style('opacity', 1);

    circles.exit().transition().duration(500).style('opacity', 0).remove();
  };

  return (
    <svg id="provinces-map" ref={svgRef}>
      {data.length && renderChart()}
    </svg>
  );
};

export default Map;
