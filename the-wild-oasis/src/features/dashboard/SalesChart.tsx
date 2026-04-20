import { HeadingH2 } from "@/ui/Heading";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { FadeIn } from "@/styles/animations";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import type { BookingAfterDate } from "@/@types/bookingsType";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  width: 100%;
  height: max-content;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: ${(props) => props.theme.colors.grey[300]};
  }
`;

type SalesChartProps = {
  bookings: BookingAfterDate[];
  numDays: number;
};

function SalesChart({ bookings, numDays }: SalesChartProps) {
  const { isDarkMode } = useDarkMode();
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((a, b) => a + b.total_price, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((a, b) => a + b.extra_price, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <FadeIn>
        <HeadingH2>
          Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
          {format(allDates.at(-1)!, "MMM dd yyyy")}
        </HeadingH2>

        <AreaChart
          data={data}
          style={{
            width: "100%",
            maxHeight: "300px",
            aspectRatio: 1.618,
            marginTop: "2rem",
          }}
          responsive
          onContextMenu={(_, e) => e.preventDefault()}
        >
          <XAxis
            dataKey="label"
            niceTicks="snap125"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            width="auto"
            unit="$"
            niceTicks="snap125"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid
            strokeDasharray="4"
            style={{ background: colors.background }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            strokeWidth={2}
            name="Total sales"
            stackId="1"
            unit="$"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
          />
          <Area
            dataKey="extrasSales"
            stackId="2"
            type="monotone"
            strokeWidth={2}
            name="Extra sales"
            unit="$"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
          />
        </AreaChart>
      </FadeIn>
    </StyledSalesChart>
  );
}

export default SalesChart;
