/*eslint-disable */
import React  from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-default">
      <div className="container">
        <div className="copyright float-right">
          &copy;
          <span>&nbsp;{new Date().getFullYear()}</span>
          , bản quyền thuộc về&nbsp;
          <a style={{ color: 'blue'}} href="https://azinvex.com" target="_blank">AZINVEX</a>
        </div>
      </div>
    </footer>
  )
}
export default Footer;
