import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../input.css';
import DrawerNavigation from './DrawerNavigation';
import { fetchClientInformation, fetchEmpInformation, fetchProdInfo, getAllClients, getAllEmployees, getAllProducts, getAllTaxes } from '../providers/http';
import { useAuth } from './Auth/AuthContext';

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


const generateQuotationNo = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const getCurrentDate = (): string => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const addOneWeekToDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() + 7); // Add 7 days to the current date
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const InputPage: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([
    {
      sno: 1,
      description: '',
      unit: '',
      qty: 0,
      unitPrice: 0,
      totalPrice: 0,
      gstPercent: 0,
      gstAmount: 0,
      amount: 0
    }
  ]);

  const [details, setDetails] = useState({
    quotationNo: generateQuotationNo(),
    date: getCurrentDate(),
    quotationTo: '',
    projectName: '',
    contactPerson: '',
    proposalFor: '',
    contactNo: '',
    emailIdCustomer: '',
    quoteValidity: addOneWeekToDate(),
  });

  const [empDetails, setEmpDetails] = useState({
    salesPerson: '',
    emailIdSales: '',
    contactNoSales: ''
  });

  const [clients, setClients] = useState<any>([]);
  const [employees, setEmployees] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [taxes, setTax] = useState<any>([]);
  const navigate = useNavigate();


  useEffect(() => {
    getAllClients(user?.companyId).then((resp: any) => {
      console.log("getAllClients resp =>", resp.data.data);
      setClients(resp.data.data);
    }).catch((err: any) => {
      console.log("err =>", err);
    })

    getAllEmployees(user?.companyId).then((resp: any) => {
      console.log("getAllEmployees resp =>", resp.data.data);
      setEmployees(resp.data.data);
    }).catch((err: any) => {
      console.log("err =>", err);
    })

    getAllProducts(user?.companyId).then((resp: any) => {
      console.log("getAllProducts resp =>", resp.data.data);
      setProducts(resp.data.data);
    }).catch((err: any) => {
      console.log("err =>", err);
    })

    getAllTaxes().then((resp: any) => {
      console.log("getAllTaxes resp =>", resp.data.data);
      setTax(resp.data.data);
    }).catch((err: any) => {
      console.log("err =>", err);
    })

  }, [])

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        sno: items.length + 1,
        description: '',
        unit: '',
        qty: 0,
        unitPrice: 0,
        totalPrice: 0,
        gstPercent: 0,
        gstAmount: 0,
        amount: 0
      }
    ]);
  };

  const handleItemChange = (index: number, key: keyof Item, value: any) => {
    console.log("handleItemChange =>", index, key, value);
    const newItems: any = [...items];
    newItems[index][key] = value;
    setItems(newItems);

    if (key === 'qty') {
      const qty = Number(value);
      newItems[index].qty = qty;
      newItems[index].totalPrice = qty * newItems[index].unitPrice;
    }


    if (key === 'gstPercent') {
      const gstPercent = Number(value);
      newItems[index].gstPercent = gstPercent;
      newItems[index].gstAmount = newItems[index].totalPrice * (gstPercent / 100);
      newItems[index].amount = newItems[index].totalPrice + newItems[index].gstAmount;
    }

    setItems(newItems);

    // Fetch product information when description is changed
    if (key === 'description') {
      fetchProdInfo(value).then((resp: any) => {
        console.log("response from fetchProdInfo =>", resp.data.data[0]);
        const product = resp.data.data[0];
        if (product) {
          console.log(" description =>", product.productName);
          // Create a new array with the updated item
          const updatedItems = items.map((item, i) => {
            if (i === index) {
              return {
                ...item,
                unit: product.unit,
                unitPrice: product.unitPrice,
                totalPrice: item.qty * product.unitPrice,
                description: `${product.productName}`
              };
            }
            return item;
          });

          setItems(updatedItems);
        }
      }).catch((err: any) => {
        console.log("response from fetchProdInfo err =>", err);
      })
    }
  }

  const handleDetailsChange = (key: string, value: any) => {
    console.log("handleDetails =>", key, value);

    if (key === 'projectName') {
      setDetails(prevDetails => ({
        ...prevDetails,
        [key]: value
      }));
    } else if (key === 'proposalFor') {
      setDetails(prevDetails => ({
        ...prevDetails,
        [key]: value
      }));
    } else if (key === 'quotationTo') {
      fetchClientInformation(value).then((resp: any) => {
        console.log("response from client info =>", resp.data.data);
        const client = resp.data.data[0];
        if (client) {
          setDetails(prevDetails => ({
            ...prevDetails,
            contactPerson: client.contactPerson,
            contactNo: client.contactNo,
            emailIdCustomer: client.emailId,
            quotationTo: client.name
          }));
        }
      }).catch((err: any) => {
        console.log("err fetchClientInformation =>", err);
      })
    }
    else if (key === 'salesPerson') {
      fetchEmpInformation(value).then((resp: any) => {
        console.log("response from client info =>", resp.data.data);
        const employees = resp.data.data[0];
        if (employees) {
          setEmpDetails(prevDetails => ({
            ...prevDetails,
            salesPerson: employees.name,
            emailIdSales: employees.email,
            contactNoSales: employees.contact,
          }));
        }
      }).catch((err: any) => {
        console.log("err fetchEmpInformation =>", err);
      })

    }

  };

  const handleSubmit = () => {
    navigate('/quotation', { state: { items, details, empDetails } });
  };

  const handleBack = () => {
    navigate('/quotationsList');
  };

  return (
    <DrawerNavigation>
      <div className="container" style={{ width: '100%' }}>
        <h1>Add Quotation</h1>
        <p>Please enter the information below. Fields with * are required.</p>
        <div>
          <h2>Quotation Details</h2>
          <div className="table-container">
            <table className="table">
              <tbody>
                <tr>
                  <th>Quotation No</th>
                  <td><input type="text" value={details.quotationNo} readOnly /></td>
                  <th>Date</th>
                  <td><input type="text" value={details.date} readOnly /></td>
                </tr>
                <tr>
                  <th>Quotation To</th>
                  <td>
                    <select value={details.quotationTo} onChange={(e) => handleDetailsChange('quotationTo', e.target.value)}>
                      <option value="">Select Client</option>
                      {clients.map((client: any) => (
                        <option key={client.id} value={client.name}>{client.name}</option>
                      ))}
                    </select>
                  </td>
                  <th>Project Name</th>
                  <td><input type="text" value={details.projectName} onChange={(e) => handleDetailsChange('projectName', e.target.value)} /></td>
                </tr>
                <tr>
                  <th>Contact Person</th>
                  <td><input type="text" value={details.contactPerson} onChange={(e) => handleDetailsChange('contactPerson', e.target.value)} /></td>
                  <th>Proposal For</th>
                  <td><input type="text" value={details.proposalFor} onChange={(e) => handleDetailsChange('proposalFor', e.target.value)} /></td>
                </tr>
                <tr>
                  <th>Contact No</th>
                  <td><input type="text" value={details.contactNo} onChange={(e) => handleDetailsChange('contactNo', e.target.value)} /></td>
                  <th>Sales Person</th>
                  <td>
                    <select value={empDetails.salesPerson} onChange={(e) => handleDetailsChange('salesPerson', e.target.value)}>
                      <option value="">Select Sales Employee</option>
                      {employees.map((emp: any) => (
                        <option key={emp.id} value={emp.id}>{emp.firstName}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Email ID (Customer)</th>
                  <td><input type="text" value={details.emailIdCustomer} onChange={(e) => handleDetailsChange('emailIdCustomer', e.target.value)} /></td>
                  <th>Email ID (Sales)</th>
                  <td><input type="text" value={empDetails.emailIdSales} onChange={(e) => handleDetailsChange('emailIdSales', e.target.value)} /></td>
                </tr>
                <tr>
                  <th>Quote Validity</th>
                  <td><input type="text" value={details.quoteValidity} onChange={(e) => handleDetailsChange('quoteValidity', e.target.value)} /></td>
                  <th>Contact No (Sales)</th>
                  <td><input type="text" value={empDetails.contactNoSales} onChange={(e) => handleDetailsChange('contactNoSales', e.target.value)} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2>Items</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Description</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                  <th>Taxes %</th>
                  <th>GST Amount</th>
                  <th>Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td style={{ width: '6%' }}><input type="text" value={item.sno} onChange={(e) => handleItemChange(index, 'sno', e.target.value)} /></td>
                    <td style={{ width: '30%' }}>
                      <select value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)}>
                        <option value="">Select Product</option>
                        {products.map((prod: any) => (
                          <option key={prod.id} value={prod.productCode}>{prod.productName}</option>
                        ))}
                      </select>
                      <textarea
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        style={{ width: '97%' }} // Ensure the textarea takes full width
                      />
                    </td>
                    <td style={{ width: '6%' }}><input type="text" value={item.unit} onChange={(e) => handleItemChange(index, 'unit', e.target.value)} /></td>
                    <td style={{ width: '8%' }}><input type="text" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} /></td>
                    <td style={{ width: '10%' }}><input type="text" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} /></td>
                    <td style={{ width: '10%' }}><input type="text" value={item.totalPrice} onChange={(e) => handleItemChange(index, 'totalPrice', e.target.value)} /></td>
                    <td style={{ width: '8%' }}>
                      <select value={item.gstPercent} onChange={(e) => handleItemChange(index, 'gstPercent', e.target.value)}>
                        <option value="">Select Tax</option>
                        {taxes.map((tax: any) => (
                          <option key={tax.id} value={tax.entityPercentage}>{tax.entityName}</option>
                        ))} 
                      </select>
                    </td>
                    <td style={{ width: '10%' }}><input type="text" value={item.gstAmount} onChange={(e) => handleItemChange(index, 'gstAmount', e.target.value)} /></td>
                    <td style={{ width: '15%' }}><input type="text" value={item.amount} onChange={(e) => handleItemChange(index, 'amount', e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="add-item-button" onClick={handleAddItem}>Add Item</button>
        </div>
        <div className="button-group">
          <button className="submit-button" onClick={handleSubmit}>Generate Quotation</button>
          <button className="back-button" onClick={handleBack}>Back</button>
        </div>
      </div>
    </DrawerNavigation>
  );
};

export default InputPage;