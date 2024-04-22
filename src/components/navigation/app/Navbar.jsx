import React, {useState, useRef, useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import Translator from '../../i18n/Translator.jsx';
import Dropdown from './Dropdown.jsx';
import Logo from '../../icons/Logo.jsx';
import Add from '../../icons/Add.jsx';

const Navbar = () => {
  const matchDashboard = useMatch('/app/');
  const matchStats = useMatch('/app/stats');
  const matchTransactions = useMatch('/app/transactions');

  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const imageRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !imageRef.current.contains(event.target)
      ) {
        setOpenDropdown(false); // Close the dropdown if clicked outside and not on the image
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, imageRef]);

  return (
    <nav className='w-full xl:max-w-[40rem] md:max-w-[60vw] flex items-center justify-between h-12 p-2 gap-2 border-[0.05rem] mobile:border-[0.1rem] rounded-lg border-gallery bg-white'>
      <div className='flex items-center justify-center gap-4 w-8 h-8'>
        <Logo className='w-5 h-5'/>
      </div>
      <div className='flex items-center gap-1 px-2 h-8 flex-1 border-l-[0.05rem] mobile:border-l-[0.1rem] border-gallery'>
        <Link to='/app/' className={`h-8 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchDashboard ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm font-semibold hover:duration-200`}><Translator path='navbar.app.dashboard'/></Link>
        <Link to='/app/stats' className={`h-8 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchStats ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm font-semibold hover:duration-200`}><Translator path='navbar.app.stats'/></Link>
        <Link to='/app/transactions' className={`h-8 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchTransactions ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm font-semibold hover:duration-200`}><Translator path='navbar.app.transactions'/></Link>
      </div>
      <div className='flex items-center gap-1 px-2 h-8 border-x-[0.05rem] mobile:border-x-[0.1rem] border-gallery'>
        <button className='h-8 w-8 flex items-center justify-center rounded bg-royal hover:bg-persian hover:duration-200'>
          <Add className='w-5 h-5 fill-white'/>
        </button>
      </div>
      <div className='flex items-center h-8 w-8 relative'>
        <img src='../default_user.png' alt='user_image' className='h-8 w-8 absolute rounded border-[0.05rem] mobile:border-[0.1rem] border-royal cursor-pointer' ref={imageRef} onClick={(e) => {
          setOpenDropdown((prev) => !prev);
          e.stopPropagation();
        }}></img>
        { openDropdown && <Dropdown setOpenDropdown={setOpenDropdown} ref={dropdownRef}/> }
      </div>
    </nav>
  );
};

export default Navbar;
