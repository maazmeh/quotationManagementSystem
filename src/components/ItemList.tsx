import React from 'react';
import '../styles.css';

interface Item {
  sno: number;
  description: string;
  unit: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
  gstPercent: number;
  gstAmount: number;
  amount: number;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => (
  <div className="item-list">
    <table>
      <thead>
        <tr style={{backgroundColor:'#0a2990'}}>
          <th style={{color:'white'}}>S.N</th>
          <th style={{color:'white'}}>Description of Goods</th>
          <th style={{color:'white'}}>Unit</th>
          <th style={{color:'white'}}>Qty</th>
          <th style={{color:'white'}}>Unit Price</th>
          <th style={{color:'white'}}>Total Price</th>
          <th style={{color:'white'}}>GST%</th>
          <th style={{color:'white'}}>GST Amt.</th>
          <th style={{color:'white'}}>Amount(Rs.)</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.sno}</td>
            <td>{item.description}</td>
            <td>{item.unit}</td>
            <td>{item.qty}</td>
            <td>{item.unitPrice}</td>
            <td>{item.totalPrice}</td>
            <td>{item.gstPercent}</td>
            <td>{item.gstAmount}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ItemList;