import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Header from './Header';
import Footer from './Footer';
import ItemList from './ItemList';
import Terms from './Terms';
import '../quotation.css';
import DrawerNavigation from './DrawerNavigation';

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
  emailIdCustomer: string;
  quoteValidity: string;
}

interface EmpDetails {
  salesPerson: string;
  emailIdSales: string;
  contactNoSales: string;
}

interface QuotationPageProps {
  items: Item[];
  details: Details;
  empDetails: EmpDetails;
}

const numberToWords = (num: number): string => {
  const a = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const numToWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + ' ' + a[n % 10];
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred ' + numToWords(n % 100);
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + ' Thousand ' + numToWords(n % 1000);
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + ' Lakh ' + numToWords(n % 100000);
    return numToWords(Math.floor(n / 10000000)) + ' Crore ' + numToWords(n % 10000000);
  };

  return numToWords(num).trim();
};

const QuotationPage: React.FC<QuotationPageProps> = ({ items, details, empDetails }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const updateItemsPerPage = () => {
    const pageWidth = window.innerWidth;
    if (pageWidth < 600) {
      setItemsPerPage(1);
    } else if (pageWidth < 900) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const totalAmount = items.reduce((acc, item) => acc + Number(item.amount), 0);
  const totalGST = items.reduce((acc, item) => acc + Number(item.gstAmount), 0);
  const totalSum = totalAmount + totalGST;
  const totalSumInWords = numberToWords(totalSum);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <DrawerNavigation>
      <div>
        <div ref={printRef}>
          {Array.from({ length: totalPages }, (_, pageIndex) => (
            <div key={pageIndex} className="container">
              {pageIndex === 0 && <Header />}
              {pageIndex === 0 && (
                <div className="details">
                  <table>
                    <tbody>
                      <tr>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Quotation No.</th>
                        <td style={{ width: '25%' }}>{details.quotationNo}</td>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Date</th>
                        <td style={{ width: '25%' }}>{details.date}</td>
                      </tr>
                      <tr>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Quotation to</th>
                        <td style={{ width: '25%' }}>{details.quotationTo}</td>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Project Name</th>
                        <td style={{ width: '25%' }}>{details.projectName}</td>
                      </tr>
                      <tr>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Contact Person</th>
                        <td style={{ width: '25%' }}>{details.contactPerson}</td>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Proposal For</th>
                        <td style={{ width: '25%' }}>{details.proposalFor}</td>
                      </tr>
                      <tr>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Contact No.</th>
                        <td style={{ width: '25%' }}>{details.contactNo}</td>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Sales Person</th>
                        <td style={{ width: '25%' }}>{empDetails.salesPerson}</td>
                      </tr>
                      <tr>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Email ID</th>
                        <td style={{ width: '25%' }}>{details.emailIdCustomer}</td>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Email ID</th>
                        <td style={{ width: '25%' }}>{empDetails.emailIdSales}</td>
                      </tr>
                      <tr>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Quote Validity</th>
                        <td style={{ width: '25%' }}>{details.quoteValidity}</td>
                        <th style={{ width: '25%', backgroundColor: '#0a2990', color: 'white' }}>Contact No.</th>
                        <td style={{ width: '25%' }}>{empDetails.contactNoSales}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              <ItemList items={items.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)} />
              {pageIndex === totalPages - 1 && (
                <>
                  <div className="total-section">
                    <table>
                      <tbody>
                        <tr>
                          <td colSpan={8} style={{ textAlign: 'right', backgroundColor: '#0a2990', color: 'white' }}>Sub Total (Rs)</td>
                          <td colSpan={3}>{totalAmount}</td>
                        </tr>
                        <tr>
                          <td colSpan={8} style={{ textAlign: 'right', backgroundColor: '#0a2990', color: 'white' }}>Tax (Rs)</td>
                          <td colSpan={3}>{totalGST}</td>
                        </tr>
                        <tr>
                          <td colSpan={8} style={{ textAlign: 'right', backgroundColor: '#0a2990', color: 'white' }}>Grand Total (Rs)</td>
                          <td colSpan={3}>{totalSum}</td>
                        </tr>
                        <tr>
                          <td colSpan={8} style={{ textAlign: 'right', backgroundColor: '#0a2990', color: 'white' }}>Amount in Words:</td>
                          <td colSpan={3}>{totalSumInWords}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="terms-container">
                    <Terms />
                  </div>
                </>
              )}
              <Footer />
            </div>
          ))}
        </div>
        <center>
          <button onClick={handlePrint} style={{ marginTop: '20px', width: '50%', padding: '10px', borderRadius: 12, fontSize: 20 }}><b>Print this out</b></button>
        </center>
      </div>
    </DrawerNavigation>
  );
};

export default QuotationPage;