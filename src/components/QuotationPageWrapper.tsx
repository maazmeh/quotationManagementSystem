import React from 'react';
import { useLocation } from 'react-router-dom';
import QuotationPage from './QuotationPage';

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

interface Details {
  quotationNo: string;
  date: string;
  quotationTo: string;
  projectName: string;
  contactPerson: string;
  proposalFor: string;
  contactNo: string;
  salesPerson: string;
  emailIdCustomer: string;
  emailIdSales: string;
  quoteValidity: string;
  contactNoSales: string;
}

interface EmpDetails {
  salesPerson: string;
  emailIdSales: string;
  contactNoSales: string;
}

const QuotationPageWrapper: React.FC = () => {
  const location = useLocation();
  const { items, details, empDetails } = location.state as { items: Item[], details: Details, empDetails: EmpDetails };

  return <QuotationPage items={items} details={details} empDetails={empDetails} />;
};

export default QuotationPageWrapper;