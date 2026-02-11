import Title from "../components/Title";
import LogIn from "../components/LogIn";
import { useGame } from "./hooks/useGame";
import Wait from "./Wait";

const SignIn = () => {
  const { me, signedIn, setMe, setSignedIn, startGame } = useGame();

  const handleLogin = (name) => {
    setSignedIn(true);
    startGame(name);
  };

  return (
    <>
      <Title />
      {signedIn ? (
        <Wait />
      ) : (
        <LogIn me={me} setName={setMe} onLogin={handleLogin} />
      )}
    </>
  );
};

export default SignIn;
