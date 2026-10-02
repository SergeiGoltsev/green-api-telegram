import { useState } from 'react';
import './NewChat.css';

function NewChat({ onCreateChat }) {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');

        if (!cleanPhoneNumber) {
            return;
        }

        const chat = {
            phoneNumber: cleanPhoneNumber,
            chatId: `${cleanPhoneNumber}@c.us`
        };

        console.log('Создаём чат:', chat);

        onCreateChat(chat);
    };

    return (
        <div className="new-chat">
            <div className="new-chat__card">
                <h2>Новый чат</h2>

                <p>
                    Введите номер телефона пользователя,
                    которому хотите написать
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(event) =>
                            setPhoneNumber(event.target.value)
                        }
                        placeholder="+79991234567"
                    />

                    <button type="submit">
                        Создать чат
                    </button>
                </form>
            </div>
        </div>
    );
}

export default NewChat;