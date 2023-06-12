import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayInfaqs = ({ title, isLoading, infaqs }) => {
  const navigate = useNavigate();

  const handleNavigate = (infaq) => {
    navigate(`/infaq-details/${infaq.name}`, { state: infaq })
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({infaqs.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && infaqs.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            Belum ada Kebutuhan Infaq
          </p>
        )}

        {!isLoading && infaqs.length > 0 && infaqs.map((infaq) => <FundCard 
          key={infaq.id}
          {...infaq}
          handleClick={() => handleNavigate(infaq)}
        />)}
      </div>
    </div>
  )
}

export default DisplayInfaqs