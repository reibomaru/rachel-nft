import { useWeb3 } from "../Web3Provider";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { web3, account, balance } = useWeb3();
  const navigate = useNavigate();
  return (
    <>
      <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Rachel NFT
      </h1>
      your account: {account}
      <br />
      your balance: {web3.utils.fromWei(balance)} ETH
      <ul>
        <li>
          <Link to={"/nfts/new"}>Mint NFT</Link>
        </li>
        <li>
          <Link to={`/${account}`}>List your NFTs</Link>
        </li>
        <li>
          <Link to={"/nfts"}>List all NFTs</Link>
        </li>
      </ul>
      <hr />
    </>
  );
};

export default Header;
