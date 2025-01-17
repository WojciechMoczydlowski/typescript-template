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

export async function readJsonFile<T>(filePath: string): Promise<T> {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = await fs.readFile(absolutePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
}

export async function writeJsonFile<T>(
  filePath: string,
  data: T
): Promise<void> {
  try {
    const absolutePath = path.resolve(filePath);
    const jsonContent = JSON.stringify(data, null, 2); // Pretty-print with 2 spaces
    await fs.writeFile(absolutePath, jsonContent, "utf-8");
  } catch (error) {
    console.error(`Error writing JSON file at ${filePath}:`, error);
    throw error;
  }
}

export function readJsonFileSync<T>(filePath: string): T {
  try {
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (error) {
    console.error(`Error reading JSON file at ${filePath}:`, error);
    throw error;
  }
}

export function writeJsonFileSync<T>(filePath: string, data: T): void {
  try {
    const absolutePath = path.resolve(filePath);
    const jsonContent = JSON.stringify(data, null, 2); // Pretty-print with 2 spaces
    fs.writeFileSync(absolutePath, jsonContent, "utf-8");
  } catch (error) {
    console.error(`Error writing JSON file at ${filePath}:`, error);
    throw error;
  }
}

export function readFromTxt(fileName: string) {
  const absolutePath = path.resolve(fileName);

  try {
    // Read the file content synchronously
    return fs.readFileSync(absolutePath, "utf-8");
  } catch (err) {
    console.error("Error reading the file:", err);
    throw err; // Re-throw the error for further handling if needed
  }
}

export function writeToTxt(fileName: string, content: string) {
  const absolutePath = path.resolve(fileName);

  try {
    // Write the content to the file synchronously
    fs.writeFileSync(absolutePath, content, "utf-8");
    console.log(`Content written to ${fileName} successfully.`);
  } catch (err) {
    console.error("Error writing to the file:", err);
    throw err; // Re-throw the error for further handling if needed
  }
}
