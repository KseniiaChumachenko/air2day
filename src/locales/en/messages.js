/* eslint-disable */ export default {
  languageData: {
    plurals: function(n, ord) {
      var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
      if (ord)
        return n10 == 1 && n100 != 11
          ? "one"
          : n10 == 2 && n100 != 12
          ? "two"
          : n10 == 3 && n100 != 13
          ? "few"
          : "other";
      return n == 1 && v0 ? "one" : "other";
    }
  },
  messages: {
    "<0>92%</0> of the global population live in places with unhealthy air quality":
      "<0>92%</0> of the global population live in places with unhealthy air quality",
    "Add filters": "Add filters",
    "Air pollution kills <0>3.7m</0> people per year worldwide":
      "Air pollution kills <0>3.7m</0> people per year worldwide",
    All: "All",
    Apply: "Apply",
    "Average <0>2 years of life</0> expectancy taken out of major European cities inhabitants":
      "Average <0>2 years of life</0> expectancy taken out of major European cities inhabitants",
    Charts: "Charts",
    "Clear all": "Clear all",
    Date: "Date",
    "Download as CSV": "Download as CSV",
    "End date": "End date",
    Export: "Export",
    "Find & understand": "Find & understand",
    Home: "Home",
    Locations: "Locations",
    "No data for this time frame occurred!":
      "No data for this time frame occurred!",
    "Nothing to download": "Nothing to download",
    "Per hour average": "Per hour average",
    Pollutant: "Pollutant",
    "Select sensor": "Select sensor",
    "Sorry, something went wrong...": "Sorry, something went wrong...",
    "Start date": "Start date",
    Table: "Table",
    Time: "Time",
    "Value [\xB5g/m\xB3]": "Value [\xB5g/m\xB3]",
    "We're compensating the lack of fine monitoring of air pollution and informing people about current and forthcoming state of air quality empowering them to live healthier lives and create more sustainable business.":
      "We're compensating the lack of fine monitoring of air pollution and informing people about current and forthcoming state of air quality empowering them to live healthier lives and create more sustainable business.",
    "what you\u2019re breathing": "what you\u2019re breathing",
    "{0}": function(a) {
      return [a("0")];
    }
  }
};
