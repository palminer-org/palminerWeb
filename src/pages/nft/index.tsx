/*
 * @Author: wuqiang
 * @Date: 2024-06-03 02:41:09
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-03 17:56:04
 */
import { ConnectBtn, Footer, Nav } from "../../components";
import "./index.scss";
import logo from "../../assets/logo.png";
import ic_tab_active from "../../assets/ic_tab_active.png";
import ic_tab_inactive from "../../assets/ic_tab_inactive.png";
import { useEffect, useState } from "react";
import { Chapter1 } from "./components";

export default function NFT() {
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    // Since body uses transform, fixed property is invalid
    const fixedElement = document.getElementById('tabs');

    function updatePosition() {
      
      const offsetY = window.scrollY || window.pageYOffset;
      console.log(offsetY)
      fixedElement!.style.top = `translateY(${offsetY}px)`;
    }

    window.addEventListener('scroll', updatePosition);
    updatePosition(); // Initialize position

    return () => {
      window.removeEventListener('scroll', updatePosition);
    }
  }, [])

 
  
  return (
    <div className="nft-page">
      <div className="header">
        <Nav />
        <img src={logo} className="logo" />
        <ConnectBtn />
      </div>
      <div className="content">
        <Chapter1 />
      </div>
      <div className="tabs" id='tabs'>
        <div className='split' />
        <div className={`tab ${chapter === 1 ? 'active' : ''}` } onClick={() => setChapter(1)}>
          <span>
            <img src={chapter === 1 ? ic_tab_active : ic_tab_inactive} />
          </span>
          <h2>
            <small>Chapter 1</small>
            <strong>OG Pass NFT</strong>
          </h2>
        </div>
        <div className={`tab ${chapter === 2 ? 'active' : ''}` } onClick={() => setChapter(2)}>
          <span>
            <img src={chapter === 2 ? ic_tab_active : ic_tab_inactive} />
          </span>
          <h2>
            <small>Chapter 2</small>
            <strong>Mine NFT</strong>
          </h2>
        </div>
        <div className={`tab ${chapter === 3 ? 'active' : ''}` } onClick={() => setChapter(3)}>
          <span>
            <img src={chapter === 3 ? ic_tab_active : ic_tab_inactive} />
          </span>
          <h2>
            <small>Chapter 3</small>
            <strong>NFT Staking</strong>
          </h2>
        </div>
      </div>

      <Footer />
    </div>
  );
}
