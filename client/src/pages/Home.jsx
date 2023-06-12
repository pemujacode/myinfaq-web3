import React, { useState, useEffect } from 'react'

import { DisplayInfaqs } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [infaqs, setInfaqs] = useState([]);

  const { address, contract, getInfaqs } = useStateContext();

  const fetchInfaqs = async () => {
    setIsLoading(true);
    const data = await getInfaqs();
    setInfaqs(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchInfaqs();
  }, [address, contract]);

  return (
    <DisplayInfaqs 
      title="All Infaqs"
      isLoading={isLoading}
      infaqs={infaqs}
    />
  )
}

export default Home