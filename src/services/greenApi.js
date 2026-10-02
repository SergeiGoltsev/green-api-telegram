export async function checkAccount(idInstance, apiTokenInstance) {
    const url = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Ошибка при подключении к GREEN-API');
    }

    return response.json();
}

export async function sendMessage(
    idInstance,
    apiTokenInstance,
    chatId,
    message
) {
    const url =
        `https://api.green-api.com/waInstance${idInstance}` +
        `/sendMessage/${apiTokenInstance}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chatId,
            message
        })
    });

    if (!response.ok) {
        throw new Error('Ошибка при отправке сообщения');
    }

    return response.json();
}


export async function receiveNotification(
    idInstance,
    apiTokenInstance
) {
    const url =
        `https://4100.api.green-api.com/waInstance${idInstance}` +
        `/receiveNotification/${apiTokenInstance}?receiveTimeout=5`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Ошибка при получении уведомления');
    }

    return response.json();
}


export async function deleteNotification(
    idInstance,
    apiTokenInstance,
    receiptId,
) {
    const url =
        `https://4100.api.green-api.com/waInstance${idInstance}` +
        `/deleteNotification/${apiTokenInstance}/${receiptId}`;

    const response = await fetch(url, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Ошибка при удалении уведомления');
    }

    return response.json();
}