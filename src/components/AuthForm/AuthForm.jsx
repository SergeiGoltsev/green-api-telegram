import { useState } from 'react';
import './AuthForm.css';

function AuthForm({ onConnect, error }) {
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onConnect({
            idInstance,
            apiTokenInstance
        });
    };

    return (
        <div className="auth">
            <div className="auth__card">
                <div className="auth__logo">
                    A
                </div>

                <h1 className="auth__title">
                    Telegram Chat
                </h1>

                <p className="auth__description">
                    Подключите аккаунт GREEN-API,
                    чтобы начать переписку
                </p>

                <form
                    className="auth__form"
                    onSubmit={handleSubmit}
                >
                    <div className="auth__field">
                        <label htmlFor="idInstance">
                            ID Instance
                        </label>

                        <input
                            id="idInstance"
                            type="text"
                            value={idInstance}
                            onChange={(event) =>
                                setIdInstance(event.target.value)
                            }
                            placeholder="Введите idInstance"
                            required
                        />
                    </div>

                    <div className="auth__field">
                        <label htmlFor="apiTokenInstance">
                            API Token Instance
                        </label>

                        <input
                            id="apiTokenInstance"
                            type="password"
                            value={apiTokenInstance}
                            onChange={(event) =>
                                setApiTokenInstance(
                                    event.target.value
                                )
                            }
                            placeholder="Введите apiTokenInstance"
                            required
                        />
                    </div>

                    {error && (
                        <p className="auth__error">
                            {error}
                        </p>
                    )}

                    <button
                        className="auth__submit"
                        type="submit"
                    >
                        Подключиться
                    </button>
                </form>

                <p className="auth__hint">
                    Данные используются для подключения
                </p>
            </div>
        </div>
    );
}

export default AuthForm;