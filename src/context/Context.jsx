import { createContext, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
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

    // Reset result data when language changes
    useEffect(() => {
        setResultData("");
    }, [i18n.language]);

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
        setResultData("");
        setInput("");
    }

    const onSent = async (prompt) => {
        setLoading(true);
        // Don't set showResult yet - wait until processing is complete
        setShowResult(false);
        let response;

        try {
            // If a prompt is provided, use it; otherwise use the input state
            const actualPrompt = prompt !== undefined ? prompt : input;
            
            // Add language context to the prompt
            const languageContext = `Please respond in ${i18n.language === 'hi' ? 'Hindi' : 'English'}.`;
            
            // Send prompt to Gemini with language preference
            response = await run(`${languageContext} ${actualPrompt}`);
            
            // Update recent prompt
            setRecentPrompt(actualPrompt);
            
            // Add to previous prompts if it's from the input state
            if (prompt === undefined) {
                setPrevPrompts(prev => [...prev, input]);
            }

            // Process and display response
            const containsNumberedList = /\b\d+\.\s/.test(response);
            const containsTips = /tips|steps|ways|habits|strategies|techniques/i.test(response);
        
            let formattedResponse = response;
            if (containsNumberedList && containsTips) {
                // Format as a point-wise structure
                formattedResponse = response.replace(/(\d+)\.\s+([^.]+)/g, '<p class="list-item"><span class="list-number">$1.</span> <span class="list-text">$2</span></p>');
            }
            
            // Process bold formatting and line breaks in one go
            formattedResponse = processFormattedResponse(formattedResponse);
            
            // Set the complete response at once
            setResultData(formattedResponse);
            // Now show the result after processing is complete
            setShowResult(true);
        } catch (error) {
            console.error("Error getting response:", error);
            setResultData(t('chat.errorMessage') || "Sorry, I couldn't process your request.");
            setShowResult(true);
        }
        
        setLoading(false);
        setInput("");
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

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
    };
    
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;