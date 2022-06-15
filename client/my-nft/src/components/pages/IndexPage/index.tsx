import { useCallback, useEffect, useState } from "react";
import { Contract } from "web3-eth-contract";
import NFTCard from "../../organisms/NFTCard";
import { useWeb3 } from "../../organisms/Web3Provider";

type nft = {
  token: number;
  uri: string;
};

const IndexPage = () => {
  const [nfts, setNfts] = useState<nft[]>([]);
  const { contract, account } = useWeb3();
  const updateNFTs = useCallback(
    async (account: string, contract: Contract) => {
      const res = await contract.methods.getMyNFTs().call({
        from: account,
      });
      setNfts(res);
    },
    []
  );
  useEffect(() => {
    updateNFTs(account, contract);
  }, [account, contract, updateNFTs]);
  return (
    <>
      <h2>List your NFTs</h2>
      {nfts.map((nft) => {
        return <NFTCard key={nft.token} url={nft.uri} token={nft.token} />;
      })}
    </>
  );
};

export default IndexPage;
