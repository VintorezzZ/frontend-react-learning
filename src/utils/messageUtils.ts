export enum MessageType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
    Loading = 'loading',
}

export function showMessage(type: MessageType, text: string, messageApi: any) {
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