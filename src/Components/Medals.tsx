import React, { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd'
import { medals } from '../data.json'

interface CountryType {
  key: Number
  id: String
  country: String
  gold: Number
  silver: Number
  bronze: Number
  total: Number
}

type SortOrder = 'descend' | 'ascend' | null
type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

const columns = [
  {
    title: 'Pays',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Or',
    dataIndex: 'gold',
    key: 'gold',
    sorter: (a: any, b: any) => a.gold - b.gold,
    responsive: ['sm'] as Breakpoint[],
  },
  {
    title: 'Argent',
    dataIndex: 'silver',
    key: 'silver',
    sorter: (a: any, b: any) => a.silver - b.silver,
    responsive: ['sm'] as Breakpoint[],
  },
  {
    title: 'Bronze',
    dataIndex: 'bronze',
    key: 'bronze',
    sorter: (a: any, b: any) => a.bronze - b.bronze,
    responsive: ['sm'] as Breakpoint[],
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    defaultSortOrder: 'descend' as SortOrder,
    sorter: (a: any, b: any) => a.total - b.total,
  },
]

const Medals = () => {
  const [dataSource, setDataSource] = useState<Array<CountryType>>([])

  useEffect(() => {
    const data: Array<CountryType> = []
    medals.map((medal, idx) => {
      return data.push({
        key: idx,
        id: medal.key,
        country: medal.country,
        gold: medal.medals.gold,
        silver: medal.medals.silver,
        bronze: medal.medals.bronze,
        total: medal.medals.gold + medal.medals.silver + medal.medals.bronze,
      })
    })
    setDataSource(data)
  }, [])
  return (
    <div>
      <Row justify="center">
        <Col span={20}>
          <h2>Médailles</h2>
        </Col>
        <Col span={20}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            locale={{
              triggerAsc: 'Cliquez pour trier par ordre croissant',
              triggerDesc: 'Cliquez pour trier par ordre décroissant',
              cancelSort: 'Cliquez pour annuler le tri',
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Medals
