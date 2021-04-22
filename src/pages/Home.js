import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListCategory, Menus } from '../components';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedCategory: 'Makanan',
      keranjangs: []
    };
  }

  componentDidMount() {
    axios
      .get(
        API_URL +
        'products?category.nama=' +
        this.state.selectedCategory
      )
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if(this.state.keranjangs !== prevState.keranjangs) {
  //     axios
  //     .get(API_URL + 'keranjangs')
  //     .then((res) => {
  //       const keranjangs = res.data;
  //       this.setState({ keranjangs });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + 'keranjangs')
      .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  changeCategory = (value) => {
    this.setState({
      selectedCategory: value,
      menus: [],
      carts: [],
    });

    axios
      .get(API_URL + 'products?category.nama=' + value)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  addCart = (value) => {
    axios
      .get(API_URL + 'keranjangs?produk.id=' + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            produk: value,
          };

          axios
            .post(API_URL + 'keranjangs', keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: 'Sukses',
                text:
                  keranjang.produk.nama +
                  ' Sukses Masuk Keranjang!',
                icon: 'success',
                button: false,
                timer: 1000
              });
            })
            .catch((error) => {
              console.log(error);
            });

        } else {

          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            produk: value,
          };

          axios
            .put(
              API_URL + 'keranjangs/' + res.data[0].id, keranjang
            )
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: 'Sukses',
                text:
                  keranjang.produk.nama +
                  ' Sukses Masuk Keranjang!',
                icon: 'success',
                button: false,
                timer: 1000
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  };

  render() {
    const { menus, selectedCategory, keranjangs } = this.state;
    return (
        <div className='mt-2'>
          <Container fluid>
            <Row>
              <ListCategory
                changeCategory={this.changeCategory}
                selectedCategory={selectedCategory}
              />
              <Col>
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
                <hr />
                <Row>
                  {menus &&
                    menus.map((menu) => (
                      <Menus
                        menu={menu}
                        key={menu.id}
                        addCart={this.addCart}
                      />
                    ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} getListKeranjang={this.getListKeranjang} {...this.props} />
            </Row>
          </Container>
        </div>
    );
  }
}
