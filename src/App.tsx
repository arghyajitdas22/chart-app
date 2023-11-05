import { useState } from "react";
import "./App.css";
import Chart1 from "./components/Chart1";
import Chart2 from "./components/Chart2";
import SparkLine from "./components/Sparline/SparkLine";
import hotelData from "./data";

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

function App() {
  const [startDate, setStartDate] = useState("July 1");
  const [endDate, setEndDate] = useState("August 9");
  const [invalid, setInvalid] = useState(false);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(39);

  let map = new Map<string, number>();
  let [newHotelData, setNewHotelData] = useState<hotelDataProps[]>(hotelData);

  for (let i = 0; i < hotelData.length; i++) {
    let date =
      hotelData[i].arrival_date_month +
      " " +
      hotelData[i].arrival_date_day_of_month;

    let val = map.get(date);

    val =
      val === undefined
        ? 0
        : val +
          hotelData[i].adults +
          hotelData[i].babies +
          hotelData[i].children;

    map.set(date, val);
  }

  const size = map.size;
  let i = 0;

  const it1 = map.keys();
  const it2 = map.values();

  let dates: string[] = [];
  let visitors: number[] = [];

  while (i < size) {
    dates.push(it1.next().value);
    visitors.push(it2.next().value);
    ++i;
  }

  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartDate(e.currentTarget.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndDate(e.currentTarget.value);
  };

  const handleFilter = () => {
    let start = 0,
      end = 39;

    for (let i = 0; i < dates.length; i++) {
      if (dates[i] === startDate) {
        start = i;
      }
      if (dates[i] === endDate) {
        end = i;
      }
    }

    if (start > end) {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
      }, 2000);
      return;
    }

    setStartIndex(start);
    setEndIndex(end);

    let s = dates[start];
    let e = dates[end];

    console.log(s);
    console.log(e);

    for (let i = 0; i < hotelData.length; i++) {
      let fullDate =
        hotelData[i].arrival_date_month +
        " " +
        hotelData[i].arrival_date_day_of_month;
      if (fullDate === s) {
        start = i;
        break;
      }
    }

    for (let i = 0; i < hotelData.length; i++) {
      let fullDate =
        hotelData[i].arrival_date_month +
        " " +
        hotelData[i].arrival_date_day_of_month;
      if (fullDate === e) {
        end = i;
      }
    }

    setNewHotelData(
      newHotelData.filter(
        (data: hotelDataProps, index: number) => index >= start && index <= end
      )
    );
  };

  return (
    <div className="App">
      <div className="inputs">
        <div className="input">
          <label htmlFor="start date">Select Start Date:</label>
          <select
            name="start date"
            id="start date"
            value={startDate}
            onChange={handleStartChange}
          >
            {dates.map((date) => (
              <option value={date} key={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <div className="input">
          <label htmlFor="end date">Select End Date:</label>
          <select
            name="end date"
            id="end date"
            value={endDate}
            onChange={handleEndChange}
          >
            {dates.map((date) => (
              <option value={date} key={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={handleFilter}>
          Filter
        </button>

        {invalid ? (
          <span className="invalid-text">Invalid range</span>
        ) : (
          <span></span>
        )}
      </div>

      <Chart1
        dates={dates}
        visitors={visitors}
        startIndex={startIndex}
        endIndex={endIndex}
      />

      <Chart2 hotelData={newHotelData} />
      <SparkLine hotelData={newHotelData} />
    </div>
  );
}

export default App;
