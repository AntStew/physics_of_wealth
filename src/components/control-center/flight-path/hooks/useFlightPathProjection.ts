import { useMemo } from "react";
import { EngineType } from "@/lib/types";
import { calculateVolatileProjection } from "@/lib/calculations";
import { MAX_PROJECTION_YEARS } from "../constants";

interface UseFlightPathProjectionParams {
  initialInvestment: number;
  monthlyInvestment: number;
  engineType: EngineType;
  desiredGoal: number;
}

export function useFlightPathProjection({
  initialInvestment,
  monthlyInvestment,
  engineType,
  desiredGoal,
}: UseFlightPathProjectionParams) {
  const projection = useMemo(() => {
    return calculateVolatileProjection(
      initialInvestment,
      monthlyInvestment,
      engineType,
      desiredGoal,
      MAX_PROJECTION_YEARS
    );
  }, [initialInvestment, monthlyInvestment, engineType, desiredGoal]);

  // Format data for chart - show monthly data but sample for readability
  const chartData = useMemo(() => {
    const sampleRate = Math.max(1, Math.floor(projection.timeline.length / 200)); // Show max 200 points
    return projection.timeline
      .filter((_, index) => index % sampleRate === 0 || index === projection.timeline.length - 1)
      .map((entry) => ({
        date: new Date(entry.date).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        "Portfolio Value": Math.round(entry.actualWealth),
        "Goal": desiredGoal,
      }));
  }, [projection.timeline, desiredGoal]);

  return {
    projection,
    chartData,
  };
}

