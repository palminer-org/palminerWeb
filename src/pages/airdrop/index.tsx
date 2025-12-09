/*
 * @Author: wuqiang
 * @Date: 2024-06-01 02:09:01
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 15:04:37
 */
import { ConnectBtn, Footer, Nav } from "../../components";
import "./index.scss";
import logo from "../../assets/logo.png";
import { Activities, Rewards, Statistics } from "./components";

export default function Airdrop() {

  return (
    <div className="airdrop-page scale_box">
      <div className="header">
        <Nav />

        <img src={logo} className="web_logo" />
        <ConnectBtn />
      </div>
      <div className="content">
        <Statistics />
        <Rewards />
        <Activities />
      </div>
      <Footer />

    </div>
  );
}
