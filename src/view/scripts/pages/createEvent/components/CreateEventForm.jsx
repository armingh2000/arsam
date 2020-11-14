import React, {useState} from 'react';
import axios from "axios";
import {Form,
  Input,
  Button,
  Typography,
  Checkbox,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {useHistory} from 'react-router-dom';
import {sendCreateEventPost, sendImageEventPost} from "../../../../../core/create-event/createEvent"

const normFile = e => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const { Option } = Select;
const { RangePicker } = DatePicker;


const CreateEventForm = () =>{
  const [form] = Form.useForm();
  const [isProject, handleIsProject]=useState(false);
  const [limiedMember,handleLimitedMember]=useState(false);
  const [isPrivate,handleIsPrivate]=useState(false);

  const history = useHistory();

  const eventCategory=
  [
    <Option key={1}>Race</Option>,
    <Option key={2}>Performance</Option>,
    <Option key={4}>Conference</Option>,
    <Option key={8}>Fundraiser</Option>,
    <Option key={16}>Festival</Option>,
    <Option key={32}>Social Event</Option>
  ];



  const [failureMessage, setFailureMessage] = useState("");
  const [isFailed, setIsFailed] = useState(false);


  function onLimitChange(value){
    handleLimitedMember(value);
  }

  function onPrivateChange(value){
    handleIsPrivate(value);
  }

  function onTypeChange(value){
    switch (value) {
      case 'projectEvent':
        handleIsProject(true);
        break;
      case 'normalEvent':
        handleIsProject(false);
        break;
    }
  }

 var imgVal;
 var fileVal;

  const onFinish = (values) => {
    const category=values.category;
    console.log(`category: ${category}`);
    const token = localStorage.getItem("userToken");
    // console.log(`values: ${values}`);
    imgVal=values.dragger;
    fileVal=values.files;
    // console.log(`dragger: ${values.dragger}`);
    console.log("files:");
    console.log(values.files);

    sendCreateEventPost(
      {
        "Name": values.eventName,
        "Description": values.description,
        "StartDate": values.date[0],
        "EndDate": values.date[1],
        "IsPrivate": values.private,
        "IsLimitedMember": values.limit,
        "MaximumNumberOfMembers": values.memberNum,
        "IsProject": isProject,
        "Categories":category
      },
      {
        'Authorization':`Bearer ${token}`
      }
    )
       .then(onSuccess)
       .catch(onFailure);
  };


  const onSuccess = (response) => {
    // console.log("Success");
    // console.log("response:");
    // console.log(response);
    // console.log("imgVal:");
    // console.log(imgVal);
    // console.log("imgval0:");
    // console.log(imgVal[0]);
    // console.log(imgVal[0].name);

    // const data=new FormData();
    // data.append('image',imgVal);

    if(imgVal!==undefined){
      var FormData = require('form-data');
      var fs = require('fs');
      var data = new FormData();
      //data.append('',fs.createReadStream(`${imgVal[0].name}`));
      data.append('image',imgVal[0].originFileObj);
      // data.append('image','1');

      // var data = new FormData(form.dragger);
      console.log("form-data:");
      console.log(data);

      for(var pair of data.entries()) {
        console.log(pair[1]);
      }


      const token=localStorage.getItem("userToken");
      console.log("token:");
      console.log(token);
      const eventId = response.data.id;
      console.log("event id:");
      console.log(eventId);

      sendImageEventPost(
        `https://localhost:44373/api/event/AddImage?eventId=${eventId}`
          ,
          data
          ,
        {
          'Authorization':`Bearer ${token}`
        }
        );
    }

    // console.log("finish success");
  };

  const onFailure = (error) => {
    setIsFailed(true);
    setFailureMessage("Invalid Create Event Attempt!");
    console.log(error);
    // if (error.response.status === 401) {
    //   setFailureMessage("Email is not confirmed yet!");
    //   setIsFailed(true);
    // } else {
    //   setFailureMessage("Invalid Login Attempt!");
    //   setIsFailed(true);
    // }
  };

  return (
      <div className="box">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: 'default' }}
          size={'default'}
          onFinish={onFinish}
        >

          <span className="text-center">create event</span>


            <Form.Item label="Event Name" name="eventName" rules={[{ required: true, message:'Please Enter Event Name' }]}>
              <Input/>
            </Form.Item>

            <Form.Item label="Description" name="description" rules={[{ required: true, message:'Please Enter Description' }]}>
              <Input/>
            </Form.Item>


            <Form.Item label="Event Image">
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files"
                className="get-shadow"
                // action="https://localhost:44373/api/event/AddImage"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>



            <Form.Item label="Event Date" name="date" rules={[{ required: true, message:'Please Enter Description' }]}>
              <RangePicker className="get-shadow" showTime/>
            </Form.Item>

            <Form.Item label="Private Event" name="private" >
              <Switch  className="get-shadow" onChange={onPrivateChange}/>
            </Form.Item>

            <Form.Item label="Limited Member" name="limit" >
              <Switch  className="get-shadow" onChange={onLimitChange}/>
            </Form.Item>

            <Form.Item label="Event Member Num" name="memberNum" hidden={!limiedMember}>
              <InputNumber min="1" defaultValue={1}/>
            </Form.Item>

            <Form.Item name="eventType" label="Event Type" rules={[{ required: true, message:'Please Choose one Option' }]}>
            <Select
              className="get-shadow"
              placeholder="Select a option and change input text above"
              onChange={onTypeChange}
              allowClear
            >
              <Option value="normalEvent">Normal Event</Option>
              <Option value="projectEvent">Project Event</Option>
            </Select>
            </Form.Item>

            <Form.Item name="category" label="Event Category" rules={[{ required: true, message:'Please Choose one Option' }]}>
              <Select
                className="get-shadow"
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={[]}
              >
              {eventCategory}
              </Select>
            </Form.Item>

            {
            // <Form.Item name="but" label="but" hidden={!IsProject} >
            //   <Button htmlType="submit"  style={{width: "100%"}}>
            //     but
            //   </Button>
            // </Form.Item>
            }

            <Form.Item >
              <Button htmlType="submit" className="btn" style={{width: "100%"}}>

                <svg width="620" height="62">
                  <defs>
                    <linearGradient id="grad1">
                      <stop offset="0%" stop-color="#7183f5" />
                      <stop offset="100%" stop-color="#74ddfc" />
                    </linearGradient>
                  </defs>
                  <rect x="5" y="5" rx="25" fill="none" stroke="url(#grad1)" width="610" height="50"></rect>
                </svg>
                <span>Create</span>

              </Button>
            </Form.Item>


        </Form>


      </div>
  );

}

export default CreateEventForm;
