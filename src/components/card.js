import React from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

const CCard = (props) => {

  return (
    <Card className="card">
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title="Card title"
        description="This is the description"
      />
    </Card>
  )
};

export default CCard;