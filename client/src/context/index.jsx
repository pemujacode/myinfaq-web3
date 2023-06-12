import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  //const { contract } = useContract('0x9f656386CdaB221CF255D6a7489B9C7049Aa2F92');
  const { contract } = useContract('0xbffACD19Eb8f37cf7E1AeA05924c0c58cD1255E4');
  

  const { mutateAsync: createInfaq } = useContractWrite(contract, 'createInfaq');

  const address = useAddress();
  const connect = useMetamask();

  const publishInfaq = async (form) => {
    try {
      const data = await createInfaq([
        address, // owner
        
        form.title, // title
        form.name,
        form.description, // description
        form.target,
        new Date(form.deadline).getTime(), // deadline,
        form.image
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getInfaqs = async () => {
    const infaqs = await contract.call('getInfaqs');

    const parsedInfaqs = infaqs.map((infaq, i) => ({
      owner: infaq.owner,
      name: infaq.name,
      title: infaq.title,
      description: infaq.description,
      target: ethers.utils.formatEther(infaq.target.toString()),
      duedate: infaq.duedate.toNumber(),
      amountCollected: ethers.utils.formatEther(infaq.amountCollected.toString()),
      image: infaq.image,
      pId: i
    }));

    return parsedInfaqs;
  }

  const getUserInfaqs = async () => {
    const allInfaqs = await getInfaqs();

    const filteredInfaqs = allInfaqs.filter((infaq) => infaq.owner === address);

    return filteredInfaqs;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('kirimInfaq', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getInfaqers', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createInfaq: publishInfaq,
        getInfaqs,
        getUserInfaqs,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);