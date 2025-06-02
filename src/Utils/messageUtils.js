const MessageType = Object.freeze({
    Success: 'success',
    Error: 'error',
    Warning: 'warning',
    Info: 'info',
    Loading: 'loading',
});

function showMessage(type, text, messageApi) {
    switch (type) {
        case MessageType.Success:
            messageApi.success(text);
            break;
        case MessageType.Error:
            messageApi.error(text);
            break;
        case MessageType.Warning:
            messageApi.warning(text);
            break;
        case MessageType.Info:
            messageApi.info(text);
            break;
        case MessageType.Loading:
            messageApi.loading(text);
            break;
        default:
            messageApi.info(text);
    }
}

export { MessageType, showMessage };
