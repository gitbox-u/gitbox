import React from 'react';
import { ResponsiveStream } from '@nivo/stream';

function CodeStream(props) {
  const { stats, contributors } = props;

  const contributorNames = contributors.map(t => t.name);
  const contributorColors = contributors.map(t => t.color);


  return (
    <ResponsiveStream
      data={stats}
      keys={contributorNames}
      margin={{
        "top": 20,
        "right": 60,
        "bottom": 50,
        "left": 60
      }}

      axisBottom={{
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 15,
        "tickRotation": 0,
        "legend": "",
        "legendOffset": 36
      }}
      axisLeft={{
        "orient": "left",
        "tickSize": 5,
        "tickPadding": 5,
        "tickRotation": 0,
        "legend": "",
        "legendOffset": -40
      }}
      offsetType="none"
      fillOpacity={0.85}
      borderColor="#000"
    
      dotSize={8}
      dotBorderWidth={2}
      dotBorderColor="inherit:brighter(0.7)"
      animate={true}
      motionStiffness={90}
      colors={contributorColors}
      motionDamping={15}
    />
  );
}

CodeStream.propTypes = {};

export default (CodeStream);
