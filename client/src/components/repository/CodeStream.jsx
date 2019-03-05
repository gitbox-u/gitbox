import React from 'react';
import { ResponsiveStream } from '@nivo/stream';

function CodeStream(props) {
  const { stats } = props;

  return (
    <ResponsiveStream
      data={stats}
      keys={props.contributors}
      margin={{
        "top": 50,
        "right": 110,
        "bottom": 50,
        "left": 60
      }}

      axisBottom={{
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 5,
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
      colors="category10"
      fillOpacity={0.85}
      borderColor="#000"
    
      dotSize={8}
      dotBorderWidth={2}
      dotBorderColor="inherit:brighter(0.7)"
      animate={true}
      motionStiffness={90}
      colors={['#466289', '#DBE8F9','#FA6121','#FFB739']}
      motionDamping={15}
      legends={[
        {
          "anchor": "bottom-right",
          "direction": "column",
          "translateX": 100,
          "itemWidth": 80,
          "itemHeight": 20,
          "itemTextColor": "#999",
          "symbolSize": 12,
          "symbolShape": "circle",
          "effects": [
            {
              "on": "hover",
              "style": {
                "itemTextColor": "#000"
              }
            }
          ]
        }
      ]}
    />
  );
}

CodeStream.propTypes = {};

export default (CodeStream);
