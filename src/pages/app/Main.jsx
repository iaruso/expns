import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useGlobalContext } from '../context/global';
import Topbar from '../components/navigation/Topbar';
import Balance from '../components/main/Balance';
import Transactions from '../components/main/Transactions';
import LogoutButton from '../components/auth/Logout.jsx';
import Statistics from '../components/main/Statistics';

function Main() {
	const { getIncomes, getExpenses, getRates } = useGlobalContext();
	const { isAuthenticated } = useAuth0();
	useEffect(() => {
		if (!isAuthenticated) {
			window.location.replace("/#");
		}
		getIncomes();
		getExpenses();
		getRates();
	}, [isAuthenticated]);

  return (
    <div className='w-[21.625rem] flex flex-col gap-2'>
			<LogoutButton />
			<Topbar value={false}/>
			<Balance/>
			<Transactions/>
			<Statistics/>
    </div>
  );
}

export default Main;
