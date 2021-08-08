import moment from 'moment'
import React, { useEffect, useState } from 'react'
import {
  Card,
  Carousel,
  Col,
  Divider,
  Empty,
  Row,
  Select
  } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { nextEvent } from '../data.json'
import './NextEvents.css'

const { Meta } = Card

moment.locale('fr')

type ArrowProps = {
  className?: string
  onClick?: () => {}
}

interface eventType {
  id: string
  sportId: string
  sportTitle: string
  pictureUrl: string
  date: string
}

const NextArrow = ({ className, onClick }: ArrowProps) => (
  <div className={className} onClick={onClick}>
    <RightOutlined />
  </div>
)

const PrevArrow = ({ className, onClick }: ArrowProps) => (
  <div className={className} onClick={onClick}>
    <LeftOutlined />
  </div>
)

const NextEvents = () => {
  const [nextEvents, setNextEvents] = useState<Array<Array<eventType>>>([])
  const [filterValues, setFilterValues] = useState<Array<String>>(
    nextEvent.map((event) => event.sportId)
  )

  const onFilterChange = (value: String[]) => {
    setFilterValues(value)
  }

  useEffect(() => {
    const events: Array<Array<eventType>> = []
    let eventsGroup: Array<eventType> = []
    nextEvent
      .filter((event) => filterValues.includes(event.id))
      .map((event) => {
        if (eventsGroup.length % 3 === 0 && eventsGroup.length !== 0) {
          events.push([...eventsGroup])
          eventsGroup = []
        }
        return eventsGroup.push(event)
      })
    events.push([...eventsGroup])
    setNextEvents([...events])
  }, [filterValues])

  return (
    <div>
      <Row justify="center">
        <Col span={20}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={onFilterChange}
            defaultValue={nextEvent.map((event) => event.sportId)}
            options={nextEvent.map((event) => ({
              id: event.id,
              value: event.sportId,
              label: event.sportTitle,
            }))}
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <h2>Prochaines épreuves</h2>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={18}>
          <Carousel
            infinite={false}
            arrows={true}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            dots={false}
          >
            {nextEvents[0] && nextEvents[0].length > 0 ? (
              nextEvents.map((eventsGroup, idx) => {
                return (
                  <div className="carousel-slide" key={idx}>
                    <Row>
                      {eventsGroup.map((event, idx) => {
                        return (
                          <Col key={idx} flex="1 0 25%">
                            <Card
                              className="carousel-card"
                              cover={<img alt={event.sportTitle} src={event.pictureUrl} />}
                            >
                              <Meta
                                title={event.sportTitle}
                                description={moment(parseInt(event.date + '000')).format(
                                  'DD/MM/YYYY - HH:mm'
                                )}
                              />
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                  </div>
                )
              })
            ) : (
              <Row>
                <Col span={24}>
                  <Empty description="Aucune épreuve de prévu" />
                </Col>
              </Row>
            )}
          </Carousel>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20}>
          <Divider />
        </Col>
      </Row>
    </div>
  )
}

export default NextEvents
