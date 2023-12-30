import React, { useEffect } from 'react'
import { Table } from 'antd';
import {BiEdit} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
import {useDispatch, useSelector} from 'react-redux';
import { getProducts } from '../features/product/productSlice';
import {Link} from 'react-router-dom'


const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Tile',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
  },[]);
  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i+1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      price: productState[i].price,
      action: (<>
        <Link className='fs-3 text-danger' to='/'><BiEdit /></Link>
        <Link className='fs-3 text-danger ms-3' to='/'><AiFillDelete /></Link>
      </>)
    });
  }

    return (
        <div>
          <h3 className='mb-4 title'>Products List</h3>
          <div>
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      )
}

export default ProductList