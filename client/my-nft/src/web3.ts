import Web3 from "web3";

export const getWeb3 = async () => {
  return new Promise<Web3>((resolve) => {
    window.addEventListener("load", async () => {
      const port = process.env.REACT_APP_WEB3_PORT;
      const provider = new Web3.providers.WebsocketProvider(
        `ws://127.0.0.1:${port}`
      );
      const web3 = new Web3(provider);
      console.log("using Local web3.");
      resolve(web3);
    });
  });
};
