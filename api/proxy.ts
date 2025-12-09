/*
 * @Author: wuqiang
 * @Date: 2024-06-04 14:43:18
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 14:50:47
 */
// api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

const apiProxy = createProxyMiddleware({
  target: process.env.VITE_API_BASE_URL || 'https://palminer-api.example.app', // Target server
  changeOrigin: true,
  // pathRewrite: {
  //   '^/api': '', // If the frontend request path has /api prefix, it can be removed here
  // },
});

export default function handler(req: any, res: any) {
  return apiProxy(req, res, (result: any) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}