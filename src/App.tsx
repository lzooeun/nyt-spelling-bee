import puzzle from "./puzzle.ts";
import { useState } from "react"
import Scoreboard from './Scoreboard.tsx'
import Controls from './Controls.tsx'

export default function App() {
    // Shared state for words found by the user
    const [foundWords, setFoundWords] = useState<string[]>([]); 
    // Shared state for the current text in the input field
    const [currentInput, setCurrentInput] = useState(""); 

    // Handler for updating input
    function handleInputChange(next: string): void {
        setCurrentInput(next);
    }

    // Handler for clearing the input
    function handleResetInput(): void {
        setCurrentInput("");
    }

    // Handler for sumitting a word
    function handleSubmitWord(word: string): void {
        const normalizedWord = word.toLowerCase().trim();

        if (!foundWords.includes(normalizedWord)) {
            setFoundWords(foundWords.concat([normalizedWord]));
        }

        setCurrentInput("")
    }



    return (
        <>
            <div className="controls-section">
                <Controls
                    puzzle={puzzle}
                    currentInput={currentInput}
                    foundWords={foundWords}
                    onInputChange={handleInputChange}
                    onResetInput={handleResetInput}
                    onSubmitWord={handleSubmitWord}
                />
            </div>
            <div className="scoreboard-section">
                <Scoreboard
                    foundWords={foundWords}
                    maxScore={puzzle.maxScore}
                />
            </div>
        </>
    );
}

