import { useGame } from "./hooks/useGame";
import { Spin } from "antd";

const Wait = () => {
  const { me, setSignedIn, setMe, stopWait } = useGame();
  const EndGame = () => {
    stopWait(me);
    setMe("");
    setSignedIn(false);
  };
  return (
    <div style={{ width: 300, margin: 50, textAlign: "center", height: 40 }}>
      <Spin tip="Searching for aother player..." size="large"></Spin>
    </div>
  );
};

export default Wait;
