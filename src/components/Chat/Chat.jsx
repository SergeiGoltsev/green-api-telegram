import { useEffect, useState, useRef } from 'react';
import {
    receiveNotification,
    deleteNotification,
    sendMessage
} from '../../services/greenApi';
import './Chat.css';

function Chat({
                  chatId,
                  phoneNumber,
                  credentials,
                  onBack
              }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        });
    }, [messages]);

    // Автоматически получаем входящие сообщения
    useEffect(() => {
        let cancelled = false;

        const receiveMessages = async () => {
            while (!cancelled) {
                try {
                    const notification = await receiveNotification(
                        credentials.idInstance,
                        credentials.apiTokenInstance
                    );

                    if (!notification) {
                        continue;
                    }

                    console.log(
                        'Получили уведомление:',
                        notification
                    );

                    const body = notification.body;

                    if (
                        body?.typeWebhook === 'incomingMessageReceived' &&
                        body?.messageData?.typeMessage === 'textMessage'
                    ) {
                        const incomingText =
                            body.messageData.textMessageData.textMessage;

                        console.log(
                            'Входящий текст:',
                            incomingText
                        );

                        setMessages((currentMessages) => [
                            ...currentMessages,
                            {
                                id: body.idMessage,
                                text: incomingText,
                                direction: 'incoming',
                                time: new Date().toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                            }
                        ]);
                    }

                    await deleteNotification(
                        credentials.idInstance,
                        credentials.apiTokenInstance,
                        notification.receiptId
                    );

                    console.log('Уведомление удалено');
                } catch (error) {
                    console.error(
                        'Ошибка получения сообщения:',
                        error
                    );

                    if (!cancelled) {
                        setError(
                            'Ошибка при получении сообщения'
                        );

                        // Небольшая пауза перед новой попыткой
                        await new Promise((resolve) =>
                            setTimeout(resolve, 1000)
                        );
                    }
                }
            }
        };

        receiveMessages();

        return () => {
            cancelled = true;
        };
    }, [
        credentials.idInstance,
        credentials.apiTokenInstance
    ]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        setError('');
        setIsSending(true);

        try {
            const result = await sendMessage(
                credentials.idInstance,
                credentials.apiTokenInstance,
                chatId,
                message
            );

            console.log('Ответ GREEN-API:', result);

            setMessages((currentMessages) => [
                ...currentMessages,
                {
                    id: result.idMessage,
                    text: message,
                    direction: 'outgoing',
                    time: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            ]);

            setMessage('');
        } catch (error) {
            console.error(error);
            setError('Не удалось отправить сообщение');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="chat">
            <div className="chat__header">
                <button
                    className="chat__back-button"
                    onClick={onBack}
                    type="button"
                >
                    ←
                </button>
                <div className="chat__avatar">
                    A
                </div>
                <div>
                    <h2>Chat Telegram</h2>
                    <span>Адресат: {phoneNumber}</span>
                </div>
            </div>

            <div className="chat__messages">
                {messages.map((item) => (
                    <div
                        key={item.id}
                        className={`chat__message chat__message--${item.direction}`}
                    >
                        <span className="chat__message-text">
                            {item.text}
                        </span>
                        <span className="chat__message-time">
                            {item.time}
                        </span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {error && (
                <p className="chat__error">
                    {error}
                </p>
            )}

            <form
                className="chat__form"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    value={message}
                    onChange={(event) =>
                        setMessage(event.target.value)
                    }
                    placeholder="Напишите сообщение..."
                />

                <button
                    type="submit"
                    disabled={isSending}
                >
                    {isSending
                        ? 'Отправка...'
                        : 'Отправить'}
                </button>
            </form>
        </div>
    );
}

export default Chat;