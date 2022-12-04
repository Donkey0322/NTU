import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Input, Tabs} from 'antd';
import {useGame} from './hooks/useGame'
import styled from "styled-components";
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal'

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;
const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`;
const FootRef = styled.div`
    height: 20px;   
`;

{/* <div className="App-title">
    <h1>Simple Chat</h1>
    <Button type="primary" danger onClick={clearMessages}>
    Clear
    </Button>
</div> */}
{/* { displayMessage() } */}


const ChatRoom = () => {

    const { status, messages, me, sendMessage, displayStatus, startChat } = useGame();  
    const [body, setBody] = useState('');
    const bodyRef = useRef(null);
    const [msgSent, setMsgSent] = useState(false);
    const msgFooter = useRef(null);
    const [activeKey, setActiveKey] = useState('');
    const [chatBoxes, setChatBoxes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    
    const renderChat = (chat) => {
        console.log('here is renderchat:', chat);
        return(
            <ChatBoxWrapper>    
                {chat.map(({ body, name }, i) => (
                <Message isMe={name === me} message={body} key={i}/>
                ))}   
                <FootRef id={activeKey} />
            </ChatBoxWrapper>
        )
    }; // 產生 chat 的 DOM nodes

    const extractChat = () => {
        return renderChat(messages);
    };

    const scrollToBottom = () => {
        const footer = document.getElementById(activeKey);
        footer?.scrollIntoView({ behavior: 'smooth', block: "start" });
    };

    useEffect(() => {
        if(activeKey !== ''){  
            const chat = extractChat();
            console.log('now chat is', chat);
            var recentBoxes = chatBoxes;
            var index = recentBoxes.findIndex(item => item.key === activeKey);
            setMsgSent(true);
            if(index !== -1){
                console.log('here reset box', index);
                recentBoxes[index].children = chat;
                setChatBoxes(recentBoxes);    
            }
            else{
                setChatBoxes([...chatBoxes,
                    { label: activeKey, children: chat, key: activeKey}]);
            }}
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
        console.log('scroll to bottom');
    }, [msgSent]);

    useEffect(() => {
        displayStatus(status)
    }, [status]);

    const createChatBox = (friend) => {
        // if (chatBoxes.some(({key}) => key === friend)) {
        //     throw new Error(friend +"'s chat box has already opened.");
        // }
        console.log('start chat');
        startChat(me, friend);
        return friend;
        };
    
    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey);
        var next = '';
        if(chatBoxes.length !== 1){
            next = chatBoxes[1].key;
        }           
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey);
        console.log(newChatBoxes);
        setChatBoxes(newChatBoxes);
        return(
            targetKey != activeKey ? activeKey : index === 0 ? next : chatBoxes[index - 1].key
            // activeKey ? activeKey === targetKey ? index === 0 ? '' : chatBoxes[index - 1].key : activeKey : ''
        ); 
    };

    return (<>
        <Title name={me} />
        <>
        <ChatBoxesWrapper
            type="editable-card"
            onChange={(key) => {
                setActiveKey(key);
                createChatBox(key)
            }}
            activeKey = {activeKey}
            onEdit={(targetKey, action) => {
                if (action === 'add') 
                    setModalOpen(true);
                else if (action === 'remove') {
                    const curActiveKey = removeChatBox(targetKey, activeKey)
                    setActiveKey(curActiveKey);
                    createChatBox(curActiveKey);
                }
            }}
            items={chatBoxes}>
        </ChatBoxesWrapper> 

        <ChatModal
            open={modalOpen}
            onCreate={({ name }) => {
                setActiveKey(name);
                createChatBox(name);
                setModalOpen(false);
            }}
            onCancel={() => { setModalOpen(false);}} />
        
        <Input.Search
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            enterButton="Send"
            placeholder="Type a message here..."
            onSearch={(msg) => {
            if (!msg) {
                displayStatus({
                    type: 'error',
                    msg: 'Please enter a username and a message body.'
                })
            return
            }
            sendMessage(me, activeKey, msg);
            setBody('');
            }}
        ></Input.Search>
        </> </>
    )
}
export default ChatRoom
