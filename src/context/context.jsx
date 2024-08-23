
import { createContext, useState } from "react";
import run from "../confiq/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompt, setprevPrompt] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            if (nextWord.startsWith("<strong>")) {
                setResultData(prev => prev + "<br>" + nextWord + " ");
            } else {
                setResultData(prev => prev + nextWord + " ");
            }
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false)
        setshowResult(false)
    }




    const onSent = async () => {
        setResultData("");
        setLoading(true);
        setshowResult(true);
        setrecentPrompt(input);
        setprevPrompt(prev => [...prev, input]);

        const response = await run(input);

        let sanitizedResponse = response
            .replace(/^##\s*(.*)/gm, "<h2>$1</h2>")
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

        let responseArray = sanitizedResponse.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<br>" + responseArray[i] + "</br>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord);
        }

        setLoading(false);
        setInput("");
    };

    const handleRecentClick = (prompt) => {
        setInput(prompt);
        onSent();  // Trigger the onSent function to process the selected prompt
    };

    const contextValue = {
        prevPrompt,
        setprevPrompt,
        onSent,
        setrecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        handleRecentClick,
        newChat

    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
