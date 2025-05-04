import { useState, useRef, useEffect } from "react";
import bot_icon from "../assets/images/ai_chatbot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faComment,
  faTrashCan,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Chatbot = () => {
  const [sidebarExtended, setSidebarExtended] = useState(false);
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [input, setInput] = useState("");
  const resultContainerRef = useRef(null);

  useEffect(() => {
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollTop =
        resultContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const newChat = () => {
    const newChatId = Date.now();
    setCurrentChatId(newChatId);
    setChats((prev) => [...prev, { id: newChatId, messages: [] }]);
  };

  const deleteChat = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  const loadChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const onSent = (prompt) => {
    if (!prompt && !input.trim()) return;

    const userMessage = prompt || input;
    const chatId = currentChatId || Date.now();

    if (!currentChatId) {
      newChat();
    }

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === (currentChatId || chatId)
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { sender: "user", content: userMessage },
              ],
            }
          : chat
      )
    );

    setInput("");
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  return (
    <div className="flex h-screen bg-[rgba(0,191,165,0.05)] p-5 gap-5 w-full">
      {/* Sidebar */}
      <div
        className={`justify-between hidden md:flex flex-col bg-primary-1 rounded p-4 transition-all duration-300 ${
          sidebarExtended ? "w-64" : "w-20"
        }`}>
        <div>
          <button
            onClick={() => setSidebarExtended((prev) => !prev)}
            className="ml-2 p-2 flex justify-center hover:bg-white items-center rounded transition-colors border-2 border-white">
            <FontAwesomeIcon
              icon={faBars}
              className="text-xl text-white hover:text-primary-1"
            />
          </button>

          <button
            onClick={newChat}
            className="mt-12 flex items-center justify-center gap-2 p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors w-full">
            <FontAwesomeIcon icon={faPlus} className="text-text-1" />
            {sidebarExtended && <span className="text-text-1">New Chat</span>}
          </button>

          {sidebarExtended && (
            <div className="mt-4 animate-fadeIn">
              <p className="mt-8 mb-5 text-white">Recent</p>
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center justify-between group">
                  <button
                    onClick={() => loadChat(chat.id)}
                    className="flex items-center gap-2 p-2 rounded-full hover:bg-primary-2 w-full text-left transition-colors flex-1">
                    <FontAwesomeIcon icon={faComment} className="text-white" />
                    <span className="text-white-1 truncate">
                      {chat.messages[0]?.content.slice(0, 18) || "New Chat"}...
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h1 className="text-xl font-semibold text-text-2">
            DengueGuard Chatbot
          </h1>
          {currentChatId && (
            <button
              onClick={() => deleteChat(currentChatId)}
              className="w-10 h-10 flex items-center justify-center hover:text-red-600 transition-colors">
              <FontAwesomeIcon
                className="text-primary-1 hover:text-red-500 text-xl"
                icon={faTrashCan}
              />
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <div className="text-center max-w-2xl">
                <h2 className="text-5xl text-gray-300 font-medium mb-2">
                  <span className="bg-gradient-to-r from-primary-2 to-primary-1 bg-clip-text text-transparent">
                    Hello, User
                  </span>
                </h2>
                <p className="text-2xl text-text-1 mb-12">
                  How can I help you today?
                </p>
              </div>
            </div>
          ) : (
            <div
              ref={resultContainerRef}
              className="flex-1 overflow-y-auto p-5">
              <div className="max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-5 mb-10 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}>
                    {message.sender === "bot" && (
                      <div className="w-10 h-10 rounded-full">
                        <img src={bot_icon} alt="" />
                      </div>
                    )}
                    <div
                      className={`max-w-3xl rounded-lg p-4 ${
                        message.sender === "user"
                          ? "bg-primary-1 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                      <p className="font-light leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-10 h-10 rounded-full bg-primary-2 flex items-center justify-center text-xl">
                        <FontAwesomeIcon
                          className="text-white-1"
                          icon={faUser}></FontAwesomeIcon>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-5 border-t">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-gray-50 p-3 border-1 border-primary-1 rounded-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSent()}
                placeholder="Ask anything about dengue..."
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-text-1"
              />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSent()}
                  disabled={!input.trim()}
                  className={`p-2 rounded-full ${
                    input.trim()
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-400"
                  }`}>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-xl hover:text-primary-1"
                  />
                </button>
              </div>
            </div>
            <p className="text-xs text-center mt-3 text-gray-500">
              Our bot can make mistakes, so double-check it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
