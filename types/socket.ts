export enum SocketEvent {
    CALL_INITIATE = 'CallInitiate',
    CALL_ACCEPT = 'AcceptCall',
    CALL_END = 'EndCall',
    CALL_DENY = 'DenyCall',
    INCOMING_CALL = 'IncomingCall',
    CALL_SEND_MESSAGE = 'SendChat',
    CALL_RECEIVE_MESSAGE = 'NewChat',
    SEND_MESSAGE = 'SendMessage',
    RECEIVE_MESSAGE = 'NewMessage',
    READ_MESSAGE = 'SendReadMessage'
}