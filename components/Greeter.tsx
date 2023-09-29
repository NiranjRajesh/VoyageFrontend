"use client";
import React from "react";
import FlightSearch from "./FlightSearch";
import Filter from "./Filter";
import Searchresult from "./Searchresult";
import { FilterProvider } from "../context/FilterContext";
import { SearchProvider, useSearch } from "@/context/SearchContext";
import { LoadingProvider, useLoading } from "@/context/loadingContext";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
const Greeter = () => {
  const { isLoading } = useLoading();

  return (
    <FilterProvider>
      <div className="greeter-container">
        <div className="greeter-l">
          <FlightSearch />

          {isLoading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            <>
              <div className="placeholder"></div>
              <Searchresult />
            </>
          )}
        </div>
        <div className="greeter-r">
          <Filter />
        </div>
      </div>
      \
    </FilterProvider>
  );
};

export default Greeter;
