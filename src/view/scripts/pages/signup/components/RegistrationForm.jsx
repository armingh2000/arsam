import React, {useState} from 'react';
import {sendSignupPost} from "../../../../../core/login-signup/signupRequest";
import {Form, Input, Button, Typography} from 'antd';
import {useHistory} from 'react-router-dom';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const [failureMessage, setFailureMessage] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isVerified, setIsVerified] = useState(null);
  const {Text} = Typography;

  const history = useHistory();

  const onFailure = (error) => {
    setFailureMessage("username used");
    setIsFailed(true);
  };

  const onSuccess = (data) => {
    localStorage.setItem("userToken", data.data.token);
    setIsVerified(false);
    setVerificationMessage("Please confirm your Email!");
  };

  const onFinish = (values) => {
    sendSignupPost({"EmailAddress": values.email, "Password": values.password, "PasswordConfirmation": values.confirm}).then(onSuccess).catch(onFailure);
  };

  return (
<div className="box">

    <Form {...formItemLayout} form={form} name="register"
    className="signup-form"
    onFinish={onFinish} scrollToFirstError="scrollToFirstError">

    <span className="text-center">signup</span>

    <Form.Item hidden={!isFailed || !isVerified}>
      <Text type="danger">{!isFailed && failureMessage}</Text>
      <Text type="success">{!isVerified && verificationMessage}</Text>
    </Form.Item>

    <div className="input-container">
      <Form.Item name="email" label="E-mail" rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          }, {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}>
        <Input/>
      </Form.Item>
    </div>

    <div className="input-container">
      <Form.Item name="password" label="Password" rules={[
          {
            required: true,
            message: 'Please input your password!'
          }, {
            min: 3,
            message: 'Password must be at least in length of 3!'
          }
        ]} hasFeedback="hasFeedback">
        <Input.Password/>
      </Form.Item>
    </div>

    <div className="input-container">
      <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback="hasFeedback" rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({getFieldValue}) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            }
          })
        ]}>
        <Input.Password/>
      </Form.Item>
    </div>

    {
      // TODO: recaptcha
      // <Form.Item label="Captcha" extra="We must make sure that your are a human.">
      //   <Row gutter={8}>
      //     <Col span={12}>
      //       <Form.Item name="captcha" noStyle="noStyle" rules={[{
      //             required: true,
      //             message: 'Please input the captcha you got!'
      //           }
      //         ]}>
      //         <Input/>
      //       </Form.Item>
      //     </Col>
      //     <Col span={12}>
      //       <Button>Get captcha</Button>
      //     </Col>
      //   </Row>
      // </Form.Item>
    }

    <Form.Item >
      <div className="container">
        <Button type="primary" htmlType="submit" className="signup-form-button btn">
        <svg width="277" height="62">
          <defs>
            <linearGradient id="grad1">
              <stop offset="0%" stop-color="#5adc9f" />
              <stop offset="100%" stop-color="#71eaf5" />
            </linearGradient>
          </defs>
          <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="266" height="50"></rect>
        </svg>
        <span>Register</span>
        </Button>
      </div>
    </Form.Item>
  </Form>
</div>);
};

export default RegistrationForm;
