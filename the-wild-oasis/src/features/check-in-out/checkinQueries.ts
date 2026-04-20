import { getStaysTodayActivity } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivityQuery() {
  return useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
}
