#!/usr/bin/env node
// NOTE: You can remove the first line if you don't plan to release an
// executable package. E.g. code that can be used as cli like prettier or eslint

import { readLineSync, readFromCsv } from "./stdin";

const main = () => {
  const lines = readFromCsv(
    "./machine-readable-business-employment-data-sep-2024-quarter.csv"
  );

  console.log(lines[0], lines[1]);
};

main();
