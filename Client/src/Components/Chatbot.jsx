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
  faPaperPlane,
  faTrashCan,
  faUser,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

const Chatbot = () => {
  // State for sidebar
  const [sidebarExtended, setSidebarExtended] = useState(false);

  // State for chat
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  // Refs
  const resultContainerRef = useRef(null);

  // Scroll to bottom only when shouldScrollToBottom is true
  useEffect(() => {
    if (resultContainerRef.current && shouldScrollToBottom) {
      resultContainerRef.current.scrollTop =
        resultContainerRef.current.scrollHeight;
    }
  }, [chats, loading, shouldScrollToBottom]);

  // Handle scroll events to determine if we should auto-scroll
  const handleScroll = () => {
    if (resultContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        resultContainerRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;
      setShouldScrollToBottom(isNearBottom);
    }
  };

  // Typewriter effect for responses
  const delayPara = (index, nextWord, chatId) => {
    setTimeout(() => {
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: chat.messages.map((msg, i) =>
                  i === chat.messages.length - 1
                    ? { ...msg, content: msg.content + nextWord }
                    : msg
                ),
              }
            : chat
        )
      );
    }, 75 * index);
  };

  // Start a new chat
  const newChat = () => {
    const newChatId = Date.now();
    setCurrentChatId(newChatId);
    setChats((prev) => [...prev, { id: newChatId, messages: [] }]);
    setShouldScrollToBottom(true);
    return newChatId;
  };

  // Process prompt and get response from Gemini
  const onSent = async (prompt) => {
    if (!prompt && !input.trim()) return;

    const userMessage = prompt || input;
    let chatId = currentChatId;

    // Check if input is allowed (dengue-related or greeting)
    const isDengueRelated = (message) => {
      const dengueKeywords = [
        "dengue",
        "mosquito",
        "aedes",
        "fever",
        "symptom",
        "treatment",
        "prevent",
        "vaccine",
        "virus",
        "bite",
        "epidemic",
        "outbreak",
        "hemorrhagic",
        "platelet",
        "ns1",
        "igg",
        "igm",
        "vector",
        "breeding",
        "larva",
        "aegypti",
        "albopictus",
        "repellent",
        "diagnosis",
        "severe",
        "warning",
        "sign",
        "dengvaxia",
      ];

      const greetings = [
        "hi",
        "hello",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "how are you",
        "what's up",
        "greetings",
      ];

      const messageLower = message.toLowerCase();

      // Check for greetings
      if (greetings.some((greeting) => messageLower.includes(greeting))) {
        return true;
      }

      // Check for dengue-related terms
      return dengueKeywords.some((keyword) => messageLower.includes(keyword));
    };

    if (!chatId) {
      chatId = newChat();
    }

    // Add user message to chat
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
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

    // Add empty bot message (will be filled later)
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, { sender: "bot", content: "" }],
            }
          : chat
      )
    );

    setLoading(true);
    setInput("");
    setShouldScrollToBottom(true);

    try {
      let response;
      if (isDengueRelated(userMessage)) {
        // Get response from Gemini for dengue-related questions
        response = await runGeminiChat(userMessage);
      } else {
        // For non-dengue questions, provide a standard response
        response =
          "I specialize in dengue-related information. Please ask me about dengue fever symptoms, prevention, treatment, or other related topics.";
      }

      const formattedResponse = formatResponse(response);
      const newResponseArray = formattedResponse.split(" ");

      for (let i = 0; i < newResponseArray.length; i++) {
        delayPara(i, newResponseArray[i] + " ", chatId);
      }
    } catch (error) {
      console.error("Error getting response:", error);
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: chat.messages.map((msg, i) =>
                  i === chat.messages.length - 1
                    ? {
                        ...msg,
                        content:
                          "Sorry, I encountered an error. Please try again.",
                      }
                    : msg
                ),
              }
            : chat
        )
      );
    }

    setLoading(false);
    setCurrentChatId(chatId);
  };

  // Call Gemini API
  const runGeminiChat = async (prompt) => {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

    // Add context to make sure Gemini stays on topic
    const dengueContext = `
    You are DengueGuard, a specialized chatbot that provides information exclusively about dengue fever.
    Your responses should be:
    1. Focused on dengue-related topics only
    2. Medically accurate and up-to-date
    3. Clear and easy to understand
    4. Include prevention tips when relevant
    
    For greetings, respond briefly and guide the conversation toward dengue topics.
    
    If asked about other topics, politely explain that you specialize in dengue information.
    
    Current question: ${prompt}
    
    Please provide a helpful response about dengue fever:
  `;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const result = await model.generateContent([dengueContext]);
    const text = result.response.text();

    // Ensure the last word is complete
    return text.replace(/\w+$/, (word) => (word.length < 3 ? "" : word));
  };

  // response format
  const formatResponse = (response) => {
    if (!response) return "";

    // Step 1: Normalize line breaks
    response = response.replace(/\r\n|\r/g, "\n").replace(/\n{3,}/g, "\n\n");

    // Step 2: Escape HTML tags to prevent injection (except for formatting we will add)
    response = response
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Step 3: Format code blocks (```...```)
    response = response.replace(/```([\s\S]*?)```/g, (_, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Step 4: Convert **bold** and _italic_ to HTML
    response = response.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    response = response.replace(/_(.*?)_/g, "<i>$1</i>");

    // Step 5: Convert headings and subheadings
    response = response.replace(
      /^[•*-]?\s?\*([^*]+)\*[:;]?\s*$/gm,
      "<h3>$1</h3>"
    );
    response = response.replace(/^\*\s?(.+?)[:;]?\s*$/gm, "<h4>$1</h4>");

    // Step 6: Format bullet points
    response = response.replace(/\n\s*[-*•]\s*/g, "\n• ");
    response = response.replace(/• (.+?)(?=\n|$)/g, (_, item) => {
      return `• ${item.trim().endsWith(";") ? item : item + ";"}`;
    });

    // Step 7: Format numbered lists
    response = response.replace(
      /\n\s*(\d+\.\s*)(.*?)(?=\n|$)/g,
      (_, num, item) => {
        return `\n${num}${item.trim().endsWith(";") ? item : item + ";"}`;
      }
    );

    // Step 8: Wrap lines in <p> unless they are headings, code blocks, or lists
    let formatted = response
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (
          trimmed.startsWith("<h3") ||
          trimmed.startsWith("<h4") ||
          trimmed.startsWith("<pre>") ||
          trimmed.startsWith("• ") ||
          /^\d+\.\s/.test(trimmed)
        ) {
          return `<p>${trimmed}</p>`;
        }
        return `<p>${trimmed}</p>`;
      })
      .join("");

    return `<section class="formatted-response">${formatted}</section>`;
  };

  // Delete a chat
  const deleteChat = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
  };

  // Load a chat
  const loadChat = (chatId) => {
    setCurrentChatId(chatId);
    setShouldScrollToBottom(true);
  };

  // Get current chat messages
  const currentChat = chats.find((chat) => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  return (
    <div className="flex h-screen bg-[rgba(0,191,165,0.05)] p-3 md:p-5 gap-3 w-full">
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
              className="flex-1 overflow-y-auto p-5"
              onScroll={handleScroll}>
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
                      {message.sender === "bot" ? (
                        loading && index === messages.length - 1 ? (
                          <div className="flex gap-1">
                            <div
                              className="w-1 h-1 rounded-full bg-primary-1 animate-bounce"
                              style={{ animationDelay: "0.1s" }}></div>
                            <div
                              className="w-1 h-1 rounded-full bg-primary-1 animate-bounce"
                              style={{ animationDelay: "0.2s" }}></div>
                            <div
                              className="w-1 h-1 rounded-full bg-primary-1 animate-bounce"
                              style={{ animationDelay: "0.3s" }}></div>
                          </div>
                        ) : (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: message.content,
                            }}
                            className="font-light leading-relaxed"
                          />
                        )
                      ) : (
                        <p className="font-light leading-relaxed">
                          {message.content}
                        </p>
                      )}
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
    </div>
  );
};

export default Chatbot;
