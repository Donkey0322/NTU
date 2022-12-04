import AppTitle from '../components/Title';
import LogIn from '../components/LogIn';
import {useGame} from './hooks/useGame'


const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus, startGame } = useGame();
    const handleLogin = (name) => {
    if (!name)
        displayStatus({
            type: "error",
            msg: "Missing user name",
        });
    else{
        setSignedIn(true);
        startGame(name)
    } 
  }
  return ( 
    <>
        <AppTitle /><LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
  );
}

export default SignIn