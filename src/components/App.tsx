import "./CafeInfo";
import { useState } from "react";
import CafeInfo from "./CafeInfo";
import Notification from "./Notification";
import type { Votes, VoteType } from "../types/votes";
import VoteStatus from "./VoteStatus";
import css from "./css/App.module.css";
import VoteOption from "./VoteOption";

export default function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const handleVote = (type: VoteType) => {
    setVotes((votes) => ({
      ...votes,
      [type]: votes[type] + 1,
    }));
  };
  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOption
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes !== 0 ? true : false}
      />
      {totalVotes !== 0 ? (
        <VoteStatus
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
