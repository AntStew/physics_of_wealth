import { Target, DollarSign, TrendingUp, Wallet } from "lucide-react";
import { VolatileProjectionData } from "@/lib/calculations";

interface ProjectionMetricsProps {
  projection: VolatileProjectionData;
}

export function ProjectionMetrics({ projection }: ProjectionMetricsProps) {
  // Calculate money invested (initial + all monthly contributions over 50 years)
  const totalMonths = 50 * 12; // 50 years
  const moneyInvested = projection.initialInvestment + (projection.monthlyInvestment * totalMonths);
  
  // Calculate income gained (total value - money invested)
  const incomeGained = projection.finalValue - moneyInvested;
  
  // Calculate monthly growth percentage
  // Using compound growth formula: monthly_growth = ((finalValue / moneyInvested) ^ (1/totalMonths)) - 1
  const totalReturn = moneyInvested > 0 ? (projection.finalValue / moneyInvested) : 1;
  const monthlyGrowth = totalReturn > 0 
    ? ((Math.pow(totalReturn, 1 / totalMonths) - 1) * 100).toFixed(2)
    : "0.00";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {/* Time to Goal */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Time to Goal
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          {projection.yearsToGoal !== null 
            ? `${projection.yearsToGoal.toFixed(1)}`
            : "50+"}
          <span className="text-lg text-cyan-300/70 ml-1">yrs</span>
        </div>
        {projection.yearsToGoal !== null && (
          <div className="text-xs text-cyan-300/60">
            {new Date(
              new Date().setFullYear(new Date().getFullYear() + Math.ceil(projection.yearsToGoal))
            ).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </div>
        )}
      </div>

      {/* Money Invested */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <Wallet className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Money Invested
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          ${(moneyInvested / 1000).toFixed(0)}k
        </div>
        <div className="text-xs text-cyan-300/60">
          ${moneyInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
      </div>

      {/* Income Gained */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Income Gained
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          ${(incomeGained / 1000).toFixed(0)}k
        </div>
        <div className="text-xs text-cyan-300/60">
          {monthlyGrowth}% monthly growth
        </div>
      </div>

      {/* Total Value */}
      <div className="bg-black/40 border border-cyan-500/30 text-cyan-300 rounded-lg p-5 backdrop-blur-sm shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
            <DollarSign className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400/70">
            Total Value
          </h3>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-cyan-300 mb-1">
          ${(projection.finalValue / 1000).toFixed(0)}k
        </div>
        <div className="text-xs text-cyan-300/60">
          After 50 years
        </div>
      </div>
    </div>
  );
}

