import Result from "../components/Result";
import { useGame } from "./hooks/useGame";

const EndPage = () => {
  const { myPoint, restart } = useGame();
  return <Result win={myPoint >= 3} restartGame={restart} />;
};

export default EndPage;
