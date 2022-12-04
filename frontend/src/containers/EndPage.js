import AppTitle from '../components/Title';
import Result from '../components/Result';
import {useGame} from './hooks/useGame'


const EndPage = () => {
    const {me, myPoint, setMyPoint, setOver, setParticipant, setWin,  startGame} = useGame();

    const restartGame = () => {
        setOver(false)
        setWin(false);
        setMyPoint(0);
        setParticipant(false);
        startGame(me);
    }
    
  return ( 
    <>
        <AppTitle /><Result win={myPoint >= 3} onLogin={restartGame} />
    </>
  );
}

export default EndPage