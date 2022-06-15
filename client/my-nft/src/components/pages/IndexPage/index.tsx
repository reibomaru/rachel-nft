import { useCallback, useEffect, useMemo, useState } from "react";
import { Contract } from "web3-eth-contract";
import NFTCard from "../../organisms/NFTCard";
import { useWeb3 } from "../../organisms/Web3Provider";

const IndexPage = () => {
  const [count, setCount] = useState<number>(0);
  const { contract } = useWeb3();
  const nftCards = useMemo(() => {
    const cards: JSX.Element[] = [];
    for (let id = 1; id < count + 1; id++) {
      cards.push(<NFTCard key={id} token={id} />);
    }
    return cards;
  }, [count]);

  const updateNFTs = useCallback(async (contract: Contract) => {
    const res = await contract.methods.getCountOfAllNFTs().call();
    setCount(Number(res));
  }, []);
  useEffect(() => {
    updateNFTs(contract);
  }, [contract, updateNFTs]);
  return (
    <>
      <h2>All NFTs</h2>
      {nftCards}
    </>
  );
};

export default IndexPage;
