import * as React from "react";
import Chart from "react-apexcharts";
// import hotelData from "../data";

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

interface IChart2Props {
  hotelData: hotelDataProps[];
}

const Chart2: React.FunctionComponent<IChart2Props> = ({ hotelData }) => {
  let map = new Map<string, number>();

  for (let i = 0; i < hotelData.length; i++) {
    let country = hotelData[i].country;

    map.set(country, 0);
  }

  for (let i = 0; i < hotelData.length; i++) {
    let country = hotelData[i].country;

    let val = map.get(country);

    val =
      val === undefined
        ? 0
        : val +
          hotelData[i].adults +
          hotelData[i].babies +
          hotelData[i].children;

    map.set(country, val);
  }

  const size = map.size;
  let i = 0;

  const it1 = map.keys();
  const it2 = map.values();

  let visitors = [];
  let countries = [];

  while (i < size) {
    countries.push(it1.next().value);
    visitors.push(it2.next().value);
    ++i;
  }

  //   console.log(countries);
  //   console.log(visitors);

  const chartOptions = {
    series: [
      {
        name: "Hotel reservations",
        data: visitors,
      },
    ],
    options: {
      xaxis: {
        categories: countries,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
        },
      },
      title: {
        text: "Number of visitors per country",
        style: {
          fontSize: "32px",
        },
      },
    },
  };

  return (
    <div>
      <Chart
        type="bar"
        options={chartOptions.options}
        series={chartOptions.series}
        height={500}
      />
    </div>
  );
};

export default Chart2;
