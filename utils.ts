require("dotenv").config();
import fs from "fs";

const sessionCookie = process.env.SESSION_COOKIE;

export const getInput = async (day: number, url?: string) => {
  if (!sessionCookie) {
    throw new Error("Session cookie is required for fetching inputs");
  }

  const fileName = `./inputs/${day}.txt`;

  if (fs.existsSync(fileName)) {
    return fs.promises.readFile(fileName, { encoding: "utf-8" });
  }

  const fetchUrl = url ?? `https://adventofcode.com/2023/day/${day}/input`;

  const headers = new Headers();
  headers.append("cookie", `session=${sessionCookie}`);

  const data = await fetch(fetchUrl, {
    headers,
  }).then((res) => res.text());

  await fs.promises.writeFile(fileName, data);
  return data;
};

export const lineInput = async (day: number, url?: string) =>
  getInput(day, url).then((data) => data.trim().split("\n"));
