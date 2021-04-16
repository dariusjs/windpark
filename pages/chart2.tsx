import React, { useState, useEffect } from 'react';
import { geoEqualEarth, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import d3 from 'd3';

const projection = geoEqualEarth()
  .scale(160)
  .translate([800 / 2, 450 / 2]);

var svg = (d3 as any).select('#map-holder').append('svg');
// set to the same size as the "map-holder" div
// .attr('width', $('#map-holder').width())
// .attr('height', $('#map-holder').height());
// add zoom functionality
(d3 as any).json('netherlands.json', (json: any) => {
  return json;
});

const WorldMap = () => {
  const [geographies, setGeographies] = useState([]);

  useEffect(() => {
    fetch('/netherlands.json').then((response) => {
      if (response.status !== 200) {
        console.log(`There was a problem: ${response.status}`);
        return;
      }
      response.json().then((worlddata) => {
        setGeographies(feature(worlddata, worlddata.objects.countries).features);
      });
    });
  }, []);

  return (
    <svg width={800} height={450} viewBox="0 0 800 450">
      <g className="countries">
        {geographies.map((d, i) => (
          <path
            key={`path-${i}`}
            d={geoPath().projection(projection)(d)}
            className="country"
            fill={`rgba(38,50,56,${(1 / geographies.length) * i})`}
            stroke="#FFFFFF"
            strokeWidth={0.5}
          />
        ))}
      </g>
      <g className="markers">
        <circle
          // cx={this.projection()([8, 48])[0]}
          // cy={this.projection()([8, 48])[1]}
          r={10}
          fill="#E91E63"
          className="marker"
        />
      </g>
    </svg>
  );
};

export default WorldMap;
