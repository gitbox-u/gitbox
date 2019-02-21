import React, {Component} from 'react';
import { ResponsiveSunburst } from '@nivo/sunburst'


class LanguageBreakdown extends Component {
  render() {

    const data = this.props.data;

    return (
      <ResponsiveSunburst
        data={data}
        margin={{
          "top": 40,
          "right": 20,
          "bottom": 20,
          "left": 20
        }}
        identity="name"
        value="loc"
        cornerRadius={2}
        borderWidth={1}
        borderColor="white"
        colors="nivo"
        colorBy="id"
        childColor="inherit"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={true}
      />
    );
  }
}

export default LanguageBreakdown;