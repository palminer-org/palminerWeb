/*
 * @Author: wuqiang
 * @Date: 2024-05-31 04:37:01
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-05-31 22:56:20
 */
import './index.scss';
import game_obj_paloo from '../../assets/game_obj_paloo.png';
import game_obj_mines from '../../assets/game_obj_mines.png';
import game_obj_device from '../../assets/game_obj_device.png';

export function Game() {
  return <div className='game'>
    <div className='red'>
      <img src={game_obj_paloo} />
      <h2>Paloo</h2>
      <p>Faithful companions who assist you in discovering and extracting resources.</p>
    </div>
    <div className='blue'>
      <img src={game_obj_mines} />
      <h2>Mines</h2>
      <p>Mines often hold rich resources and hidden treasures.</p>
    </div>
    <div className='green'>
      <img src={game_obj_device} />
      <h2>Energy Device</h2>
      <p>Convert extracted resources into energy to rebuild your home.</p>
    </div>
  </div>
}