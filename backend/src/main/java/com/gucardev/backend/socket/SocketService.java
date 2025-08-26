package com.gucardev.backend.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.gucardev.backend.model.Message;
import com.gucardev.backend.model.MessageType;
import com.gucardev.backend.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class SocketService {


    private final MessageService messageService;


    public void sendSocketMessage(SocketIOClient senderClient, Message message, String roomId) {
        for (
                SocketIOClient client : senderClient.getNamespace().getRoomOperations(roomId).getClients()) {
            if (!client.getSessionId().equals(senderClient.getSessionId())) {
                client.sendEvent("read_message",
                        message);
            }
        }
    }

    public void saveMessage(SocketIOClient senderClient, Message message) {
        Message storedMessage = messageService.saveMessage(Message.builder()
                .messageType(MessageType.CLIENT)
                .content(message.getContent())
                .roomId(message.getRoomId())
                .userName(message.getUserName())
                .build());
        sendSocketMessage(senderClient, storedMessage, message.getRoomId());
    }

    public void saveInfoMessage(SocketIOClient senderClient, String message, String roomId) {
        Message storedMessage = messageService.saveMessage(Message.builder()
                .messageType(MessageType.SERVER)
                .content(message)
                .roomId(roomId)
                .build());
        sendSocketMessage(senderClient, storedMessage, roomId);
    }
}
