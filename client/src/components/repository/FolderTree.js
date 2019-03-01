import React from 'react';
import {ResponsiveTreeMap} from '@nivo/treemap'


function FolderTree(props) {

  const data = props.data;

  return (
    <ResponsiveTreeMap
      root={data}
      identity="name"
      value="loc"
      innerPadding={3}
      outerPadding={3}
      margin={{
        "top": 10,
        "right": 10,
        "bottom": 10,
        "left": 10
      }}
      label="loc"
      labelFormat=".0s"
      labelSkipSize={12}
      labelTextColor="inherit:darker(1.2)"
      colors="nivo"
      colorBy="depth"
      borderColor="inherit:darker(0.3)"
      animate={true}
      motionStiffness={90}
      motionDamping={11}
    />
  );
}

export default FolderTree;