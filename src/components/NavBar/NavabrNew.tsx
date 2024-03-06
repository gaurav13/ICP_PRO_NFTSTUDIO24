'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import logo from '@/assets/Img/Logo/Logo.png';
import logo2 from '@/assets/Img/Logo/Logo-2.png';
import Connect from '@/components/Connect/Connect';
import { useConnectPlugWalletStore, useThemeStore } from '@/store/useStore';
import SocialList from '@/components/SocialList/SocialList';
import { usePathname } from 'next/navigation';
import logger from '@/lib/logger';
import useLocalization from '@/lib/UseLocalization';
import { LANG } from '@/constant/language';
import useSearchParamsHook from '@/components/utils/searchParamsHook';
export default function NavBarNew() {
  // Dark Theme
  const { t, changeLocale } = useLocalization(LANG);
  const [isThemeActive, setIsThemeActive] = useState(false);

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [toggle, settoggle] = React.useState(false);
  const urlparama = useSearchParamsHook();
  const searchParams = new URLSearchParams(urlparama);
  let cRoute = searchParams.get('route'); // Editor controlls

  const navbarRef = useRef<HTMLDivElement | null>(null);
  const pressReleasediv = useRef<HTMLLinkElement | null>(null);
  const { isBlack, setIsBlack, isOpen, setIsOpen } = useThemeStore((state) => ({
    isBlack: state.isBlack,
    isOpen: state.isOpen,
    setIsBlack: state.setIsBlack,
    setIsOpen: state.setIsOpen,
  }));
  const [activeItem, setActiveItem] = useState('Home');

  const path = usePathname();
  const route = path.split('/')[1];

  const { auth, setAuth, identity, principal } = useConnectPlugWalletStore(
    (state) => ({
      auth: state.auth,
      setAuth: state.setAuth,
      identity: state.identity,
      principal: state.principal,
    })
  );

  let routes: {
    pressRelease: string;
    podcast: string;
    web3: string;
    expert: string;
    investor: string;
    event: string;
    hackathon: string;
    campaign: string;
  } = {
    pressRelease: '#pressRelease',
    podcast: '/podcasts',
    web3: '/web3-directory',
    expert: 'https://nftstudio24.com/experts-alliance/',
    investor: 'https://nftstudio24.com/experts-alliance/',
    event: '/events',
    hackathon: 'https://nftstudio24.com/hackathon/',
    campaign: '#campaign',
  };
  if (path == '/') {
    if (auth.state === 'initialized') {
      routes = {
        pressRelease: '#pressRelease',
        podcast: '/podcasts',
        web3: '/web3-directory',
        expert: 'https://nftstudio24.com/experts-alliance/',
        investor: 'https://nftstudio24.com/experts-alliance/',
        event: '/events',
        hackathon: 'https://nftstudio24.com/hackathon/',
        campaign: '#campaign',
      };
    }
  } else {
    if (auth.state === 'initialized') {
      routes = {
        pressRelease: '/?route=pressRelease',
        podcast: '/podcasts',
        web3: '/web3-directory',
        expert: 'https://nftstudio24.com/experts-alliance/',
        investor: 'https://nftstudio24.com/experts-alliance/',
        event: '/events',
        hackathon: 'https://nftstudio24.com/hackathon/',
        campaign: '/?route=campaign',
      };
    } else {
      routes = {
        pressRelease: '/?route=pressRelease',
        podcast: '/podcasts',
        web3: '/web3-directory',
        expert: 'https://nftstudio24.com/experts-alliance/',
        investor: 'https://nftstudio24.com/experts-alliance/',
        event: '/events',
        hackathon: 'https://nftstudio24.com/hackathon/',
        campaign: '/?route=campaign',
      };
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Function to toggle the class
  const toggleNavbar = () => {
    if (isOpen !== 'Sidebar') {
      settoggle((prev) => {
        if (!prev) {
          setIsOpen('Navbar');
          return true;
        } else {
          setIsOpen('');
          return false;
        }
      });
    } else {
      settoggle((prev) => !prev);
    }
  };
  // Dark Theme
  const handleButtonClick = () => {
    setIsBlack(!isBlack);
  };
  const closeNavbar = (event: any) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      toggleNavbar();
    }
  };
  useEffect(() => {
    if (toggle) {
      document.addEventListener('click', closeNavbar);
    } else {
      document.removeEventListener('click', closeNavbar);
    }

    return () => {
      document.removeEventListener('click', closeNavbar);
    };
  }, [toggle]);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      'google_translate_element'
    );
  };
  let once = false;
  useEffect(() => {
    if (!once) {
      once = true;
      var addScript = document.createElement('script');
      addScript.setAttribute(
        'src',
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    }
  }, []);
  let makeActiveItem = (e: any) => {
    setActiveItem(e);
  };
  useEffect(() => {
    logger(activeItem, 'AAAAAAAAA');
  }, [activeItem]);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#')) {
      let newpath = hash.slice(1);
      makeActiveItem(newpath);
    } else {
      if (route != '') {
        makeActiveItem(route);
      }
    }
  }, []);

  return (
    <>
      {route !== 'super-admin' && (
        <>
          {/* <p
        style={
          toggle
            ? {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: '0px',
                left: '0px',
                bottom: '0px',
                zIndex: 2,
              }
            : { display: 'none' }
        }
        onClick={() => {
          logger('CLICKed');
          if (toggle) {
            toggleThemeClass();
          }
        }}
      /> */}
          <Navbar
            expand='lg'
            expanded={toggle}
            id='him'
            className='bg-body-tertiary my-nav new'
            ref={navbarRef}
          // style={{ zIndex: 1 }}
          >
            <div className='navbar-inner'>
              {/* <Container fluid> */}
              <Navbar.Brand>
                <Link href='/'>
                  <Image src={logo} alt='Logo' />
                  <Image src={logo2} alt='Logo' />
                </Link>
              </Navbar.Brand>
              <div className='d-flex-mobee'>
                <Navbar.Toggle
                  aria-controls='navbarScroll'
                  onClick={toggleNavbar}
                />
              </div>
              <Navbar.Collapse id='navbarScroll'>
                <Nav className='me-auto my-lg-0 my-2' navbarScroll>
                  <Nav.Link
                    as={Link}
                    href='/'
                    className={`${activeItem == 'Home' ? 'active' : ''
                      } nav-link`}
                    onClick={() => {
                      toggleNavbar();
                      makeActiveItem('Home');
                    }}
                  >
                    {/* <div className='img'>
                    <Image src={home1} alt='Home' />
                    <Image src={home2} alt='Home' />
                  </div> */}
                    {t('Home')}
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href={routes.pressRelease}
                    // ref={pressReleasediv}
                    className={`${activeItem == 'pressRelease' ? 'active' : ''
                      } no-color`}
                    onClick={() => {
                      toggleNavbar();
                      makeActiveItem('');
                    }}
                  >
                    {/* <div className='img'>
                    <Image src={folder1} alt='Directory' />
                    <Image src={folder2} alt='Directory' />
                  </div> */}
                    {t('Press Release')}
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href={routes.podcast}
                    onClick={() => makeActiveItem('podcasts')}
                    className={`${activeItem == 'podcasts' ? 'active' : ''}`}
                  >
                    {t('Podcast')}
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href={routes.web3}
                    onClick={() => {
                      toggleNavbar();
                      makeActiveItem('Directory');
                    }}
                    className={`${activeItem == 'web3-directory' ? 'active' : ''
                      }`}
                  >
                    {/* <div className='img'>
                    <Image src={cup1} alt='Diamond' />
                    <Image src={cup2} alt='Diamond' />
                  </div> */}
                    {t('Directory')}
                    <span className='batch'>{t('Web3')}</span>
                  </Nav.Link>
                  <Nav.Link as={Link} href={routes.expert}>
                    {t('Experts')} <span className='blue'>{t('Alliance')}</span>
                    {/* Expert <p>Alliance</p> */}
                  </Nav.Link>
                  <Nav.Link as={Link} href={routes.investor}>
                    {t('Investors')}{' '}
                    <span className='blue'>{t('Alliance')}</span>
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href={routes.event}
                    onClick={() => makeActiveItem('Events')}
                    className={`${activeItem == 'events' ? 'active' : ''}`}
                  >
                    {t('Events')}
                  </Nav.Link>
                  <Nav.Link as={Link} href={routes.hackathon}>
                    {t('Hackathon')}
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    href={routes.campaign}
                    className={`${activeItem == 'campaign' ? 'active' : ''}`}
                    onClick={() => makeActiveItem('campaign')}
                  >
                    {t('Campaigns')}
                  </Nav.Link>
                  {/* <SocialList /> */}
                </Nav>

                {/* <div id='google_translate_element' className='width-80'></div> */}

                <div className='d-flex'>
                  <Button
                    className={`themebtn ${isThemeActive ? 'active' : ''}`}
                    onClick={() => {
                      // toggleThemeClass();
                      handleButtonClick(); // Call your handleButtonClick function here
                    }}
                  >
                    <i className='fa fa-sun-o'></i>
                    <i className='fa fa-moon-o'></i>
                  </Button>
                  {/* <Nav.Link href='#;' className='link-btn empty'>
                My Reward
              </Nav.Link>
              <Nav.Link href='#;' className='link-btn empty'>
                <Image src={iconbook} alt='iconbook' />{t('guide book')}
              </Nav.Link> */}
                  {/* <Nav.Link href="#;" className='link-btn logedin'>
                <div className='img-pnl'>
                  <Image src={icongirl} alt='icongirl' />
                </div>
                <div className='txt-pnl'>
                  <h6>Neha Ali</h6>
                  <span><Image src={Infinity} alt='Infinity' /> 500</span>
                </div>
              </Nav.Link> */}
                  {/* <div className='profile-btn'>
                <NavDropdown
                  title={
                    <>
                      <div className='link-btn logedin'>
                        <div className='img-pnl'>
                          <Image src={icongirl} alt='icongirl' />
                        </div>
                        <div className='txt-pnl'>
                          <h6>Neha Ali</h6>
                          <span>
                            <Image src={Infinity} alt='Infinity' /> 500
                          </span>
                        </div>
                      </div>
                    </>
                  }
                  id='basic-nav-dropdown'
                >
                  <NavDropdown.Item>
                    <Link href={'/profilen'}>
                      <div className='d-flex'>
                        <div>
                          <Image src={Profileicon} alt='Profileicon' />
                        </div>
                        <div>
                          <h6>Username</h6>
                          <p>0x717d...74a</p>
                        </div>
                      </div>
                    </Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='#;'>
                    <Image src={User} alt="user" /> My Profile
                  </NavDropdown.Item>
                  <Link href='/dashboardn' className='dropdown-item'>
                    <Image src={cup1} alt="user" />{t('my rewards')}
                  </Link>
                  <Link href='/settingsn' className='dropdown-item'>
                    <Image src={setting} alt="user" /> Settings
                  </Link>
                  <Link href='/settingsn' className='dropdown-item'>
                    <Image src={feedback} alt="user" /> Feedback
                  </Link>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className='disconnect-btn'>
                    <i className='fa fa-sign-out'></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
              <Nav.Link
                style={{ display: 'none' }}
                href='#;'
                className='link-btn'
              >
                Sign In
              </Nav.Link> */}
                  <Connect hideUser />
                </div>
              </Navbar.Collapse>
              {/* </Container> */}
            </div>
          </Navbar>
        </>
      )}
    </>
  );
}
