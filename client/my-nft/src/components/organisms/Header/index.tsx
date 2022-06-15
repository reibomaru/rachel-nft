import { useWeb3 } from "../Web3Provider";
import { Link } from "react-router-dom";

const Header = () => {
  const { web3, account, balance } = useWeb3();
  return (
    <>
      <h1>my-nft</h1>
      your account: {account}
      <br />
      your balance: {web3.utils.fromWei(balance)} ETH
      <ul>
        <li>
          <Link to={"/nfts/new"}>Mint NFT</Link>
        </li>
        <li>
          <Link to={"/nfts"}>List your NFTs</Link>
        </li>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
      </ul>
      <hr />
    </>
  );
};

export default Header;
