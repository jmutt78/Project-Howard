import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Error from "../ErrorMessage";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import { Root } from "../Home";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const FormWrapper = styled.div`
  width: 500px;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
  padding: 56px 40px;

  .ant-form {
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .ant-row {
    position: relative;
    margin-left: 0;
    margin-right: 0;
    height: auto;
    zoom: 1;
    display: block;
    box-sizing: border-box;
  }

  .ant-form-item {
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 24px;
    vertical-align: top;
  }

  .ant-form-item-control {
    line-height: 39.9999px;
    position: relative;
    zoom: 1;
  }

  .forgot {
    float: right;
  }
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  h1 {
    margin-top: 0;
    margin-bottom: 0.5em;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
`;

export const CreateAccountWrapper = styled.div`
  margin-top: 36px;
  text-align: center;
  a {
    text-align: center;
    font-size: 18px;
  }
`;

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 50
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

export default () => {
  const [inputs, setInputs] = useState();

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  console.log(inputs);
  return (
    <Mutation mutation={SIGNUP_MUTATION} variables={inputs}>
      {(signup, { error, loading }) => (
        <Root>
          <FormWrapper>
            <Title>
              <h1>Sign Up Free!</h1>
            </Title>
            <Error error={error} />
            <Form
              name="basic"
              initialValues={{
                remember: true
              }}
              onFinish={async values => {
                setInputs(values);
                await signup();
              }}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!"
                  }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button
                  className="ant-btn ant-btn-primary ant-btn-lg ant-btn-block"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <Divider>or</Divider>
            <CreateAccountWrapper>
              <Link to="/">Already have an account? Sign in.</Link>
            </CreateAccountWrapper>
          </FormWrapper>
        </Root>
      )}
    </Mutation>
  );
};
