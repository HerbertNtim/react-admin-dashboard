import { Col, Row } from "antd"

export const Home = () => {
  return (
    <div>
      <Row 
        gutter={[32, 32]}
        style={{
          marginTop: '32px'
        }}
      >
        <Col
          xl={8}
          xs={24}
          sm={24}
          style={{
            height: '460px'
          }}
        >
          UpComing Events
        </Col>
        <Col
          xl={8}
          xs={24}
          sm={24}
          style={{
            height: '460px'
          }}
        >
          DealsChart
        </Col>
      </Row>
    </div>
  )
}
