import styled from "styled-components";

export const MenuDesktop = styled.div`
  background-color: var(--blue-400);
  height: 100%;
  width: 21vw;
  color: white;
`;

export const Logo = styled.img`
  width: 8rem;
  margin: 10px;

  @media (min-width: 1024px) {
    width: 8rem;
    margin: 1rem auto;
  }
`;
