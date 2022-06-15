import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NFT } from "../../../models/nft";

type props = {
  token: number;
  url: string;
};

const NFTCard = (props: props) => {
  const [nftJson, setNftJson] = useState<NFT | null>(null);
  <p></p>;
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<NFT>(props.url);
        const resObj = res.data;
        setNftJson(resObj);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [props.url]);

  return (
    <div>
      <hr />
      <p>id: {props.token}</p>
      <p>url: {props.url}</p>
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
