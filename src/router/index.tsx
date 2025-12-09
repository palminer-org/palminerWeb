/*
 * @Author: wuqiang
 * @Date: 2024-01-16 13:49:31
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-03 02:42:13
 */
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from '../pages/index';
import Airdrop from '../pages/airdrop'
import NFT from '../pages/nft'

// import NoMatch from './NoMatch';

function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/airdrop' element={<Airdrop />} />
        <Route path='/nft' element={<NFT />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouterView
