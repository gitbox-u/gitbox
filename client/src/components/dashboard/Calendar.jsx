import React, {Component} from 'react';
import {ResponsiveCalendar} from '@nivo/calendar'

function Calendar() {
  return (
    <ResponsiveCalendar
      data={[
        {
          "day": "2016-05-11",
          "value": 141
        }
      ]
      }
      from="2016-01-02"
      to="2016-12-31"
      emptyColor="#eeeeee"
      colors={[
        "#0727b5",
        "#4469ca",
        "#4d96e8",
        "#87c0f4"
      ]}
      margin={{
        "top": 60,
        "right": 30,
        "bottom": 0,
        "left": 30
      }}
      padding={{
        "bottom": 0
      }}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
    />
  );
}

export default Calendar;