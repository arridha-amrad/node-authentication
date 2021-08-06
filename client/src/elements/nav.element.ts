import styled from "styled-components";

export const Navbar = styled.nav`
  width: 100vw;
  min-width: 100%;
  height: 60px;
  background: #eee;
  display: flex;
  padding: 10px 4rem;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    padding: 10px 1rem;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 0;
    height: 50px;
    flex-direction: column;
  }
`;

export const NavTitle = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  height: inherit;
  flex-basis: 100%;
  h1 {
    font-weight: 400;
    font-size: 1.8rem;
    font-family: "Sofia", cursive;
  }

  @media screen and (max-width: 700px) {
    justify-content: start;
    flex-basis: 70%;
    h1 {
      font-size: 1.6rem;
      margin-left: 1rem;
    }
    min-height: 50px;
  }
`;

export const NavActions = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-basis: 100%;
  height: inherit;
  justify-content: center;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  height: inherit;
  flex-basis: 100%;

  @media screen and (max-width: 1000px) {
    position: relative;
  }

  @media screen and (max-width: 500px) {
    width: 100vw;
    justify-content: center;
  }
`;

export const NavIcon = styled.img`
  width: 23px;

  @media screen and (max-width: 500px) {
    width: 25px;
  }
`;

export const IconButton = styled.button`
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 50%;
  position: relative;
  justify-content: center;
  margin-right: 10px;
  /* border: 1px solid #333; */

  &:hover {
    background: #ddd;
    border-radius: 50%;
    transition: all ease-in 0.3s;

    .tp {
      visibility: visible;
    }
  }
`;

export const IconButtonSearch = styled.button`
  outline: none;
  visibility: hidden;
  @media screen and (max-width: 1000px) {
    visibility: visible;
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 10px 12px;
    border-radius: 50%;
    &:hover {
      background: #ddd;
      border-radius: 50%;
      transition: all ease-in 0.3s;

      .tp {
        visibility: visible;
      }
    }
  }
`;

export const CollapsedSearchIcon = styled.img`
  position: absolute;
  top: 27px;
  left: 6px;
  width: 26px;

  @media screen and (max-width: 500px) {
    top: 10px;
    left: 12px;
  }
`;

export const Tooltip = styled.span`
  visibility: hidden;
  background: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  font-size: 0.7rem;
  letter-spacing: 1.1px;
  //-------
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 120%);
`;

export const NavMenuMax500 = styled.div`
  visibility: hidden;
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 70px;
  background-color: #f3e5f5;
  @media screen and (max-width: 500px) {
    visibility: visible;
    display: flex;
  }
`;

export const SearchFieldMax500 = styled.div`
  display: none;

  @media screen and (max-width: 500px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100vw;
    position: relative;
  }
`;

export const SearchFieldMax1000 = styled.div`
  visibility: hidden;
  display: none;

  @media screen and (max-width: 1000px) {
    display: block;
    visibility: visible;
    position: absolute;
    top: 6px;
    left: 0;
    height: inherit;
    width: 100%;
  }

  @media screen and (max-width: 500px) {
    top: 0px;
  }
`;
