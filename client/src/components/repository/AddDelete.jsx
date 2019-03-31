import React from 'react';
import { ResponsiveLine } from '@nivo/line'


function AddDelete(props) {

  const data = props.data
  // .map(
  //   dat => {
  //     return {
  //       ...dat,
  //       data: dat.data.map(
  //         pt => {
  //           return {
  //             ...pt,
  //             x: new Date(pt.x * 1000).toDateString(),
  //             // x: parseInt(pt.x),
  //           }
  //         }
  //       )
  //     }
  //   }
  // );

  console.log(data);


  return (
    <ResponsiveLine
      data={data}
      margin={{
        "top": 30,
        "right": 20,
        "bottom": 50,
        "left": 60
      }}
      xScale={{
        "type": "point"
      }}
      yScale={{
        "type": "linear",
        "stacked": false,
        "min": "auto",
        "max": "auto"
      }}
      axisBottom={{
        "orient": "bottom",
        "tickSize": 5,
        "tickPadding": 15,
        "tickRotation": 0,
        "legend": "Time",
        "legendOffset": 36,
        "legendPosition": "middle",
        "format": () => ""
      }}
      dotSize={10}
      dotColor="inherit:darker(0.3)"
      dotBorderWidth={0}
      dotBorderColor="#ffffff"
      enableGridY={false}
      enableDotLabel={false}
      colorBy={e => e.color}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      curve={"monotoneX"}
      tooltip={
        slice => (
          <div style={{ color: '#000' }}>
            <siv>{new Date(slice.id * 1000).toDateString()}</siv>
            {slice.data.map(d => (
              <div
                key={d.serie.id}
                style={{
                  color: d.serie.color,
                  padding: '3px 0',
                }}
              >
                <strong>{d.serie.id}</strong> [{d.data.y}]
          </div>
            ))}
          </div>
        )
      }
    />
  );
}

export default AddDelete;