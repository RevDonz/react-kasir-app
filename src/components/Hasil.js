import axios from 'axios';
import React, { Component } from 'react';
import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { API_URL } from '../utils/constants';
import { numberFormat } from '../utils/utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
            totalHarga: 0,
        };
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga,
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false,
        });
    };

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga:
                this.state.keranjangDetail.produk.harga *
                (this.state.jumlah + 1),
        });
    };

    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga:
                    this.state.keranjangDetail.produk.harga *
                    (this.state.jumlah - 1),
            });
        }
    };

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            produk: this.state.keranjangDetail.produk,
            keterangan: this.state.keterangan,
        };

        axios
            .put(API_URL + 'keranjangs/'+this.state.keranjangDetail.id, data)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: 'Sukses Update',
                    text: data.produk.nama + ' Sukses update pesanan!',
                    icon: 'success',
                    button: false,
                    timer: 1000,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    hapusPesanan = (id) => {
        this.handleClose();
        axios
            .delete(API_URL + 'keranjangs/'+id)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: 'Sukses',
                    text: this.state.keranjangDetail.produk.nama + ' Sukses hapus pesanan!',
                    icon: 'success',
                    button: false,
                    timer: 1000,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { keranjangs } = this.props;
        return (
            <Col md={3} mt='2'>
                <h4>
                    <strong>Hasil</strong>
                </h4>
                <hr />
                {keranjangs.length !== 0 && (
                    <ListGroup variant='flush'>
                        {keranjangs.map((keranjang) => (
                            <ListGroup.Item
                                key={keranjang.id}
                                onClick={() => this.handleShow(keranjang)}
                            >
                                <Row>
                                    <Col xs={2}>
                                        <h4>
                                            <Badge pill variant='success'>
                                                {keranjang.jumlah}
                                            </Badge>
                                        </h4>
                                    </Col>
                                    <Col>
                                        <h5>{keranjang.produk.nama}</h5>
                                        <p>
                                            Rp.{' '}
                                            {numberFormat(
                                                keranjang.produk.harga
                                            )}
                                        </p>
                                    </Col>
                                    <Col>
                                        <strong className='float-right'>
                                            Rp.{' '}
                                            {numberFormat(
                                                keranjang.total_harga
                                            )}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ModalKeranjang
                            handleClose={this.handleClose}
                            tambah={this.tambah}
                            kurang={this.kurang}
                            changeHandler={this.changeHandler}
                            handleSubmit={this.handleSubmit}
                            hapusPesanan={this.hapusPesanan}
                            {...this.state}
                        />
                    </ListGroup>
                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        );
    }
}
