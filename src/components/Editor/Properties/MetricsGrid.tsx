import { NumberInput, SectionHeading, SelectInput, TextInput } from "@/lib/ui";

import { StatCardData } from "@/lib/types";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  handleChange: (key: string, value: unknown) => void;
}

export default function MetricsGrid({ data, handleChange }: Props) {
  const metrics = (data.metrics as StatCardData[]) || [];

  const updateMetric = (
    index: number,
    field: keyof StatCardData,
    value: any,
  ) => {
    const newMetrics = [...metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    handleChange("metrics", newMetrics);
  };

  const removeMetric = (index: number) => {
    const newMetrics = [...metrics];
    newMetrics.splice(index, 1);
    handleChange("metrics", newMetrics);
  };

  const addMetric = () => {
    const newMetric: StatCardData = {
      id: Math.random().toString(),
      layoutType: "standard",
      title: "NEW METRIC",
      value: "100",
      subtext: "Metric description",
    };
    handleChange("metrics", [...metrics, newMetric]);
  };

  return (
    <div className="space-y-4">
      <SectionHeading>Metrics Grid</SectionHeading>
      <NumberInput
        label="Number of Columns (lg)"
        value={data.columns || 4}
        onChange={(v) => handleChange("columns", v)}
        min={1}
        max={6}
      />
      <SectionHeading>Cards Data</SectionHeading>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100"
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">
              Metric {index + 1}
            </span>
            <button
              onClick={() => removeMetric(index)}
              className="text-xs text-red-400 hover:text-red-600"
            >
              Remove
            </button>
          </div>
          <SelectInput
            label="Layout Type"
            value={metric.layoutType}
            onChange={(v) => updateMetric(index, "layoutType", v)}
            options={[
              { value: "standard", label: "Standard" },
              { value: "highlight", label: "Highlight" },
            ]}
          />
          <TextInput
            label="Title"
            value={metric.title}
            onChange={(v) => updateMetric(index, "title", v)}
          />
          <TextInput
            label="Value"
            value={metric.value}
            onChange={(v) => updateMetric(index, "value", v)}
          />
          <TextInput
            label="Subtext"
            value={metric.subtext}
            onChange={(v) => updateMetric(index, "subtext", v)}
          />
          {metric.layoutType === "highlight" && (
            <NumberInput
              label="Progress (%)"
              value={metric.progressPercentage || 0}
              onChange={(v) => updateMetric(index, "progressPercentage", v)}
              min={0}
              max={100}
            />
          )}
        </div>
      ))}
      <button
        onClick={addMetric}
        className="w-full py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
      >
        + Add Metric Card
      </button>
    </div>
  );
}
