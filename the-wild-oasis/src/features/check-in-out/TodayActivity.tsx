import styled from "styled-components";

import { HeadingH2 } from "@/ui/Heading";
import Row from "@/ui/Row";
import ErrorFallback from "@/ui/ErrorFallback";
import Spinner from "@/ui/Spinner";
import { useTodayActivityQuery } from "./checkinQueries";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
  /* Box */
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.md};

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { data: activities, isLoading, error } = useTodayActivityQuery();

  if (error)
    return (
      <ErrorFallback errorMessage={error.message} errorName={error.name} />
    );
  return (
    <StyledToday>
      <Row $direction="row">
        <HeadingH2>Today</HeadingH2>
      </Row>

      {!isLoading ? (
        activities && activities.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem key={activity.id} {...activity} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activite today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
