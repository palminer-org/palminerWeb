/*
 * @Author: wuqiang
 * @Date: 2024-05-31 02:32:48
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 04:21:33
 */
import { useEffect } from "react";
//import { useInViewport } from "ahooks";
import { listenIndexMousemove } from "../../hooks/loads";
import "./index.scss";

import header from "../../assets/header.png";
import {
  Community,
  ConnectBtn,
  Footer,
  Game,
  GameScenes,
  JoinUs,
  Nav,
  ScrollNotice,
} from "../../components";
import logo from "../../assets/logo.png";
import title from "../../assets/ai_palminer.png";
import sailingsoon from "../../assets/desc.png";
import sprite from "../../assets/sprite.gif";
import header_logo_1 from "../../assets/header_logo_1.png";
import header_logo_2 from "../../assets/header_logo_2.png";
import header_logo_3 from "../../assets/header_logo_3.png";

export default function Index() {
  useEffect(() => {
    document
      .querySelector(".header")
      ?.addEventListener("mousemove", listenIndexMousemove);
    return () => {
      document.removeEventListener("scroll", listenIndexMousemove);
    };
  }, []);

  return (
    <div className="index-page scale_box">
      <header className="header">
        <img src={header} />
        <img src={logo} className="logo" />
        <ConnectBtn />
        <div className="header_main">
          <img src={sprite} className="header_main_left" />
          <div className="header_main_right">
            <img src={title} className="title" />
            <img src={sailingsoon} className="sailingsoon" />
            <div className="btn_event_group">
              <a href="/airdrop" className="btn">
                Airdrop Event
              </a>
              <a href="/game" className="btn">
                Start Game
              </a>
            </div>
          </div>
        </div>
        <div className="header_logos">
          <a href="https://x.com/PalMiner_xyz" target="_blank">
            <img src={header_logo_1} />
          </a>
          <a>
            <img src={header_logo_2} />
          </a>
          <a href="https://t.me/palminerxyz" target="_blank">
            <img src={header_logo_3} />
          </a>
        </div>
        <Nav />
      </header>
      <ScrollNotice text={"Join the PalMiner Community"} />
      <GameScenes />
      <Community />
      <Game />
      <JoinUs />
      <Footer />
    </div>
  );
}
