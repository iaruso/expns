import React, {useState, useRef, useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import Translator from '../../i18n/Translator.jsx';
import Dropdown from '../../app/Dropdown.jsx';
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
        setOpenDropdown(false);
      }
    }
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, imageRef]);

  return (
    <nav className='w-full flex items-center justify-between h-12 mobile:h-16 p-2 mobile:px-4 gap-2 md:border-[0.05rem] mobile:border-b-[0.1rem] md:rounded-lg border-gallery bg-white'>
      <div className='flex items-center justify-center gap-4 w-8 h-8 mobile:w-10 mobile:h-10'>
        <Logo className='w-5 h-5 mobile:h-6 mobile:w-6'/>
      </div>
      <div className='flex items-center gap-1 mobile:gap-2 md:px-2 h-8 flex-1 md:border-l-[0.05rem] border-gallery'>
        <Link to='/app/' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchDashboard ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-gallery text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}><Translator path='navbar.app.dashboard'/></Link>
        <Link to='/app/stats' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchStats ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-gallery text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}><Translator path='navbar.app.stats'/></Link>
        <Link to='/app/transactions' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchTransactions ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-gallery text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}><Translator path='navbar.app.transactions'/></Link>
      </div>
      <div className='flex items-center gap-1 px-2 h-8 mobile:h-10 border-x-[0.05rem] mobile:border-x-[0.1rem] border-gallery'>
        <button className='h-8 w-8 mobile:h-10 mobile:w-10 flex items-center justify-center rounded bg-royal hover:bg-persian hover:duration-[0.4s] ease-in-out'>
          <Add className='w-5 h-5 mobile:h-6 mobile:w-6 fill-white'/>
        </button>
      </div>
      <div className='flex items-center h-8 w-8 mobile:h-10 mobile:w-10 relative z-50'>
        <img src='../default_user.png' alt='user_image' className='h-8 w-8 mobile:h-10 mobile:w-10 absolute rounded border-[0.05rem] mobile:border-[0.1rem] border-royal cursor-pointer' ref={imageRef} onClick={(e) => {
          setOpenDropdown((prev) => !prev);
          e.stopPropagation();
        }}></img>
        { openDropdown && <Dropdown setOpenDropdown={setOpenDropdown} ref={dropdownRef}/> }
      </div>
    </nav>
  );
};

export default Navbar;
