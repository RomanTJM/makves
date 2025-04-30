import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
  uvZScore?: number;
  pvZScore?: number;
}

// Функция для расчета z-score
const calculateZScore = (value: number, mean: number, stdDev: number): number => {
  return (value - mean) / stdDev;
};

// Функция для расчета среднего значения
const calculateMean = (data: number[]): number => {
  return data.reduce((sum, val) => sum + val, 0) / data.length;
};

// Функция для расчета стандартного отклонения
const calculateStdDev = (data: number[], mean: number): number => {
  const squareDiffs = data.map(value => {
    const diff = value - mean;
    return diff * diff;
  });
  const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / squareDiffs.length;
  return Math.sqrt(avgSquareDiff);
};

const data: DataPoint[] = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

// Рассчитываем статистики для uv и pv
const uvValues = data.map(d => d.uv);
const pvValues = data.map(d => d.pv);

const uvMean = calculateMean(uvValues);
const pvMean = calculateMean(pvValues);
const uvStdDev = calculateStdDev(uvValues, uvMean);
const pvStdDev = calculateStdDev(pvValues, pvMean);

// Добавляем z-scores к данным
const dataWithZScores: DataPoint[] = data.map(d => ({
  ...d,
  uvZScore: calculateZScore(d.uv, uvMean, uvStdDev),
  pvZScore: calculateZScore(d.pv, pvMean, pvStdDev),
}));

const ZScoreLineChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={dataWithZScores}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#82ca9d"
          strokeWidth={2}
          dot={(props: any) => {
            const { cx, cy, payload } = props;
            const color = Math.abs(payload.uvZScore) > 1 ? '#ff0000' : '#82ca9d';
            return (
              <circle
                key={`uv-dot-${payload.name}`}
                cx={cx}
                cy={cy}
                r={4}
                fill={color}
                stroke={color}
              />
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          strokeWidth={2}
          dot={(props: any) => {
            const { cx, cy, payload } = props;
            const color = Math.abs(payload.pvZScore) > 1 ? '#ff0000' : '#8884d8';
            return (
              <circle
                key={`pv-dot-${payload.name}`}
                cx={cx}
                cy={cy}
                r={4}
                fill={color}
                stroke={color}
              />
            );
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ZScoreLineChart; 