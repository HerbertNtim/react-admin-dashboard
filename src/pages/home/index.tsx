import { Col, Row } from "antd"
import { DealsChart, UpcomingEvents } from '@/components'

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
          <UpcomingEvents />
        </Col>
        <Col
          xl={8}
          xs={24}
          sm={24}
          style={{
            height: '460px'
          }}
        >
          <DealsChart />
        </Col>
      </Row>
    </div>
  )
}
