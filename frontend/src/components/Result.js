import { UserOutlined } from "@ant-design/icons";
import { Input } from 'antd'
import './css/Modal.css'

const Result = ({restartGame, win}) => {
    return (
        // Advanced TODO: Implement the structure of Modal
        // Useful Hint: style = {{opacity: 1 or 0 }}
        <div className="modal">
            <div className="modalWrapper"></div>
            <div className="modalContent">
                <div className="modalResult">
                    {win ? 'WIN' : 'YOU LOSE'}
                </div>  
                <div className="modalBtnWrapper">
                    <div className="modalBtn"
                         onClick={restartGame}>
                         Play Again
                    </div>
                </div>
            </div>
            <div className="modalWrapper"></div>
        </div>
        
    );
}

export default Result