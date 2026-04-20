import type { BookingType } from "@/@types/bookingsType";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { HeadingH2 } from "@/ui/Heading";
import {
  Legend,
  Pie,
  PieChart,
  Sector,
  type PieSectorShapeProps,
} from "recharts";
import styled from "styled-components";

const ChartBox = styled.div`
  /* Box */
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.md};

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  width: 100%;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

type DurationData = {
  duration: string;
  value: number;
  fill: string;
};

const startDataLight: DurationData[] = [
  {
    duration: "1 night",
    value: 0,
    fill: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 5,
    fill: "#f97316",
  },
  {
    duration: "3 nights",
    value: 3,
    fill: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 7,
    fill: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 2,
    fill: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    fill: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 6,
    fill: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    fill: "#a855f7",
  },
];

const startDataDark: DurationData[] = [
  {
    duration: "1 night",
    value: 0,
    fill: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    fill: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    fill: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    fill: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    fill: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    fill: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    fill: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    fill: "#7e22ce",
  },
];

function prepareData(startData: DurationData[], stays: BookingType[]) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr: DurationData[], field: string): DurationData[] {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.nights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

const MyCustomPie = (props: PieSectorShapeProps) => {
  return <Sector {...props} fill={props.fill} />;
};

type DurationChartProps = {
  confirmedStays: BookingType[];
};

function DurationChart({ confirmedStays }: DurationChartProps) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <HeadingH2>Stay duration summary</HeadingH2>
      <PieChart responsive style={{ width: "100%", height: 240 }}>
        <Pie
          data={data}
          nameKey="duration"
          dataKey="value"
          isAnimationActive
          innerRadius={85}
          outerRadius={110}
          cx="40%"
          cy="50%"
          paddingAngle={3}
          style={{
            width: "100%",
            aspectRatio: 1,
          }}
          shape={MyCustomPie}
        />

        <Legend
          verticalAlign="middle"
          align="right"
          width="30%"
          layout="vertical"
          iconSize={15}
          iconType="circle"
        />
      </PieChart>
    </ChartBox>
  );
}

export default DurationChart;
