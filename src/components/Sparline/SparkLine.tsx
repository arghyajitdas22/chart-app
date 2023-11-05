import * as React from "react";
import Chart from "react-apexcharts";

interface hotelDataProps {
  hotel: string;
  arrival_date_year: number;
  arrival_date_month: string;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

interface ISparkLineProps {
  hotelData: hotelDataProps[];
}

const SparkLine: React.FunctionComponent<ISparkLineProps> = ({ hotelData }) => {
  let adultCount = 0;
  let childrenCount = 0;

  for (let i = 0; i < hotelData.length; i++) {
    adultCount += hotelData[i].adults;
    childrenCount += hotelData[i].children;
  }

  let map = new Map<string, number>();

  for (let i = 0; i < hotelData.length; i++) {
    let country = hotelData[i].country;

    let val = map.get(country);

    val = val === undefined ? 0 : val + hotelData[i].adults;

    map.set(country, val);
  }

  const size = map.size;
  let i = 0;

  const it1 = map.keys();
  const it2 = map.values();

  let adults = [];
  let children = [];
  let countries = [];

  while (i < size) {
    countries.push(it1.next().value);
    adults.push(it2.next().value);
    ++i;
  }

  //   console.log(countries);
  //   console.log(adults);

  map.clear();

  for (let i = 0; i < hotelData.length; i++) {
    let country = hotelData[i].country;

    let val = map.get(country);

    val = val === undefined ? 0 : val + hotelData[i].children;

    map.set(country, val);
  }

  i = 0;
  const it3 = map.keys();
  const it4 = map.values();

  while (i < size) {
    countries.push(it3.next().value);
    children.push(it4.next().value);
    ++i;
  }

  //   console.log(countries);
  //   console.log(children);

  const adultChartOptions = {
    series: [
      {
        data: adults,
      },
    ],
    options: {
      xaxis: {
        categories: countries,
      },
      chart: {
        sparkline: {
          enabled: true,
        },
      },
      datalabels: {
        enabled: false,
      },
      title: {
        text: adultCount.toString(),
        style: {
          fontSize: "24px",
        },
      },
      subtitle: {
        text: "Total Adult Visitors",
        style: {
          fontSize: "16px",
        },
      },
    },
  };

  const childrenChartOptions = {
    series: [
      {
        data: children,
      },
    ],
    options: {
      xaxis: {
        categories: countries,
      },
      chart: {
        sparkline: {
          enabled: true,
        },
      },

      title: {
        text: childrenCount.toString(),
        style: {
          fontSize: "24px",
        },
      },
      datalabels: {
        enabled: false,
      },
      subtitle: {
        text: "Total Children Visitors",
        style: {
          fontSize: "16px",
        },
      },
    },
  };

  return (
    <div className="sparkline">
      <Chart
        type="line"
        series={adultChartOptions.series}
        options={adultChartOptions.options}
        height={500}
      />

      <Chart
        type="line"
        series={childrenChartOptions.series}
        options={childrenChartOptions.options}
        height={500}
      />
    </div>
  );
};

export default SparkLine;
