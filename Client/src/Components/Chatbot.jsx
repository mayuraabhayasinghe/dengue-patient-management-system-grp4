import { useState, useEffect, useRef } from "react";
import bot_icon from "../assets/images/ai_chatbot.png";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faPlus,
  faComment,
  faTrashCan,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const MODEL_NAME = "gemini-1.5-pro-latest";

const Chatbot = () => {
  // State for sidebar
  const [sidebarExtended, setSidebarExtended] = useState(false);

  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div className="flex h-screen bg-background-1 p-3 md:p-5 gap-3 w-full">
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

          <button className="mt-12 flex items-center justify-center gap-2 p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors w-full">
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
                  <button className="flex items-center gap-2 p-2 rounded-full hover:bg-primary-2 w-full text-left transition-colors flex-1">
                    <FontAwesomeIcon icon={faComment} className="text-white" />
                    <span className="text-white-1 truncate">
                      {chat.messages[0]?.content.slice(0, 18) || "New Chat"}...
                    </span>
                  </button>
                  {currentChatId === chat.id && (
                    <button className="p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-primary-1 hover:text-red-500"
                      />
                    </button>
                  )}
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
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
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

          {/* Input Area */}
          <div className="p-5 border-t">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-full">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about dengue..."
                  className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-text-1"
                />
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-xl text-text-1 hover:text-primary-1"
                  />
                </div>
              </div>
              <p className="text-xs text-center mt-3 text-gray-500">
                Our bot can make mistakes, so double-check it
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
