import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin: 0;
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4361ee;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-left: 15px;
  cursor: pointer;
`;

const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <PageTitle>{title}</PageTitle>
      <UserMenu>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <UserAvatar>MA</UserAvatar>
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;