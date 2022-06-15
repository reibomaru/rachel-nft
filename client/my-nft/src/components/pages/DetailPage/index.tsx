import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useWeb3 } from "../../organisms/Web3Provider";
import { NFT } from "../../../models/nft";
import TransferForm from "../../organisms/TransferForm";

const DetailPage = () => {
  const { token } = useParams();
  const { contract, account, events } = useWeb3();
  const [nft, setNft] = useState<NFT | null>(null);
  const [owner, setOwner] = useState<string>("");

  const updateDisplay = useCallback(async () => {
    const tokenUri = await contract.methods.tokenURI(token).call();
    const owner = await contract.methods.ownerOf(token).call();
    const res = await axios.get(tokenUri);
    setNft({ ...res.data, owner: owner });
    setOwner(owner);
  }, [contract.methods, token]);

  useEffect(() => {
    updateDisplay();
  }, [updateDisplay]);

  useEffect(() => {
    events.Transfer(
      { filter: [{ _to: account }, { _from: account }] },
      async (err: Error, event: any) => {
        if (err) console.error(err);
        else {
          console.log("update!");
          window.location.reload();
        }
      }
    );
  }, [account, events, updateDisplay]);

  return (
    <>
      {nft ? (
        <>
          <h2>{nft.name}</h2>
          <hr />
          <div>
            <img src={nft.image} alt="" />
          </div>
          <p>description: {nft.description}</p>
          <p>owner: {owner}</p>
          {owner === account && token && <TransferForm token={token} />}
        </>
      ) : (
        <p>読み込み中</p>
      )}
    </>
  );
};

export default DetailPage;
