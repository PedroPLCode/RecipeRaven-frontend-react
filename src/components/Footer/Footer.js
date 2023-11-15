import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <MDBFooter className='bg-primary text-center text-white mt-3 fixed-bottom'>
      <MDBContainer className='p-3'>
        <Link to='https://github.com/PedroPLCode/' >
          Pedro GitHub profile
        </Link>
      </MDBContainer>
    </MDBFooter>
  );
}

export default Footer;