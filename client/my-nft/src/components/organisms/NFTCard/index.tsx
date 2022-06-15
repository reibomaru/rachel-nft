import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NFT } from "../../../models/nft";
import { useWeb3 } from "../Web3Provider";

type props = {
  token: number;
};

const NFTCard = (props: props) => {
  const [nftJson, setNftJson] = useState<NFT | null>(null);
  const [jsonUrl, setJsonUrl] = useState<string>();
  const { contract } = useWeb3();

  useEffect(() => {
    (async () => {
      const url = await contract.methods.tokenURI(props.token).call();
      setJsonUrl(url);
    })();
  }, [contract.methods, props.token]);

  useEffect(() => {
    (async () => {
      if (jsonUrl) {
        try {
          const res = await axios.get<NFT>(jsonUrl);
          const resObj = res.data;
          setNftJson(resObj);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [jsonUrl]);

  return (
    <div>
      <hr />
      <p>id: {props.token}</p>
      <p>url: {jsonUrl}</p>
      <p>name: {nftJson && nftJson.name}</p>
      <p>description: {nftJson && nftJson.description}</p>
      {nftJson ? <img src={nftJson.image} alt="" /> : "image not found"}
      <div>
        <button>
          <Link to={`/nfts/${props.token}`}>view detail</Link>
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
