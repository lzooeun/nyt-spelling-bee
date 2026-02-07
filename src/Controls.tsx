import { useState } from "react";

type Puzzle = {
    centerLetter: string;
    edgeLetters: Array<string>;
    words: Array<string>;
};

type ControlsProps = {
    puzzle: Puzzle;
    currentInput: string;
    foundWords: Array<string>;
    onInputChange: (next: string) => void;
    onResetInput: () => void;
    onSubmitWord: (word: string) => void;
};

export default function Controls({
    puzzle,
    currentInput,
    foundWords,
    onInputChange,
    onResetInput,
    onSubmitWord,
}: ControlsProps) {
    const [error, setError] = useState("");
    const [letters, setLetters] = useState<Array<string>>(puzzle.edgeLetters);

    function handleSubmit(event: React.FormEvent): void {
        event.preventDefault();

        const word = currentInput.toLowerCase().trim();

        if (word.length < 4) {
            setError("Word must be at least 4 letters");
            return;
        }

        if (!word.includes(puzzle.centerLetter)) {
            setError("Word must include the center letter");
            return;
        }

        if (!puzzle.words.includes(word)) {
            setError("Not in word list");
            return;
        }

        if (foundWords.includes(word)) {
            setError("Word already found");
            return;
        }

        setError("");
        onSubmitWord(word);
    }

    function handleLetterClick(letter: string): void {
        onInputChange(currentInput + letter);
        setError("");
    }

    function handleShuffle(): void {
        const next = letters.slice().sort(() => Math.random() - 0.5);
        setLetters(next);
        setError("");
    }

    const cells: Array<string | null> = [
        letters[0] ?? null,
        letters[1] ?? null,
        letters[2] ?? null,
        null,
        puzzle.centerLetter,
        null,
        letters[3] ?? null,
        letters[4] ?? null,
        letters[5] ?? null,
    ];

    return (
        <div className="controls">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => {
                        onInputChange(e.target.value.toLowerCase());
                        setError("");
                    }}
                    placeholder="Type a word"
                />

                {error !== "" ? <p className="error">{error}</p> : null}

                <div className="honeycomb">
                    {cells.map((letter, index) => (
                        <div key={index} className="cell">
                            {letter !== null
                                ? (
                                    <button
                                        type="button"
                                        className={letter
                                                === puzzle.centerLetter
                                            ? "center-letter"
                                            : ""}
                                        onClick={() =>
                                            handleLetterClick(letter)}
                                    >
                                        {letter}
                                    </button>
                                )
                                : null}
                        </div>
                    ))}
                </div>

                <div className="controls-buttons">
                    <button type="submit">Submit</button>

                    <button
                        type="button"
                        onClick={() => {
                            onResetInput();
                            setError("");
                        }}
                    >
                        Reset
                    </button>

                    <button type="button" onClick={handleShuffle}>
                        Shuffle
                    </button>
                </div>
            </form>
        </div>
    );
}
