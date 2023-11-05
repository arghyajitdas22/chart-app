import React from "react";
import { render, screen } from "@testing-library/react";
import Chart1 from "./Chart1";

test("if renders chart even if start and end dates are same", () => {
  render(
    <Chart1
      dates={["July1", "July2", "July3", "July4", "July5", "July6", "July7"]}
      visitors={[23, 32, 49, 103, 56, 69, 87]}
      startIndex={3}
      endIndex={3}
    />
  );
  const chartElement = screen.getByTestId("chart");
  expect(chartElement).toBeInTheDocument();
});
