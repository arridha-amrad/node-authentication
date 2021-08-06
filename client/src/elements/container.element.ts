import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  height: 100%;
  max-width: 1100px;
  background: #aaa;

  @media screen and (max-width: 1100px) {
    max-width: 800px;
  }

  @media screen and (max-width: 800px) {
    max-width: 600px;
  }
  @media screen and (max-width: 600px) {
    max-width: 400px;
  }
`;
