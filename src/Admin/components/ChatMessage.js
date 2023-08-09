// import React, { useEffect, useState } from 'react';
// import Pusher from 'pusher-js';

// export default function ChatMessage() {
//   const [messages, setMessages] = useState([]);
//   const [message, setNewMessage] = useState('');
//   const [username, setUsername] = useState('Shani');

//   // Load messages from Local Storage on component mount
//   useEffect(() => {
//     const storedMessages = localStorage.getItem('chatMessages');
//     if (storedMessages) {
//       setMessages(JSON.parse(storedMessages));
//     }
//   }, []);

//   // Update Local Storage when messages state changes
//   useEffect(() => {
//     localStorage.setItem('chatMessages', JSON.stringify(messages));
//   }, [messages]);

//   useEffect(() => {
//     const pusher = new Pusher('b0b71e51ff89ca7d3db0', {
//       cluster: 'ap2',
//     });
//     const channel = pusher.subscribe('chat');

//     channel.bind('message', (data) => {
//       if (data && data.message) {
//         console.log('Received message:', data.message);
//         setMessages((prevMessages) => [...prevMessages, data]);
//       } else {
//         console.log('Invalid message data:', data);
//       }
//     });

//     return () => {
//       pusher.unsubscribe('chat');
//       pusher.disconnect();
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     setNewMessage(e.target.value);
//   };

//   const handleSendMessage = () => {
//     // Send the new message to the server
//     fetch('http://localhost:8000/api/sendMessage', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username,
//         message,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Clear the input field
//         setNewMessage('');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Chat</h2>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message.message}</div>
//         ))}
//       </div>
//       <div>
//         <input type="text" value={message} onChange={handleInputChange} />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }
