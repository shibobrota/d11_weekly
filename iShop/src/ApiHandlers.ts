import axios from "axios";
import { Collection } from "./types";

export const apiKeys = {
  GET_ALL_DATA: "get-all-data",
};

const BASE_URL = "https://api.opensea.io/api/v1/collections";

export const getAllData = ({ start, end }: { start: number; end: number }) => {
  const url = BASE_URL + "?offset=" + start + "&limit=" + end;
  // console.log(url);
  return axios.get<{ collections: Collection[] }>(url);
};
