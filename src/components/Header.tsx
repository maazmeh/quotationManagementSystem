import React from 'react';
import '../styles.css';

const Header: React.FC = () => (
  <div className="header">
    <div className="left">
      <h1 style={{ color: '#004080' }}>Syed Engineering Co.</h1>
      <p>
        Office No. C-5 Shah Plaza, First Floor, Asghar Mall Road<br />
        Murree Road, Rawalpindi, 44000. Tel.: 051-5761026<br />
        <b>Email: info@syedengineering.com.pk</b>
      </p>
    </div>
    <div className="right">
      <img src="https://syedengineering.com.pk/wp-content/uploads/2023/07/small.png" alt="Syed Engineering Co. Logo" />
    </div>
  </div>
);

export default Header;