import React, {useEffect} from "react";
import { setRequest } from "../../../../../../core/api/actions/EventActions";
import {
  Spin,
  Typography,
  Col,
  Row,
  Card,
  Avatar,
  Tooltip,
  message
} from "antd";
import {
  UserOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone
} from "@ant-design/icons";
import { acceptJoin, rejectJoin } from "../../../../../../core/api/actions/EventActions";

const EventAdminRequest = ({eventId, dispatch, requestStatus, requests}) =>
{
  useEffect(() => {
    dispatch(setRequest({
        payload: {
          eventId
        }
    }));
  }, []);

  function getRandomColor(firstLetter) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(firstLetter.charCodeAt(0) * i + 14) % 16];
    }
    return color;
  }

  function getUserInfo(user) {
    return <div>
      <UserOutlined/>
      {" " + user.email}
    </div>
  }

  const key = 'updatable';

  const openLoadMessage = () => {
    message.loading({ content: 'Loading...', key, duration: 10 });
  };

  const openSuccessMessage = () => {
      message.success({ content: 'Updated!', key, duration: 2 });
  };

  const openErrorMessage = () => {
      message.error({ content: 'Error!', key, duration: 2 });
  };

  const {Text} = Typography;
  const { Meta } = Card;


  function getRequests() {

    if (requests.length === 0) {
      return (
        <Row justify="center" align="middle" style={{minHeight:"100vh"}}>
          <Col>
            <Text type="danger">Sorry, no join requests!</Text>
          </Col>
        </Row>
      )
    }

    return (<div>
      {requests.map((req) => {
        return (<div>
          <Col span={5} offset={2} >
            <Card
              className="card"
            >
              <Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor:getRandomColor(req.user.email.charAt(0)),
                      height: 40,
                      width: 40
                    }}
                  >
                    {req.user.email.charAt(0)}
                  </Avatar>
                }
                title={getUserInfo(req.user)}
                description="Wants to join your event!"
              />
              <div>
                  <Tooltip title="accept" placement="right" color="green">
                  <CheckCircleTwoTone
                  twoToneColor="#52c41a"
                  style={{fontSize:40, margin:"10px 10px 0 0"}}
                  onClick={() => {
                    dispatch(acceptJoin({payload:{eventId, email:req.user.email, oem:openErrorMessage, olm:openLoadMessage, osm: openSuccessMessage}}))
                  }}/>
                </Tooltip>
                <Tooltip title="reject" placement="left" color="red" className="right-aligned-button">
                  <CloseCircleTwoTone
                    twoToneColor="red"
                    style={{fontSize:40, margin:"10px 10px 0 0"}}
                    onClick={() => {
                      dispatch(rejectJoin({payload:{eventId, email:req.user.email, oem:openErrorMessage, olm:openLoadMessage, osm: openSuccessMessage}}))
                    }}
                    />
                </Tooltip>
              </div>
            </Card>
          </Col>
        </div>
      );
      })}
    </div>);
  }

  switch (requestStatus) {
    case 'loading':

      return (
        <Row justify="center" align="middle" style={{minHeight:"100vh"}}>
          <Col>
            <Spin size="large"/>
          </Col>
        </Row>
      );

    case 'success':

      return getRequests();

    case 'error':
      return (
        <Row justify="center" align="middle" style={{minHeight:"100vh"}}>
          <Col>
            <Text type="danger">Please try again!</Text>
          </Col>
        </Row>
      );

    default:
      return <div></div>;
  }
}

export default EventAdminRequest;
