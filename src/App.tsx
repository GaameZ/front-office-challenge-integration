import Medals from './Components/Medals'
import Nav from './Components/Nav'
import NextEvents from './Components/NextEvents'
import React from 'react'
import { Layout } from 'antd'
import './App.css'

const { Header, Content } = Layout

const App = () => {
  return (
    <Layout>
      <Header style={{ background: '#D4D4D4' }}>
        <Nav />
      </Header>
      <Content>
        <NextEvents />
        <Medals />
      </Content>
    </Layout>
  )
}

export default App
