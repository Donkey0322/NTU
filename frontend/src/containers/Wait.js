import '../components/css/Modal.css'
import {useGame} from './hooks/useGame'

const Wait = () => {
    const {me, setSignedIn, setMe, stopWait} = useGame();
    const EndGame = () => {
        stopWait(me);
        setMe('');
        setSignedIn(false);
    }
    return (
        <div className="modal">
            <div className="modalWrapper"></div>
            <div className="modalContent">
                <div className="modalResult">
                    Waiting for another player......
                </div>  
                <div className="modalBtnWrapper">
                    <div className="modalBtn"
                         onClick={EndGame}>
                         Stop Waiting
                    </div>
                </div>
            </div>
            <div className="modalWrapper"></div>
        </div>
        
    );
}

export default Wait