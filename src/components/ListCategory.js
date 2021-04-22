import axios from 'axios';
import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import { FaUtensils, FaCoffee, FaCheese } from 'react-icons/fa';

const Icon = ({ nama }) => {
    if (nama === 'Makanan') return <FaUtensils className='mr-2' />;
    if (nama === 'Minuman') return <FaCoffee className='mr-2' />;
    if (nama === 'Cemilan') return <FaCheese className='mr-2' />;

    return <FaCheese />;
};

export default class ListCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + 'categories')
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { categories } = this.state;
        const { changeCategory, selectedCategory } = this.props;
        return (
            <Col md={2} mt='2'>
                <h4>
                    <strong>Daftar Kategori</strong>
                </h4>
                <hr />
                <ListGroup>
                    {categories &&
                        categories.map((category) => (
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => changeCategory(category.nama)}
                                className={selectedCategory === category.nama && "active-category"}
                                style={{cursor: 'pointer'}}
                            >
                                <Icon nama={category.nama} />
                                {category.nama}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Col>
        );
    }
}
