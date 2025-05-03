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
} from "@fortawesome/free-solid-svg-icons";

const MODEL_NAME = "gemini-1.5-pro-latest";

const Chatbot = () => {
  // State for sidebar
  const [sidebarExtended, setSidebarExtended] = useState(false);

  const [chats, setChats] = useState([]);

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
    </div>
  );
};

export default Chatbot;
