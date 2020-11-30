import React from "react";
import { Trans } from "@lingui/macro";

const PM2_5_DESC =
  "Airborne particulate matter varies widely in its physical and chemical composition, source and particle size. PM10 particles (the fraction of particulates in air of very small size (<10 µm)) and PM2.5 particles (<2.5 µm) are of major current concern, as they are small enough to penetrate deep into the lungs and so potentially pose significant health risks. Larger particles meanwhile, are not readily inhaled, and are removed relatively efficiently from the air by sedimentation. The principal source of airborne PM10 and PM2.5 matter in European cities is road traffic emissions, particularly from diesel vehicles. The limit values are very often exceeded in European cities.";
const O3_DESC =
  "Ground-level ozone (O3), unlike other pollutants mentioned, is not emitted directly into the atmosphere, but is a secondary pollutant produced by reaction between nitrogen dioxide (NO2), hydrocarbons and sunlight. Ozone levels are not as high in urban areas (where high levels of NO are emitted from vehicles) as in rural areas. Sunlight provides the energy to initiate ozone formation; consequently, high levels of ozone are generally observed during hot, still sunny, summertime weather.";
const NOX_DESC =
  "NOX is a term used to describe a mixture of nitric oxide (NO) and nitrogen dioxide (NO2). They are inorganic gases formed by combination of oxygen with nitrogen from the air. NO is produced in much greater quantities than NO2, but oxidises to NO2 in the atmosphere. NO2 causes detrimental effects to the bronchial system. Nitrogen dioxide concentrations frequently approach, and sometimes exceed air quality standards in many European cities. NOx is emitted when fuel is being burned e.g. in transport, industrial processes and power generation.";
const CO_DESC =
  "CO is an odourless, tasteless and colourless gas produced by the incomplete burning of materials which contain carbon, including most transport fuels. CO is toxic, acting by reaction with haemoglobin and reducing its capacity for oxygen transport in the blood. Even in busy urban centres, CO concentrations rarely exceed health related standards.";
const SO2_DESC =
  "Fossil fuels contain traces of sulphur compounds, and SO2 is produced when they are burnt. The majority of the SO2 emitted to the air is from power generation, and the contribution from transport sources is small (shipping being an exception). Exposure to SO2 can damage health by its action on the bronchial system. Sulphuric acid generated from atmospheric reactions of SO2 is the main constituent of acid rain, and ammonium sulphate particles are the most abundant secondary particles found in air.";

export const POLLUTANTS_DESCRIPTIONS = {
  PM2_5: <Trans>{PM2_5_DESC}</Trans>,
  PM10: <Trans>{PM2_5_DESC}</Trans>,
  O3: <Trans>{O3_DESC}</Trans>,
  NO2: <Trans>{NOX_DESC}</Trans>,
  CO: <Trans>{CO_DESC}</Trans>,
  SO2: <Trans>{SO2_DESC}</Trans>
};

const PM2_5_TITLE = "Particulate matter";
const O3_TITLE = "Ozone";
const NO2_TITLE = "Nitrogen oxides";
const CO_TITLE = "Carbon monoxide";
const SO2_TITLE = "Sulphur dioxide";

export const POLLUTANTS_TITLES = {
  PM2_5: <Trans>{PM2_5_TITLE}</Trans>,
  PM10: <Trans>{PM2_5_TITLE}</Trans>,
  O3: <Trans>{O3_TITLE}</Trans>,
  NO2: <Trans>{NO2_TITLE}</Trans>,
  CO: <Trans>{CO_TITLE}</Trans>,
  SO2: <Trans>{SO2_TITLE}</Trans>
};

export const pollutantTitle = (pollutant: string) => (
  <span>
    {(POLLUTANTS_TITLES as any)[pollutant]} ({pollutant})
  </span>
);
