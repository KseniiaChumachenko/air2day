import { defineMessages } from "react-intl";

export default defineMessages({
  date: {
    id: "screen.locations.dataColumn.tableColumnDate",
    description: "screen.locations.dataColumn.tableColumnDate",
    defaultMessage: "Date"
  },
  time: {
    id: "screen.locations.dataColumn.tableColumnTime",
    description: "screen.locations.dataColumn.tableColumnTime",
    defaultMessage: "Time"
  },
  pollut: {
    id: "screen.locations.dataColumn.tableColumnPollut",
    description: "screen.locations.dataColumn.tableColumnPm2_5",
    defaultMessage: "Pollutant"
  },
  hourAvg: {
    id: "screen.locations.dataColumn.tableColumnHourAvg",
    description: "screen.locations.dataColumn.tableColumnPm10",
    defaultMessage: "Per hour average"
  },
  value: {
    id: "screen.locations.dataColumn.tableColumnHourAvg",
    description: "screen.locations.dataColumn.tableColumnPm10",
    defaultMessage: "Value [µg/m³]"
  },

  noData: {
    id: "screen.locations.dataColumn.table.noData",
    description: "screen.locations.dataColumn.table.noData",
    defaultMessage: "No data for this time frame occurred!"
  }
});
