import { createContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid'; // You'll need to install uuid
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const { t, i18n } = useTranslation();
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Check authentication status
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    
    // Reset result when language changes
    useEffect(() => {
        setResultData("");
    }, [i18n.language]);
    
    // Initialize conversation
    useEffect(() => {
        // For authenticated users, fetch conversations
        if (isAuthenticated) {
            fetchConversations();
        } else {
            // For guests, create local conversation ID
            if (!currentConversationId) {
                const guestConvId = uuidv4();
                localStorage.setItem('guestConversationId', guestConvId);
                setCurrentConversationId(guestConvId);
                // Initialize with greeting message
                setMessages([{ 
                    content: t('chat.botGreeting'),
                    role: 'assistant',
                    timestamp: new Date(),
                    conversationId: guestConvId,
                    userId: localStorage.getItem('guestUserId') || uuidv4()
                }]);
            }
        }
    }, [isAuthenticated, t]);
    
    // Save guest ID if not exist
    useEffect(() => {
        if (!isAuthenticated && !localStorage.getItem('guestUserId')) {
            localStorage.setItem('guestUserId', uuidv4());
        }
    }, [isAuthenticated]);

    // Fetch conversations for authenticated users
    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/chat/conversations', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setConversations(data);
                
                // If no active conversation, create one
                if (data.length === 0 || !currentConversationId) {
                    createNewConversation();
                } else if (!currentConversationId) {
                    // Load the most recent conversation
                    loadConversation(data[0]._id);
                }
            }
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };
    
    // Create new conversation
    const createNewConversation = async () => {
        if (isAuthenticated) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/chat/conversations', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: "New Conversation" })
                });
                
                if (response.ok) {
                    const newConversation = await response.json();
                    setConversations(prev => [newConversation, ...prev]);
                    setCurrentConversationId(newConversation._id);
                    setMessages([]);
                    
                    // Add greeting message
                    saveMessage({
                        content: t('chat.botGreeting'),
                        role: 'assistant',
                    });
                }
            } catch (error) {
                console.error('Error creating conversation:', error);
            }
        } else {
            // Guest mode - create local conversation
            const guestConvId = uuidv4();
            localStorage.setItem('guestConversationId', guestConvId);
            setCurrentConversationId(guestConvId);
            setMessages([{ 
                content: t('chat.botGreeting'),
                role: 'assistant',
                timestamp: new Date(),
                conversationId: guestConvId,
                userId: localStorage.getItem('guestUserId')
            }]);
        }
    };
    
    // Load conversation and its messages
    const loadConversation = async (conversationId) => {
        setCurrentConversationId(conversationId);
        
        if (isAuthenticated) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:5000/api/chat/messages/${conversationId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error('Error loading conversation:', error);
            }
        }
    };
    
    // Save message
    const saveMessage = async (message) => {
        const completeMessage = {
            ...message,
            conversationId: currentConversationId,
            userId: isAuthenticated 
                ? JSON.parse(localStorage.getItem('user')).id 
                : localStorage.getItem('guestUserId'),
            timestamp: new Date()
        };
        
        // Add to local state for immediate display
        setMessages(prev => [...prev, completeMessage]);
        
        // For authenticated users, save to server
        if (isAuthenticated) {
            try {
                const token = localStorage.getItem('token');
                await fetch('http://localhost:5000/api/chat/messages', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(completeMessage)
                });
            } catch (error) {
                console.error('Error saving message:', error);
            }
        } else {
            // For guest users, save to local storage
            const guestMessages = JSON.parse(localStorage.getItem('guestMessages') || '[]');
            guestMessages.push(completeMessage);
            localStorage.setItem('guestMessages', JSON.stringify(guestMessages));
        }
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setInput("");
        createNewConversation();
    };

    const onSent = async (prompt) => {
        setLoading(true);
        const userInput = prompt || input;
        
        // Save user message
        await saveMessage({
            content: userInput,
            role: 'user',
        });
        
        setRecentPrompt(userInput);
        setPrevPrompts(prev => [...prev, userInput]);
        setInput("");
        
        try {
            // Generate response using Gemini
            const languageContext = `Please respond in ${i18n.language === 'hi' ? 'Hindi' : 'English'}.`;
            const botResponse = await run(`${languageContext} ${userInput}`);
            
            // Process the response for formatting
            const formattedResponse = processFormattedResponse(botResponse);
            setResultData(formattedResponse);
            setShowResult(true);
            
            // Save bot response
            await saveMessage({
                content: formattedResponse,
                role: 'assistant',
            });
        } catch (error) {
            console.error('Error generating response:', error);
            
            await saveMessage({
                content: t('chat.errorMessage', "I'm sorry, I couldn't generate a response. Please try again."),
                role: 'assistant',
            });
        } finally {
            setLoading(false);
        }
    };

    const processFormattedResponse = (response) => {
        // Process bold formatting
        let responseArray = response.split('**');
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        
        // Process line breaks
        return newResponse.split("*").join("<br/>");
    };
    
    return (
        <Context.Provider value={{
            input,
            setInput,
            recentPrompt,
            prevPrompts,
            showResult,
            loading,
            resultData,
            setResultData,
            newChat,
            onSent,
            messages,
            setMessages,
            conversations,
            currentConversationId,
            isAuthenticated,
            createNewConversation,
            loadConversation,
            saveMessage,
        }}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;