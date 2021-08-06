import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 100px);
  width: 100vw;

  @media screen and (max-width: 500px) {
    overflow-y: scroll;
    padding: 10px 0;
    min-height: 100vh;
  }
`;

export const Form = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid #eee;
  padding: 1rem;
  background: #fff;
  border-radius: 15px;
  box-shadow: 1px 1px 20px 1px rgba(205, 146, 216, 0.47);

  @media screen and (max-width: 500px) {
    width: calc(100% - 50px);
  }
`;

export const FormFooter = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100px;
  width: 100vw;
  background: #efefef;
  margin-top: "1rem";

  @media screen and (max-width: 500px) {
    display: none;
  }

  @media screen and (max-height: 655px) {
    display: none;
  }
`;

export const FormLink = styled.div`
  text-align: center;
  font-size: 0.8rem;
  margin: 0.7rem 0;
`;

export const FormTitle = styled.h1`
  font-family: "Sofia", cursive;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;

  @media screen and (max-width: 500px) {
    font-size: 2rem;
  }
`;
