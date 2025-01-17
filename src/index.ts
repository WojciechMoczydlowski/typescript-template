#!/usr/bin/env node
// NOTE: You can remove the first line if you don't plan to release an
// executable package. E.g. code that can be used as cli like prettier or eslint

import { readFromTxt, writeToTxt } from "./stdin";

const main = () => {
  writeToTxt("./data.txt", "Hello world");
  const data = readFromTxt("./data.txt");

  console.log(data);

  // const data = readJsonFileSync<{
  //   glossary: [
  //     {
  //       title: string;
  //       description: string;
  //     },
  //   ];
  // }>("./data.json");
  // data.glossary.push({
  //   title: "example glossary",
  //   description: "A simple glossary for reference 2.",
  // });
  // writeJsonFileSync("./data.json", data);
};

main();
