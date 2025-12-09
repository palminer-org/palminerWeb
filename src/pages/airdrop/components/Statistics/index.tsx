/*
 * @Author: wuqiang
 * @Date: 2024-06-01 02:24:42
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 14:08:25
 */
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import "./index.scss";
import arrow from "../../../../assets/arrow.png";
import medal0 from "../../../../assets/medal-0.png";
import medal1 from "../../../../assets/medal-1.png";
import medal2 from "../../../../assets/medal-2.png";
import { useCallback, useMemo } from "react";
import ic_copy from "../../../../assets/ic_copy.png";
import { copyContent } from "../../../../hooks/loads";
import { useContext } from "react";
import { GlobalContext } from "../../../../context/global";
import { formatPrice } from "../../../../utils";

export function Statistics() {
  const { userInfo } = useContext(GlobalContext);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  // const handleConnect = useCallback(() => {
  //   connect(chainId, connectors[0])
  // }, [])

  const medalImg = useMemo(() => {
    if ((userInfo.basePoints ?? 0) > 50000) {
      return medal2;
    }
    if ((userInfo.basePoints ?? 0) >= 25000) {
      return medal1;
    }
    return medal0;
  }, [userInfo]);

  return (
    <div className="comp_statistics">
      <div className="base">
        <small>Base Points</small>
        <strong>{formatPrice(userInfo.basePoints ?? "-")}</strong>
      </div>
      <img src={arrow} className="arrow" />
      <div className="multiplier">
        <small>Multiplier</small>
        <strong>{formatPrice(userInfo.multiplier ?? "-")}</strong>
      </div>
      <img src={arrow} className="arrow" />
      <div className="max_score">
        <small>MAX Score</small>
        <strong>{formatPrice(userInfo.maxScore ?? "-")}</strong>
        <i>Base Points X Multiplier</i>
      </div>
      <div className="user_info">
        {isConnected ? (
          <div className="login">
            <span className="address">
              {address?.slice(0, 4) + "..." + address?.slice(-4)}
            </span>
            <span className="status" onClick={handleDisconnect}>
              Disconnect
            </span>
            <div className="link-tips">Invitation URL</div>
            <span className="link">
              <strong id="address">
                {window.location.origin}/airdrop?referCode={userInfo.inviteCode}
              </strong>
              <i
                className="btn_copy"
                onClick={() => {
                  copyContent(
                    document.getElementById("address")?.innerHTML || ""
                  );
                }}
              >
                <img src={ic_copy} />
              </i>
            </span>
          </div>
        ) : (
          <div className="connect">
            <div className="btn_connect">
              <ConnectButton />
            </div>
            <div className="connect_desc">
              Connect your wallet to receive a MAX Score airdop
            </div>
          </div>
        )}

        {/* <div className='connect'>
          <div className='btn_connect'>
          
          <ConnectButton />
            </div>
          <div className='connect_desc'>Connect your wallet to receive a MAX Score airdop</div>
        </div> */}
      </div>
      <img src={medalImg} className="medal" />
    </div>
  );
}
