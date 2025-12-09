/*
 * @Author: wuqiang
 * @Date: 2024-06-01 02:49:11
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 16:18:36
 */
import "./index.scss";
import ic_claim from "../../../../assets/ic_claim.png";
// import ic_claim_disable from "../../../../assets/ic_claim_disable.png";
import ic_open from "../../../../assets/ic_open.png";
import { useClaim } from "../../../../hooks/claim";
import {
  // Alert,
  // AlertDescription,
  // AlertIcon,
  // AlertTitle,
  Button,
  // Popover,
  // PopoverArrow,
  // PopoverBody,
  // PopoverContent,
  // PopoverTrigger,
  // Portal,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import Modal from "react-modal";
import { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../context/global";
import { useLocalStorageState } from "ahooks";

export function Activities() {
  const { address, isConnected } = useAccount();
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  const { write, status, data } = useClaim();
  const [isOpen, setIsOpen] = useState(false);
  const [isReceiveSuccess, setIsReceiveSuccess] = useState(false);
  const [getPoint, setGetPoint] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const [countOfToday = 0, setCountOfToday] = useLocalStorageState<number>(
    `${today}_count`,
    {
      defaultValue: 0,
    }
  );
  const [openBoxLoading, setOpenBoxLoading] = useState(false);

  const customStyles = {
    content: {
      left: "0px",
      top: "0px",
      position: "fixed",
      right: "0px",
      bottom: "0px",
      background: "rgba(0,0,0,0.8)",
    },
  };

  const toggleModal = useCallback(() => {
    setIsOpen(!open);
  }, []);

  const toggleReceive = useCallback(() => {
    setIsReceiveSuccess(!isReceiveSuccess);
  }, [isReceiveSuccess]);

  function updateProfile() {
    fetch(`/api/game/airdrop/get-user?walletAddress=${address}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setUserInfo(data.data);
        }
      });
  }

  useEffect(() => {
    if (status === "success" && data) {
      const totalKeyCounts = Number(countOfToday) + 1;
      fetch("/api/admin/airdrop/claim-key-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "test",
          totalKeyCounts,
          walletAddress: address,
        }),
      }).then(() => {
        setCountOfToday(totalKeyCounts);
        updateProfile();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, data, status]);

  return (
    <div className="comp_activities">
      <div className="claim_keys">
        <p>
          Receive 3 keys daily (UTC 0:00), which can be used to unlock treasure
          cases and earn Base Points
        </p>
        <div className="claims">
          <img src={ic_claim} />
          <img src={ic_claim} />
          <img src={ic_claim} />
          {/* Use the image below when not claimable */}
          {/* <img src={ic_claim_disable} /> */}
        </div>
        <span>
          Keys to be collected: <strong>{3 - countOfToday}</strong>
        </span>
        <Button
          className={`btn_activity ${
            !isConnected || (3 - countOfToday < 1 && "disabled")
          }`}
          onClick={() => {
            setIsOpen(true);
            write();
          }}
          isDisabled={!isConnected || 3 - countOfToday < 1}
          isLoading={status === "pending"}
        >
          Claim Keys
        </Button>
      </div>
      <div className="open">
        <img src={ic_open} />
        <span>
          Keys Count: <strong>{userInfo.keyCounts ?? "-"}</strong>
        </span>
        <Button
          isLoading={openBoxLoading}
          isDisabled={!isConnected || (userInfo.keyCounts ?? 0) < 1}
          className={`btn_activity ${
            (userInfo.keyCounts ?? 0) < 1 && "disabled"
          }`}
          onClick={() => {
            setOpenBoxLoading(true);
            fetch("/api/game/airdrop/open-case-task", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                signature: localStorage.getItem(`signature_${address}`),
                walletAddress: address,
              }),
            })
              .then((res) => res.json())
              .then((res) => {
                setGetPoint(res.data.points);
                setIsReceiveSuccess(true);
                updateProfile();
              })
              .finally(() => {
                setOpenBoxLoading(false);
              });
          }}
        >
          Open
        </Button>
      </div>

      <Modal
        isOpen={isOpen && ["success", "error"].includes(status)}
        onRequestClose={toggleModal}
        ariaHideApp={false}
        style={customStyles as never}
        contentLabel="Example Modal"
      >
        {status === "success" ? (
          <div className="comp_modal">
            <h2 className="comp_modal_title">Key claim request successful</h2>
            <p className="comp_modal_desc">
              The key will be obtained within 2 minutes and can be used to open
              the box upon receipt.
            </p>
            <button className="comp_modal_btn" onClick={toggleModal}>
              Got it
            </button>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="comp_modal">
            <h2 className="comp_modal_title">Claim failed</h2>
            <button className="comp_modal_btn" onClick={toggleModal}>
              Got it
            </button>
          </div>
        ) : null}
      </Modal>

      <Modal
        isOpen={isReceiveSuccess}
        onRequestClose={toggleReceive}
        style={customStyles as never}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div className="comp_modal">
          <h2 className="comp_modal_title" style={{ color: "#fff" }}>
            Congratulations
          </h2>
          <h3 className="comp_modal_points">
            <strong>{getPoint}</strong>
            <small>POINT</small>
          </h3>
          <button
            className="comp_modal_btn"
            onClick={() => setIsReceiveSuccess(false)}
          >
            Got it
          </button>
        </div>
      </Modal>
    </div>
  );
}
