import * as React from "react";
import Chart from "react-apexcharts";

interface IChart1Props {
  dates: string[];
  visitors: number[];
  startIndex: number;
  endIndex: number;
}

const Chart1: React.FunctionComponent<IChart1Props> = ({
  dates,
  visitors,
  startIndex,
  endIndex,
}) => {
  let newDates: string[] = [];
  let newVisitors: number[] = [];

  for (let i = startIndex; i <= endIndex; i++) {
    newDates.push(dates[i]);
    newVisitors.push(visitors[i]);
  }

  let chartOptions = {
    series: [
      {
        name: "Hotel reservations",
        data: newVisitors,
      },
    ],
    options: {
      xaxis: {
        categories: newDates,
      },
      title: {
        text: "Number of Visitors per day",
        style: {
          fontSize: "32px",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      datalabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      chart: {
        stacked: false,
      },
    },
  };

  return (
    <div>
      <Chart
        type="area"
        options={chartOptions.options}
        series={chartOptions.series}
        height={500}
        data-testid="chart"
      />
    </div>
  );
};

export default Chart1;
