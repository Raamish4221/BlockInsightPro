import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Bar, Line } from 'recharts'

interface ChartProps {
  data: Array<{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p>Time: {data.time}</p>
        <p>Open: {data.open}</p>
        <p>High: {data.high}</p>
        <p>Low: {data.low}</p>
        <p>Close: {data.close}</p>
        <p>Volume: {data.volume}</p>
      </div>
    )
  }
  return null
}

export default function DynamicChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <XAxis dataKey="time" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#323232" />
        <Bar
          dataKey="volume"
          fill="#3f3f3f"
          opacity={0.5}
          yAxisId={1}
        />
        <Bar
          dataKey="high"
          fill="transparent"
          stroke="#22c55e"
        />
        <Bar
          dataKey="low"
          fill="transparent"
          stroke="#ef4444"
        />
        <Line
          type="monotone"
          dataKey="close"
          stroke="#3b82f6"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

