/*
 * @Author: wuqiang
 * @Date: 2024-06-03 02:55:54
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 00:17:03
 */
import "./index.scss";
// import my_nft_bg from "../../../../assets/my_nft_bg.png";
import my_nft_airdrop from "../../../../assets/my_nft_airdrop.png";
import my_nft_rewards from "../../../../assets/my_nft_rewards.png";
import ic_share from "../../../../assets/ic_share.png";
import nft_card_avatar from "../../../../assets/nft_card_avatar.png";

export function Chapter1() {
  return (
    <section className="chapter1-page">
      <div className="section_nft">
        <div className="section_nft_left">
          <h2>Chapter 1: OG Pass NFT</h2>
          <p>
            Embrace the dawn of a new era in blockchain gaming with the OG Pass
            NFT Collection, your exclusive gateway to the immersive world of
            PalMiner. This collection of 500 unique NFTs grants early access to
            the game, bestowing upon holders a treasure trove of benefits and
            shaping the future of PalMiner's ever-evolving universe.
          </p>
        </div>
        <div className="section_nft_right">
          <div className="view_container">
            <div className="nft_card_footer">
              <div className="nft_card">
                <img src={nft_card_avatar} className="nft_avatar" />
              </div>
              <div className="nft_card_info">
                <span>My Amount: 1</span>
                <img src={ic_share} />
              </div>
              <div className="nft_card_btn">View</div>
            </div>
          </div>
        </div>
      </div>

      <div className="section_nft_function">
        <dl>
          <dt>Mine NFT Function</dt>
          <dd>
            <div className="nft_func_bg">
              <img src={my_nft_rewards} />
            </div>
            <strong>Farm rewards after game launch</strong>
          </dd>
          <dd>
            <div className="nft_func_bg">
              <img src={my_nft_airdrop} />
            </div>
            <strong>[Token Name] airdrop after game launch</strong>
          </dd>
        </dl>
      </div>

      <div className="section_my_nft">
        <h2>My Mine NFT</h2>
        <ul>
          {[...Array(6)].map((item, index) => {
            return (
              <li key={index}>
                <div className="my_nft_card">
                  <img src={nft_card_avatar} className="my_nft_avatar" />
                </div>
                <div className="my_nft_card_info">
                  <div className="my_nft_card_btn">View{item}</div>
                  <img src={ic_share} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
