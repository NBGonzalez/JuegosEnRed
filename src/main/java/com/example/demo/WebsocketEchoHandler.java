package com.example.demo;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebsocketEchoHandler extends TextWebSocketHandler {
	
	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New session: " + session.getId());
		sessions.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("Message received: " + message.getPayload());
		//String msg = message.getPayload();
		//session.sendMessage(new TextMessage(msg));
		//broadcastMessage(msg);
		sendOtherParticipants(session, message.getPayload());
		
//		System.out.println("Message received: " + message.getPayload());
//		JsonNode node = mapper.readTree(message.getPayload());
//		
//		sendOtherParticipants(session, node);
	}
	
	private void broadcastMessage(String message) {
        for (WebSocketSession session : sessions.values()) {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
	
	/*@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		sendOtherParticipants(session, message.getPayload());
	}*/

	private void sendOtherParticipants(WebSocketSession session, String payload) throws IOException {
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(payload));
			}
		}
	}
	
//	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {
//
//		System.out.println("Message sent: " + node.toString());
//		
//		ObjectNode newNode = mapper.createObjectNode();
//		newNode.put("name", node.get("name").asText());
//		newNode.put("message", node.get("message").asText());
//		
//		
//		for(WebSocketSession participant : sessions.values()) {
//			if(!participant.getId().equals(session.getId())) {
//				participant.sendMessage(new TextMessage(newNode.toString()));
//			}
//		}
//	}
}
