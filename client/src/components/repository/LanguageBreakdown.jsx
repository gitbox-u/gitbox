import React from 'react';
import {ResponsiveSunburst} from '@nivo/sunburst'


function LanguageBreakdown(props) {

  const data = props.data;

  return (
    <ResponsiveSunburst
      data={data}
      margin={{
        "top": 10,
        "right": 20,
        "bottom": 20,
        "left": 20
      }}
      identity="name"
      value="lines"
      cornerRadius={2}
      borderWidth={1}
      borderColor="white"
      colors="category10"
      colorBy={function(e){return e.color}}
      childColor="inherit"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      isInteractive={true}
    />
  );
}

export default LanguageBreakdown;