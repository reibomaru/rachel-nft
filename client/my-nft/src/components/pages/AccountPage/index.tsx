import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contract } from "web3-eth-contract";
import NFTCard from "../../organisms/NFTCard";
import { useWeb3 } from "../../organisms/Web3Provider";

type nft = {
  token: number;
  uri: string;
};

const AccountPage = () => {
  const [nfts, setNfts] = useState<nft[]>([]);
  const { contract } = useWeb3();
  const { accountId } = useParams();
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
    updateNFTs(accountId || "", contract);
  }, [accountId, contract, updateNFTs]);
  return (
    <>
      <h2>List your NFTs</h2>
      {nfts.map((nft) => {
        return <NFTCard key={nft.token} token={nft.token} />;
      })}
    </>
  );
};

export default AccountPage;
