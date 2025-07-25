// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client";

import React, {useCallback, useMemo, useState} from "react";

import StatsCard from "@/components/dashboard/statCard";
import BusTableRow from "@/components/dashboard/BusTableRow";
import {Bus, BusStats} from "@/types/type";
import Topsection from "@/components/dashboard/topsection";
import AddBusForm from "@/components/dialogs/addBus";
import {Bus as MyBus} from "@/lib/types";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select";
import {useBuses} from "@/hooks/useBuses";

const BusManagementDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | Bus["status"]>(
    "All"
  );

  const [stats] = useState<BusStats>({
    totalBuses: 150,
    activeBuses: 65,
    inMaintenance: 35,
    availableBuses: 50,
  });

  const tableHeads = ["Bus-number", "Status", "Actions"];

  const {data: buses, isLoading} = useBuses();

  const selectedBus = useMemo(() => buses[0], [buses]);

  const handleEditBus = useCallback((bus: MyBus) => {
    console.log("Edit bus:", bus);
  }, []);

  const handleDeleteBus = useCallback((busId: string) => {
    console.log("Delete bus:", busId);
  }, []);

  return (
    <div>
      <Topsection />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Buses"
            value={stats.totalBuses}
            description="Full fleet size for operations"
            color="green"
          />
          <StatsCard
            title="Active Buses"
            value={stats.activeBuses}
            description="Buses currently in service"
            color="blue"
          />
          <StatsCard
            title="In Maintenance"
            value={stats.inMaintenance}
            description="Buses in repair or check-up"
            color="orange"
          />
          <StatsCard
            title="Available Buses"
            value={stats.availableBuses}
            description="Ready for schedule assignment"
            color="teal"
          />
        </div>

        <div className="grid grid-cols-1  gap-6">
          <div >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Bus List
                </h2>
                <p className="text-sm text-gray-500">
                  Showing {buses.length} of {buses.length} buses
                </p>
              </div>
              <div className="flex gap-3">
                <AddBusForm />


                <Select
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onValueChange={(val) => setActiveFilter(val as any)}>
                  <SelectTrigger className="w-full  border border-green-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent className="border border-gray-300">
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Retired">Retired</SelectItem>
                    <SelectItem value="In Maintenance">In Maintenance</SelectItem>
                    <SelectItem value="Available">Available</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      {tableHeads.map((head, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {buses.map((bus, index) => (
                      <BusTableRow
                        key={bus.id}
                        bus={bus}
                        index={index}
                        onEdit={handleEditBus}
                        onDelete={handleDeleteBus}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/*<div className="lg:col-span-1">*/}
          {/*  <BusDetailsCard*/}
          {/*    bus={selectedBus}*/}
          {/*    totalSeats={50}*/}
          {/*    availableSeats={8}*/}
          {/*    route={{*/}
          {/*      from: "Kigali",*/}
          {/*      to: "Uganda",*/}
          {/*      departure: "10:00 am",*/}
          {/*      arrival: "12:00 am",*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default BusManagementDashboard;