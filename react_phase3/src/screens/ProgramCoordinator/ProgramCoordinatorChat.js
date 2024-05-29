import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

function ProgramCoordinatorChat() {
  const userEmail = localStorage.getItem("userEmail");

  console.log(userEmail);
  const [selectedUser, setSelectedUser] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatTable, setChatTable] = useState([]);
  const [users, setUsers] = useState([]);
  const [userNames, setUserNames] = useState({});
  const messagesEndRef = useRef(null);

  // Simulating a table. You would replace this with a real database call.

  const fetchChats = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("email", userEmail);

      const response = await axios.post("/getChat.php", formData);
      if (response.data.success) {
        setChatTable(response.data.data);

        // Extract all unique user emails
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  useEffect(() => {
    fetchChats();
  }, [userEmail]);

  const fetchLatestMessages = async () => {
    const fetchedMessages = chatTable.filter(
      (chat) =>
        (chat.ReceiverEmail === userEmail &&
          chat.SenderEmail === selectedUser) ||
        (chat.SenderEmail === userEmail && chat.ReceiverEmail === selectedUser)
    );
    setMessages(fetchedMessages);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChats();
    }, 1000); //

    return () => clearInterval(interval); // cleanup the interval when the component is unmounted
  }, [selectedUser, chatTable, userEmail]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const response = await axios.post("/getUserName.php");
        if (response.data.success) {
          const namesMap = {};
          const userEmails = []; // to hold the emails of the users

          response.data.data.forEach((user) => {
            namesMap[user.email] = user.name;
            userEmails.push(user.email); // pushing each email into the userEmails array
          });

          setUserNames(namesMap);

          // Set the users and the initially selected user using the emails
          setUsers(userEmails);
          if (userEmails.length > 0) {
            setSelectedUser(userEmails[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUserNames();
  }, []);

  useEffect(() => {
    const fetchedMessages = chatTable.filter(
      (chat) =>
        (chat.ReceiverEmail === userEmail &&
          chat.SenderEmail === selectedUser) ||
        (chat.SenderEmail === userEmail && chat.ReceiverEmail === selectedUser)
    );
    setMessages(fetchedMessages);
  }, [selectedUser, chatTable, userEmail]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }
    const formData = new URLSearchParams();
    formData.append("SenderEmail", userEmail);
    formData.append("ReceiverEmail", selectedUser);
    formData.append("Message", newMessage);

    try {
      const response = await axios.post("/sendMessage.php", formData);
      if (response.data.success) {
        // Push the new message to the chatTable state if successfully inserted into the database
        const newChat = {
          ID: chatTable.length + 1,
          SenderEmail: userEmail,
          ReceiverEmail: selectedUser,
          Message: newMessage,
        };
        setNewMessage("");
        setSelectedUser(selectedUser);
        setMessages((prevMessages) => [...prevMessages, newChat]);
        setNewMessage("");
      } else {
        console.error("Error sending message:", response.data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div className="sidebar flex-1 text-left pr-2">
        <h2>Chats</h2>
        <ul className="chat-list">
          {users.map((user, index) => (
            <li key={index} className={user === selectedUser ? "active" : ""}>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedUser(user);
                }}
              >
                {userNames[user] || user}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat flex-2">
        <div className="chat-header">
          <h2>{userNames[selectedUser] || selectedUser}</h2>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.SenderEmail === userEmail ? "right" : "left"
              }-message`}
            >
              <p>{message.Message}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}

export default ProgramCoordinatorChat;
