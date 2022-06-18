import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import MyNFTV2 from "../../../contracts/RachelV2.sol/RachelV2.json";
import {
  CONTRACT_ADDRESS,
  WEBSOCKET_HOST,
  MUMBAI_CONTRACT_ADDRESS,
  MUMBAI_WEBSOCKET_HOST,
} from "../../../config";

type web3Context = {
  web3: Web3;
  chainId: number;
  contract: Contract;
  account: string;
  balance: string;
  events: any;
};

const Web3Context = createContext<web3Context | null>(null);

type web3ProviderProps = {
  children: React.ReactNode;
};

const Web3Provider = (props: web3ProviderProps) => {
  const [web3Obj, setWeb3Obj] = useState<web3Context | null>(null);

  useEffect(() => {
    window.ethereum.on("accountsChanged", () => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
      window.location.reload();
    });

    window.ethereum.on("chainChanged", () => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });
  }, []);

  const selectContractAddress = useCallback((chainId: number) => {
    console.log(chainId);
    if (chainId === 5) {
      return CONTRACT_ADDRESS;
    } else if (chainId === 80001) {
      return MUMBAI_CONTRACT_ADDRESS;
    }
  }, []);

  const selectWebSocketHost = useCallback((chainId: number) => {
    if (chainId === 5) {
      return WEBSOCKET_HOST;
    } else if (chainId === 80001) {
      return MUMBAI_WEBSOCKET_HOST;
    }
  }, []);

  useEffect(() => {
    (async () => {
      const provider = await detectEthereumProvider({ mustBeMetaMask: true });
      if (provider && window.ethereum?.isMetaMask) {
        console.log("Welcome to MetaMask User🎉");
        const web3 = new Web3(Web3.givenProvider);
        const chainId = await web3.eth.getChainId();
        const contractAddress = selectContractAddress(chainId);
        const webSocketHost = selectWebSocketHost(chainId);

        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];

        const balance = await web3.eth.getBalance(accounts[0]);

        const contract = new web3.eth.Contract(
          MyNFTV2.abi as any,
          contractAddress
        );

        if (webSocketHost) {
          const provider = new Web3.providers.WebsocketProvider(webSocketHost);
          const web3EventListner = new Web3(provider);

          const _contract = new web3EventListner.eth.Contract(
            MyNFTV2.abi as any,
            CONTRACT_ADDRESS
          );

          setWeb3Obj({
            web3: web3,
            chainId,
            contract,
            account,
            balance,
            events: _contract.events,
          });
        }
      } else {
        console.log("Please Install MetaMask🙇‍♂️");
      }
    })();
  }, [selectContractAddress, selectWebSocketHost]);

  return (
    <>
      {web3Obj ? (
        <Web3Context.Provider value={web3Obj}>
          {props.children}
        </Web3Context.Provider>
      ) : (
        <p>読み込み中です</p>
      )}
    </>
  );
};

export default Web3Provider;
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context) {
    return context;
  } else {
    throw new Error(`web3との接続に失敗しました。context is ${context}`);
  }
};
