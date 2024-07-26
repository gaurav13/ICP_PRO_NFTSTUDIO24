'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Container, Navbar, Button } from 'react-bootstrap';
import logo from '@/assets/Img/Logo/Logo.png';
import logo2 from '@/assets/Img/Logo/Logo-2.png';
import Connect from '@/components/Connect/Connect';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
export default function NavBarDash({ handleButtonClick }: any) {
  // Initialize state for the button's class
  const [isThemeActive, setIsThemeActive] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { t, changeLocale } = useLocalization(LANG);
  const toggleThemeClass = () => {
    setIsThemeActive(!isThemeActive);
  };
  return (
    <>
      <Navbar expand='lg' className='bg-body-tertiary dashboard-nav'>
        <Container>
          <div className='nav-top'>
            <Navbar.Brand href='/'>
              <Image src={logo} alt='NFTスタジオ24' />
              <Image src={logo2} alt='NFTスタジオ24' />
            </Navbar.Brand>
            <div>
              <Button
                className={`themebtn ${isThemeActive ? 'active' : ''}`}
                onClick={() => {
                  toggleThemeClass();
                  logger(
                    'NETWORK',
                    process.env.NEXT_PUBLIC_ENTRY_CANISTER_ID,
                    'NETWORK',

                    process.env.NEXT_PUBLIC_COLLECTION_CANISTER_ID,
                    'NETWORK',

                    process.env.DFX_NETWORK,
                    'NETWORK',
                    process.env.NEXT_PUBLIC_NFTSTUDIO24_CANISTER_ID
                  );

                  handleButtonClick(); // Call your handleButtonClick function here
                }}
              >
                <i className='fa fa-sun-o' />
                <i className='fa fa-moon-o' />
              </Button>
              {/* <div className='profile-btn'>
                <NavDropdown
                  title={<Image src={Profileicon} alt='Profileicon' />}
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item href='profilen'>
                    <div className='d-flex'>
                      <div>
                        <Image src={Profileicon} alt='Profileicon' />
                      </div>
                      <div>
                        <h6>Username</h6>
                        <p>0x717d...74a</p>
                      </div>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#;'>
                    <i className='fa fa-globe'/>Explore
                  </NavDropdown.Item>
                  <NavDropdown.Item href='#;'>
                    <i className='fa fa-th-large'/>Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item href='#;'>
                    <i className='fa fa-gear'/> Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/entriesn"><i className='fa fa-th-large'/>Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="/settingsn"><i className='fa fa-gear'/> Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={methods.logout} className='disconnect-btn'>
                    <i className='fa fa-sign-out'/> Disconnect
                  </NavDropdown.Item>
                </NavDropdown>
              </div>

              <Button className='connect-btn'>Create</Button> */}
              <Connect />
              <Button className='connect-btn'>{t('Subscribe')}</Button>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
