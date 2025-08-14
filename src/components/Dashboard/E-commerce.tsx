"use client";
import React from "react";
import ChatCard from "../Chat/ChatCard";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import TableOrder from "../Tables/TableOrder";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />

      <div className="mt-4  md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        {/*<ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />*/}
        <div className="col-span-12 xl:col-span-8 pb-4">
          <TableOrder />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
