import React, { Component } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategory, Menus, NavbarComponent } from "./components";
import { API_URL } from './utils/constants'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus:[],
    }
  }
  
  componentDidMount() {
    axios
      .get(API_URL+"products")
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    const { menus } = this.state
    return (
      <div className="App">
        <NavbarComponent />
        <div className="mt-2">
          <Container fluid>
            <Row>
              <ListCategory />
              <Col>
                <h4><strong>Daftar Produk</strong></h4>
                <hr/>
                <Row>
                  {menus && menus.map((menu) => (
                    <Menus menu={menu} key={menu.id} />
                  ))}
                </Row>
              </Col>
              <Hasil />
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

