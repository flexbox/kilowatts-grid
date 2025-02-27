import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
} from "@reduxjs/toolkit/query/react";
import * as historicEmbeddedWindAndSolarForecast from "./historic-embedded-wind-and-solar-forecast";
import { parseCSV } from "./csv";

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (p) => {
  const url = `https://demandforecast.nationalgrid.com${p.toString()}`;
  const result = await fetch(url, {
    method: "GET",
  });
  const text = await result.text();
  const json = parseCSV(text);
  return { data: json };
};

export const nationalGridDemandForeastApi = createApi({
  reducerPath: "nationalGridDemandForeastApi",
  baseQuery,
  endpoints: (builder) => ({
    historicEmbeddedWindAndSolarForecast: builder.query({
      query: historicEmbeddedWindAndSolarForecast.query,
      transformResponse: historicEmbeddedWindAndSolarForecast.transformResponse,
      keepUnusedDataFor: 525600,
    }),
  }),
});

export const { useHistoricEmbeddedWindAndSolarForecastQuery } =
  nationalGridDemandForeastApi;
