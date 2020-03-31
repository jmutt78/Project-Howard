import React from "react";
import styled from "styled-components";

import Signin from "../../components/Auth/Signin";
import background from "../../assets/productiviy.jpg";

export const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  background-size: cover;
  background-image: url(${background});
`;

export default () => {
  return (
    <Root>
      <Signin />
    </Root>
  );
};
