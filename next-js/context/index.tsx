"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import useSWR from "swr";
import { ApiResponse } from "../app/utils/interfaces";
import Loading from "@/app/components/shared/Loading";

interface ContextType {
  reportIdContext: string;
  setReportIdContext: (id: string) => void;
  selectReportContext: number;
  setSelectReportContext: (item: number) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const { data, error, isLoading } = useSWR<ApiResponse>("/api/index", fetcher);

  const [reportIdContext, setReportIdContext] = useState("");
  const [selectReportContext, setSelectReportContext] = useState(0);

  useEffect(() => {
    if (data?.indexData[0]?.reportId) {
      setReportIdContext(data.indexData[0].reportId);
    }
  }, [data]);

  if (error) {
    return <div>Failed to load</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AppContext.Provider
      value={{
        reportIdContext,
        setReportIdContext,
        selectReportContext,
        setSelectReportContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppWrapper");
  }
  return context;
}
