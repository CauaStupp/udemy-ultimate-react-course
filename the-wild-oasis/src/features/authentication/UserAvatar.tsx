import SpinnerMini from "@/ui/SpinnerMini";
import styled from "styled-components";
import { useUserLoggedQuery } from "./useAuthQueries";
import defaultUser from "@/assets/default-user.jpg";
import { Link } from "react-router";

const StyledUserAvatar = styled(Link)`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.grey[600]};
`;

const Avatar = styled.img`
  display: block;
  width: max-content;
  max-width: 4rem;
  height: max-content;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 999px;
  outline: 2px solid ${(props) => props.theme.colors.grey[100]};
`;

function UserAvatar() {
  const { user, isLoading } = useUserLoggedQuery();
  const { avatar, full_name } = user?.user_metadata as {
    full_name: string;
    avatar: string;
  };

  return (
    <StyledUserAvatar to="/account">
      {isLoading ? (
        <SpinnerMini />
      ) : (
        <Avatar src={avatar || defaultUser} alt={`Avatar of ${full_name}`} />
      )}
      <span>{full_name}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;
