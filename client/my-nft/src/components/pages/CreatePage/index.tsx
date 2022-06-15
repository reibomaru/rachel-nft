import axios from "axios";
import { useCallback, useState } from "react";
import { useWeb3 } from "../../organisms/Web3Provider";

type nftForm = {
  description?: string;
  name?: string;
  imageUrl?: string;
  image?: Blob;
};

const CreatePage = () => {
  const { contract, account } = useWeb3();
  const [nftForm, setNftForm] = useState<nftForm>({});
  const [nftJson, setNftJson] = useState<string>("");

  const mintNFT = useCallback(async () => {
    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 1,
      },
      pinataMetadata: {
        name: `${account}_${Date.now()}`,
      },
      pinataContent: JSON.parse(nftJson),
    });

    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
      },
      data: data,
    };

    const res = await axios(config);
    const hash = res.data.IpfsHash;

    await contract.methods
      .mintNFTFromUser(`https://gateway.pinata.cloud/ipfs/${hash}`)
      .send({
        from: account,
      });
  }, [account, contract.methods, nftJson]);

  const createNftJson = useCallback(async () => {
    const data = new FormData();
    if (nftForm.image && process.env.REACT_APP_PINATA_JWT) {
      data.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
      data.append("pinataMetadata", JSON.stringify({ name: nftForm.name }));
      data.append("file", nftForm.image);
      const config = {
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
        },
        data: data,
      };
      const res = await axios(config);
      const hash = res.data.IpfsHash;
      const nftJsonObj = {
        description: nftForm.description,
        name: nftForm.name,
        image: `https://gateway.pinata.cloud/ipfs/${hash}`,
      };
      setNftJson(JSON.stringify(nftJsonObj));
    }
  }, [nftForm.description, nftForm.image, nftForm.name]);

  const updateNftForm = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      switch (event.target.name) {
        case "name":
          setNftForm((prev) => {
            return {
              ...prev,
              name: event.target.value,
            };
          });
          break;
        case "description":
          setNftForm((prev) => {
            return {
              ...prev,
              description: event.target.value,
            };
          });
          break;
        case "image":
          const files = event.target.files;
          if (files?.length) {
            const fr = new FileReader();
            fr.readAsDataURL(files[0]);
            fr.addEventListener("load", () => {
              setNftForm((prev) => {
                return {
                  ...prev,
                  imageUrl: String(fr.result),
                  image: files[0],
                };
              });
            });
          }
          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <>
      <h2>Mint NFT</h2>
      <hr />
      <div>
        <h3>Creation form</h3>
        <div>
          name:{" "}
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={updateNftForm}
          />
        </div>
        <div>
          description:{" "}
          <input
            type="text"
            name="description"
            placeholder="description"
            onChange={updateNftForm}
          />
        </div>
        <div>
          image:{" "}
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={updateNftForm}
          />
          <br />
          <img src={nftForm.imageUrl} alt="" />
        </div>
      </div>
      <div>
        <button onClick={createNftJson}>create json</button>
      </div>
      <div>
        <textarea
          name="json"
          cols={30}
          rows={10}
          defaultValue={nftJson}
          readOnly
        ></textarea>
      </div>
      <div>
        <button disabled={nftJson === ""} onClick={mintNFT}>
          create nft!
        </button>
      </div>
    </>
  );
};

export default CreatePage;
