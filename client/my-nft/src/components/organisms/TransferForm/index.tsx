import { useCallback, useState } from "react";
import { useWeb3 } from "../Web3Provider";

type props = {
  token: string;
};

const TransferForm = (props: props) => {
  const { contract, account } = useWeb3();
  const [to, setTo] = useState<string>("");

  const sendNft = useCallback(() => {
    (async () => {
      await contract.methods.sendMyNFT(to, props.token).send({
        from: account,
      });
    })();
  }, [account, contract.methods, props.token, to]);

  const changeTo = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setTo(event.target.value);
    },
    []
  );

  return (
    <div style={{ border: 1, borderStyle: "solid", padding: 5 }}>
      <h3>Transfer form</h3>
      <hr />
      <p>
        send to <input type="text" onChange={changeTo} value={to} />
      </p>
      <p>token: {props.token}</p>
      <button disabled={!to} onClick={sendNft}>
        send
      </button>
    </div>
  );
};

export default TransferForm;
