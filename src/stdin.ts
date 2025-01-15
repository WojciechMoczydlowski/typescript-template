import * as fs from "fs";
import * as path from "path";

export const readLineSync = (prompt: string): string => {
  // Display the prompt message
  if (prompt) {
    process.stdout.write(prompt);
  }

  process.stdout.write(prompt);

  // Save the current state of stdin and set it to blocking mode
  const fd = fs.openSync("/dev/stdin", "rs");
  const buffer = Buffer.alloc(1024); // Allocate a buffer for reading

  // Read synchronously from stdin
  const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);
  fs.closeSync(fd); // Close stdin to release resources

  // Convert the buffer to a string and trim extra whitespace
  return buffer.toString("utf8", 0, bytesRead).trim();
};

export const writeSync = (message: string, newLine: boolean = true): void => {
  process.stdout.write(message + (newLine ? "\n" : ""));
};

export const readFromCsv = (filePath: string): Record<string, string>[] => {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, "utf8");

  // Split the content into lines
  const [headerLine, ...lines] = content
    .split("\n")
    .filter((line) => line.trim() !== "");

  // Parse the header row to get column names
  const headers = headerLine?.split(",").map((header) => header.trim());

  // Parse each line into an object using the headers
  return lines.map((line) => {
    const values = line.split(",").map((value) => value.trim());
    return (headers as string[]).reduce<Record<string, string>>(
      (obj, header, index) => {
        obj[header] = values[index] || "";
        return obj;
      },
      {}
    );
  });
};
