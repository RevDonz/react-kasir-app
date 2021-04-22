import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { numberFormat } from '../utils/utils';
import { API_URL } from '../utils/constants';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs,
        }

        axios.post(API_URL+"pesanans", pesanan).then((res) => {
            this.props.history.push('/success')
        })
    }
    render() {
        const totalBayar = this.props.keranjangs.reduce(function (
            result,
            item
        ) {
            return result + item.total_harga;
        },
        0);
        return (
            <div className='fixed-bottom'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4'>
                        <h4>
                            Total Harga :{' '}
                            <strong className='float-right mr-2'>
                                Rp. {numberFormat(totalBayar)}
                            </strong>
                        </h4>
                        <Button
                            variant='primary'
                            block
                            className='mb-2 mr-2'
                            onClick={() => this.submitTotalBayar(totalBayar)}
                        >
                            <FaShoppingCart /> Bayar
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }
}
