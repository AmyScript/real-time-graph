import React, { useEffect, useState } from "react";
import FusionCharts from "fusioncharts/core";
import RealTimeLine from "fusioncharts/viz/realtimeline";
import ReactFusioncharts from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

import { subScribeToDataStream } from "./api";

ReactFusioncharts.fcRoot(FusionCharts, RealTimeLine, FusionTheme);

export const LineChart = () => {
  const [data, setState] = useState({ label: "", value: "" });
  const [labelValues, setLabel] = useState([]);
  const [dataValues, setData] = useState([]);

  useEffect(() => {
    subScribeToDataStream((error, data) => setState(data));
  }, []);

  useEffect(() => {
    const temp = labelValues;
    temp.push({ label: data.label });
    const temp2 = dataValues;
    temp2.push({ value: data.value });
    setLabel(temp);
    setData(temp2);
  });

  const dataSource = {
    chart: {
      caption: "Google Stock Bid Price",
      xAxisName: "Time (hh:mm:ss:ms)",
      yAxisName: "Stock Bid Price",
      numberprefix: "$",
      numdisplaysets: "20",
      labeldisplay: "rotate",
      showrealtimevalue: "0",
      theme: "fusion",
      plottooltext: "$label<br>Bid Price: <b>$dataValue</b>",
      setadaptiveymin: "1"
    },
    categories: [
      {
        category: labelValues
      }
    ],
    dataset: [
      {
        data: dataValues
      }
    ]
  };

  return (
    <React.Fragment>
      <ReactFusioncharts
        type="realtimeline"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </React.Fragment>
  );
};
