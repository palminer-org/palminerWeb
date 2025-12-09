/*
 * @Author: wuqiang
 * @Date: 2024-05-31 02:24:40
 * @LastEditors: wuqiang
 * @LastEditTime: 2024-06-04 04:50:54
 */
import { useEffect, useState } from "react";
import "./App.css";
import { afterCommonLoad } from "./hooks/loads";
import RouterView from "./router";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { GlobalContext, UserInfo } from "./context/global";
import { useToast } from "@chakra-ui/react";

function App() {
  const [userInfo, setUserInfo] = useState({});
  const { address } = useAccount();
  const { signMessage, isError, isSuccess, isPending, data } = useSignMessage();
  const { disconnect } = useDisconnect();
  const toast = useToast();
  useEffect(() => {
    afterCommonLoad();

    const queryParams = new URLSearchParams(location.search);
    const referCode = queryParams.get("referCode");
    if (referCode) {
      localStorage.setItem("referCode", referCode);
    }
  }, []);

  useEffect(() => {
    if (isError) {
      disconnect();
    }
  }, [disconnect, isError]);

  useEffect(() => {
    if (address && isSuccess && data) {
      localStorage.setItem(`signature_${address}`, data);
      if (!Object.keys(userInfo).length) {
        fetch("/api/game/airdrop/connect-wallet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            referCode: localStorage.getItem("referCode") || "",
            signature: data,
            walletAddress: address,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.code === 200) {
              setUserInfo(data.data);
            } else {
              disconnect();
              if (data.enMsg) {
                toast({
                  position: "top",
                  title: data.enMsg,
                  status: "error",
                  isClosable: true,
                });
              }
              if (data.code === 40004) {
                localStorage.removeItem("referCode");
                if (location.href.includes("referCode=")) {
                  setTimeout(() => {
                    location.href = location.href.replace(/referCode.+/, "");
                  }, 2500);
                }
              }
            }
          })
          .catch(() => disconnect());
      }
    }
  }, [address, data, disconnect, isSuccess, signMessage, toast, userInfo]);

  useEffect(() => {
    if (address) {
      if (!localStorage.getItem(`signature_${address}`)) {
        signMessage({ message: "Request login to palminer.com" });
      }
      fetch(`/api/game/airdrop/get-user?walletAddress=${address}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            setUserInfo(data.data);
          }
          if (data.code === 40002 && !isPending) {
            // user not exist
            signMessage({ message: "Request login to palminer.com" });
          }
        })
        .catch(() => disconnect());
    } else {
      setUserInfo({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, disconnect, signMessage]);
  return (
    <GlobalContext.Provider
      value={{
        userInfo,
        setUserInfo: (info: UserInfo) => {
          setUserInfo(info);
        },
      }}
    >
      <RouterView></RouterView>
    </GlobalContext.Provider>
  );
}

export default App;
