import { useState } from 'react';
import AuthForm from './components/AuthForm/AuthForm.jsx';
import NewChat from './components/NewChat/NewChat.jsx';
import Chat from './components/Chat/Chat.jsx';
import { checkAccount } from './services/greenApi';
import './App.css';

function App() {
    const [credentials, setCredentials] = useState(null);
    const [chat, setChat] = useState(null);
    const [error, setError] = useState('');

    const handleConnect = async (loginData) => {
        setError('');

        try {
            const result = await checkAccount(
                loginData.idInstance,
                loginData.apiTokenInstance
            );

            console.log('Ответ GREEN-API:', result);

            setCredentials(loginData);
        } catch (error) {
            console.error(error);
            setError(
                'Не удалось подключиться к GREEN-API'
            );
        }
    };

    const handleCreateChat = (newChat) => {
        console.log('App получил чат:', newChat);

        setChat(newChat);
    };

    const handleBackToNewChat = () => {
        setChat(null);
    };

    if (!credentials) {
        return (
            <>
                <AuthForm
                    onConnect={handleConnect}
                    error={error}
                />
            </>
        );
    }

    return (
        <>
            {!chat && (
                <NewChat
                    onCreateChat={handleCreateChat}
                />
            )}

            {chat && (
                <Chat
                    chatId={chat.chatId}
                    phoneNumber={chat.phoneNumber}
                    credentials={credentials}
                    onBack={handleBackToNewChat}
                />
            )}
        </>
    );
}

export default App;