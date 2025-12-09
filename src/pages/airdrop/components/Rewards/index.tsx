/*
 * @Author: wuqiang
 * @Date: 2024-06-01 02:42:46
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 15:48:21
 */
import { useContext, useEffect, useState } from "react";
// import { useAccount } from 'wagmi';
import "./index.scss";
import subtract_green from "../../../../assets/subtract_green.png";
import subtract_grey from "../../../../assets/subtract_grey.png";
import { GlobalContext } from "../../../../context/global";
import { Button } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { copyContent } from "../../../../hooks/loads";

interface Config {
  chainId: number;
  claimKeyContractAddress: string;
  inviteFriendsMultiplierTable: Record<string, number>;
}

type ConfigResponse = {
  code: number;
  data: Config;
};

const progressData: Record<string, string> = {
  "0": "#F0B215",
  "20": "#F3981C",
  "40": "#F38925",
  "60": "#F38925",
  "80": "#F36C39",
  "100": "#F35D43",
};

// These represent the style names used when status values are 0, 1, 2
// const statusCss: Record<string, string> = {
//   "0": "",
//   "1": "verify",
//   "2": "completed",
// };

export function Rewards() {
  const { address, isConnected } = useAccount();
  const { userInfo, setUserInfo } = useContext(GlobalContext);
  const [config, setConfig] = useState<Config>();
  const [twitterStatus, setTwitterStatus] = useState(0);
  const [telStatus, setTelStatus] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/game/airdrop/web3-config`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res: ConfigResponse) => {
        if (res.data) {
          console.log("confit =>", res.data);
          setConfig(res?.data);
        }
      })
      .catch((e) => {
        console.log("e =>", e);
      });
  }, []);

  // useEffect(() => {
  //   if (address) {
  //     fetch(`/api/game/airdrop/get-user?walletAddress=${address}`,{
  //       method: 'GET'
  //     }).then(res => res.json())
  //     .then(res => {
  //       console.log('res =>', res)
  //     })
  //   }

  // }, [address])

  function verifyTask(taskName: "follow-twitter" | "join-tg") {
    setBtnLoading(true);
    setTimeout(() => {
      fetch("/api/game/airdrop/verify-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: localStorage.getItem(`signature_${address}`),
          taskName,
          walletAddress: address,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 200) {
            setUserInfo(res.data);
          }
        })
        .finally(() => setBtnLoading(false));
    }, 2000);
  }

  return (
    <div className="comp_rewards">
      <h2>TASK REWARDS</h2>
      <div className="rewards">
        <div className="rewards_item">
          <dl>
            <dt>
              <img
                src={
                  userInfo.followTwitterTask?.completed
                    ? subtract_green
                    : subtract_grey
                }
              />
              <div>
                <h2>
                  <span>Follow PalMiner Twitter Account</span>
                  <small>Once</small>
                </h2>
                <h3>Follow twitter and get 200 points</h3>
              </div>
            </dt>
            <dd>
              <span className="left">
                <strong>{userInfo.followTwitterTask?.basePoints}</strong>
                <small>POINT</small>
              </span>
              <Button
                isDisabled={
                  !isConnected || userInfo.followTwitterTask?.completed
                }
                isLoading={
                  !userInfo.followTwitterTask?.completed &&
                  twitterStatus === 1 &&
                  btnLoading
                }
                className={`right ${
                  userInfo.followTwitterTask?.completed && "completed"
                }`}
                onClick={() => {
                  if (twitterStatus === 0) {
                    setTwitterStatus(1);
                    window.open(
                      "https://x.com/intent/follow?screen_name=PalMiner_xyz"
                    );
                    return;
                  }
                  verifyTask("follow-twitter");
                }}
              >
                {userInfo.followTwitterTask?.completed
                  ? "Completed"
                  : twitterStatus === 0
                  ? "Follow"
                  : "Verify"}
                {/* {twitterStatus === 0 && "Follow"}
                {twitterStatus === 1 && "Verify"}
                {twitterStatus === 2 && "Completed"} */}
              </Button>
            </dd>
          </dl>
        </div>

        <div className="rewards_item">
          <dl>
            <dt>
              <img
                src={
                  userInfo.joinTGTask?.completed
                    ? subtract_green
                    : subtract_grey
                }
              />
              <div>
                <h2>
                  <span>Join PalMiner Telegram</span>
                  <small>Once</small>
                </h2>
                <h3>Join PalMiner Telegram and get 200 points</h3>
              </div>
            </dt>
            <dd>
              <span className="left">
                <strong>{userInfo.joinTGTask?.basePoints ?? "-"}</strong>
                <small>POINT</small>
              </span>
              <Button
                isDisabled={!isConnected || userInfo.joinTGTask?.completed}
                isLoading={
                  !userInfo.joinTGTask?.completed &&
                  telStatus === 1 &&
                  btnLoading
                }
                className={`right ${
                  userInfo.joinTGTask?.completed && "completed"
                }`}
                onClick={() => {
                  if (telStatus === 0) {
                    setTelStatus(1);
                    window.open("https://web.telegram.org/k/#@palminerxyz");
                    return;
                  }
                  verifyTask("join-tg");
                }}
              >
                {userInfo.joinTGTask?.completed
                  ? "Completed"
                  : telStatus === 0
                  ? "Join"
                  : "Verify"}
                {/* {telStatus === 0 && "Join"}
                {telStatus === 1 && "Verify"}
                {telStatus === 2 && "Completed"} */}
              </Button>
            </dd>
          </dl>
        </div>

        <div className="rewards_item">
          <dl>
            <dt>
              <img src={subtract_grey} />
              <div>
                <h2>
                  <span>Invite friends</span>
                  <small>Series</small>
                </h2>
                <h3>Invite friends to get multiplier</h3>
              </div>
            </dt>
            <dd>
              <span className="left">
                <strong>
                  {config?.inviteFriendsMultiplierTable[
                    userInfo.inviteFriendsTask?.invitedCounts ?? -1
                  ] ?? "-"}
                </strong>
                <small>Multiplier</small>
              </span>
              <Button
                className="right"
                isDisabled={!isConnected}
                onClick={() => {
                  copyContent(
                    document.getElementById("address")?.innerHTML || ""
                  );
                }}
              >
                Copy URL
              </Button>
            </dd>
          </dl>
        </div>

        <div className="rewards_item">
          <h2>Invite Friends to Get Multiplier</h2>
          <div className="progress">
            <div className="progress_invite">
              <span>Invite</span>
              <strong>
                {userInfo.inviteFriendsTask?.invitedCounts ?? "-"}
              </strong>
            </div>
            <div className="progress_mutiplier">
              <span>Multiplier</span>
              <strong>
                {config?.inviteFriendsMultiplierTable[
                  userInfo.inviteFriendsTask?.invitedCounts ?? -1
                ] ?? "-"}
                X
              </strong>
            </div>
            <div className="progress_container">
              <div className="progress_bar">
                <div className="progress_bar_inner" style={{ width: 0 }} />
              </div>
              <div className="progress_box">
                {config?.inviteFriendsMultiplierTable &&
                  Object.entries(config.inviteFriendsMultiplierTable).map(
                    (entries: [string, number]) => {
                      if (Number(entries[0]) % 20 === 0) {
                        return (
                          <div className="progress_item" key={entries[0]}>
                            <span
                              className="progress_item_mutiplier"
                              style={{ color: progressData[entries[0]] }}
                            >
                              {entries[1]}
                            </span>
                            <span
                              className="progress_item_circle"
                              style={{
                                background: `${
                                  Number(entries[0]) >=
                                  (userInfo.inviteFriendsTask
                                    ?.levelInviteCounts || 0)
                                    ? "#1E1E1E"
                                    : progressData[entries[0]]
                                }`,
                              }}
                            ></span>
                            <span className="progress_item_value">
                              {entries[0]}
                            </span>
                          </div>
                        );
                      } else {
                        return null;
                      }
                    }
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
