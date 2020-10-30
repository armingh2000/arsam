import React from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button
} from 'antd';

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

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (<Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError="scrollToFirstError">
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

    <Form.Item name="password" label="Password" rules={[{
          required: true,
          message: 'Please input your password!'
        }
      ]} hasFeedback="hasFeedback">
      <Input.Password/>
    </Form.Item>

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

    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit" style={{width:"100%"}}>
        Register
      </Button>
    </Form.Item>
  </Form>);
};

export default RegistrationForm;
