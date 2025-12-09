/*
 * @Author: wuqiang
 * @Date: 2024-05-31 04:00:55
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 00:16:31
 */
import "./index.scss";
import join_us_desc from "../../assets/join_us_desc.png";
// import join_us_logo from "../../assets/join_us_logo.png";

export function JoinUs() {
  return (
    <div className="join-us">
      <div className="join-us-line"></div>
      <div className="join_us_main">
        <img src={join_us_desc} className="join_us_desc" />
        {/* <strong>Powered by</strong> */}
        {/* <div className="join_us_btn">
          <img src={join_us_logo} />
        </div> */}
      </div>
    </div>
  );
}
