import React from 'react';
import {
    Modal,
    Button,
    Form,
    InputGroup,
    FormControl,
    FormLabel,
    Row,
    Col,
} from 'react-bootstrap';
import { FaPlus, FaMinus, FaTrash, FaCheck } from 'react-icons/fa';
import { numberFormat } from '../utils/utils';

const ModalKeranjang = ({
    showModal,
    handleClose,
    keranjangDetail,
    jumlah,
    keterangan,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    hapusPesanan
}) => {
    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {keranjangDetail.produk.nama}{' '}
                        <strong>
                            (Rp. {numberFormat(keranjangDetail.produk.harga)})
                        </strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='exampleForm.ControlInput1'>
                            <Form.Label>Total Harga</Form.Label>
                            <Form.Control
                                value={
                                    'Rp. ' +
                                    numberFormat(totalHarga)
                                }
                            />
                        </Form.Group>
                        <Row>
                            <Col sm={4}>
                                <Form.Group>
                                    <FormLabel>Total</FormLabel>
                                    <InputGroup className='mb-3'>
                                        <InputGroup.Prepend>
                                            <Button variant='primary' onClick={ () => kurang()}>
                                                <FaMinus />
                                            </Button>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            aria-describedby='basic-addon1'
                                            value={jumlah}
                                        />
                                        <InputGroup.Append>
                                            <Button variant='primary' onClick={ () => tambah()}>
                                                <FaPlus />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId='exampleForm.ControlTextarea1'>
                            <Form.Label>Keterangan</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                name='keterangan'
                                placeholder='Contoh: Pedas, Bonusan'
                                value={keterangan}
                                onChange={(event) => changeHandler(event)}
                            />
                        </Form.Group>
                        <Button variant='primary' type='submit'>
                            <FaCheck /> Simpan Pesanan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => hapusPesanan(keranjangDetail.id)}>
                        <FaTrash /> Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    } else {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kosong</Modal.Title>
                </Modal.Header>
                <Modal.Body>Kosong</Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default ModalKeranjang;
