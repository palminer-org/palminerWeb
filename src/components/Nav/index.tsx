/*
 * @Author: wuqiang
 * @Date: 2024-05-31 03:31:58
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-03 22:58:09
 */
import './index.scss';

export function Nav() {

  return <ul className='nav'>
    <li><a href='/'>Home</a></li>
    <li><a href='/airdrop'>Airdrop</a></li>
    {/* <li><a href='/nft'>NFT</a></li> */}
  </ul>
}