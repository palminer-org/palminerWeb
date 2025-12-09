/*
 * @Author: wuqiang
 * @Date: 2024-05-31 02:51:51
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 23:14:15
 */
import "./index.scss";
import logo from "../../assets/logo.png";
import ic_logo_1 from "../../assets/ic_logo_1.png";
// import ic_logo_2 from "../../assets/ic_logo_2.png";
// import ic_logo_3 from "../../assets/ic_logo_3.png";
import ic_logo_4 from "../../assets/ic_logo_4.png";

export function Footer() {
  return (
    <div className="footer">
      <div className="footer_left">
        <h2>Info</h2>
        <div className="info">
          <div className="info_left">
            <a>FAQ</a>
            <a>Whitepaper</a>
            <a>Documentation</a>
          </div>
          <div className="info_right">
            <a>Press</a>
            <a>Licenses</a>
            <a>Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className='footer_center'>
      <img src={logo} className="footer_center" />
      <span>Copyright © 2024 Palminer All Rights Reserve</span>
      </div>
      <div className="footer_right">
        <div className="footer_follow_us">
          <h2>Follow Us</h2>
          <div className="footer_logos">
            <a href='https://x.com/PalMiner_xyz' target='_blank'><img src={ic_logo_1} /></a>
            {/* <img src={ic_logo_2} /> */}
            {/* <img src={ic_logo_3} /> */}
            <a href='https://t.me/palminerxyz' target='_blank'><img src={ic_logo_4} /></a>
          </div>
        </div>
        {/* <div className="footer_copyright">
          Copyright © 2024 Palminer All Rights Reserve
        </div> */}
      </div>
    </div>
  );
}
