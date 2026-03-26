// We define the expected shape of the data prop
export interface StatCardData {
  id: string;
  layoutType: "standard" | "highlight";
  title: string;
  value: string;
  subtext: string;
  badge?: { text: string; variant: "default" | "alert" };
  progressPercentage?: number;
}

export interface StatCardsBlockProps {
  metrics: StatCardData[];
}

export default function StatCardsBlock({ metrics }: StatCardsBlockProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 my-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={`p-6 rounded-xl shadow-sm border flex flex-col justify-between ${
            metric.layoutType === "highlight"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-slate-900 border-slate-100"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className={`text-xs font-semibold uppercase tracking-wider ${
                metric.layoutType === "highlight"
                  ? "text-blue-100"
                  : "text-slate-500"
              }`}
            >
              {metric.title}
            </h3>
            {metric.badge && metric.layoutType !== "highlight" && (
              <span
                className={`px-2 py-1 rounded text-xs font-bold ${
                  metric.badge.variant === "alert"
                    ? "bg-red-50 text-red-600"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {metric.badge.text}
              </span>
            )}
          </div>

          <div>
            <div className="text-4xl font-bold mb-1">{metric.value}</div>

            {metric.layoutType === "highlight" &&
              metric.progressPercentage !== undefined && (
                <div className="w-full bg-blue-700 rounded-full h-1.5 my-3 overflow-hidden">
                  <div
                    className="bg-white h-1.5 rounded-full"
                    style={{ width: `${metric.progressPercentage}%` }}
                  />
                </div>
              )}

            <div
              className={`text-sm ${
                metric.layoutType === "highlight"
                  ? "text-blue-100"
                  : "text-slate-500"
              }`}
            >
              {metric.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
