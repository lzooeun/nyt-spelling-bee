import { useState } from "react";

const RANKS = [
    { name: "Queen Bee", percentage: 100 },
    { name: "Genius", percentage: 70 },
    { name: "Amazing", percentage: 50 },
    { name: "Great", percentage: 40 },
    { name: "Nice", percentage: 25 },
    { name: "Solid", percentage: 15 },
    { name: "Good", percentage: 8 },
    { name: "Moving Up", percentage: 5 },
    { name: "Good Start", percentage: 2 },
    { name: "Beginner", percentage: 0 },
];

type ScoreboardProps = {
    foundWords: string[];
    maxScore: number;
    pangrams: string[];
};

export default function Scoreboard(
    { foundWords, maxScore, pangrams }: ScoreboardProps,
) {
    const [activeTab, setActiveTab] = useState<"score" | "rank">("score");

    function calculatePoints(word: string): number {
        let score = (word.length === 4) ? 1 : word.length;
        if (pangrams.includes(word.toLowerCase())) {
            score += 7;
        }
        return score;
    }

    let total = 0;
    for (const word of foundWords) {
        total += calculatePoints(word);
    }
    const totalScore = total;

    const rankTable = RANKS.map((rank) => {
        return {
            name: rank.name,
            minScore: Math.floor(maxScore * (rank.percentage / 100)),
        };
    });

    const currentRank = rankTable.find((r) => totalScore >= r.minScore)?.name
        || "Beginner";

    return (
        <div className="container">
            <nav className="tabs">
                <button
                    className={activeTab === "score" ? "active" : ""}
                    onClick={() => setActiveTab("score")}
                >
                    Score: {totalScore}
                </button>
                <button
                    className={activeTab === "rank" ? "active" : ""}
                    onClick={() => setActiveTab("rank")}
                >
                    Rank: {currentRank}
                </button>
            </nav>

            <div className="tab-content">
                {activeTab === "score"
                    ? (
                        <ScoreTab
                            foundWords={foundWords}
                            getWordScore={calculatePoints}
                        />
                    )
                    : (
                        <RankTab
                            rankTable={rankTable}
                            totalScore={totalScore}
                            currentRank={currentRank}
                        />
                    )}
            </div>
        </div>
    );
}

type ScoreTabProps = {
    foundWords: string[];
    getWordScore: (word: string) => number;
};

function ScoreTab({ foundWords, getWordScore }: ScoreTabProps) {
    return (
        <div className="tab-view">
            <div className="list-header">
                <p>Word</p>
                <p>Points</p>
            </div>
            <ul className="word-list">
                {foundWords.map((word) => (
                    <li key={word} className="list-item">
                        <div>{word}</div>
                        <div>{getWordScore(word)}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

type RankRow = {
    name: string;
    minScore: number;
};

type RankTabProps = {
    rankTable: RankRow[];
    totalScore: number;
    currentRank: string;
};

function RankTab({ rankTable, totalScore, currentRank }: RankTabProps) {
    return (
        <div className="tab-view">
            <div className="list-header">
                <p>Rank</p>
                <p>Minimum score</p>
            </div>
            <ul className="rank-list">
                {rankTable.map((row) => (
                    <li
                        key={row.name}
                        className={currentRank === row.name
                            ? "curent-rank"
                            : ""}
                    >
                        <p>
                            {currentRank === row.name && (
                                <span>{totalScore}</span>
                            )}
                            {row.name}
                        </p>
                        <p>{row.minScore}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
