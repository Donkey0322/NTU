import AppTitle from '../components/Title';
import Result from '../components/Result';
import {useGame} from './hooks/useGame'


const EndPage = () => {
    const {me, myPoint, setMyPoint, setOver, setParticipant, startGame} = useGame();

    const restartGame = () => {
        console.log('here restart')
        setOver(false);
        setMyPoint(0);
        setParticipant(false);
        startGame(me);
    }
    
  return ( 
    <>
        <AppTitle /><Result win={myPoint >= 3} restartGame={restartGame} />
    </>
  );
}

export default EndPage