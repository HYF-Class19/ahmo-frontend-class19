import React from 'react';
import MainLayout from "@/layouts/MainLayout";
import Link from "next/link";

const learnMorePage = () => {
  return (
    <MainLayout
      title={"AHMO - Learn more"}
      description="AHMO chat. Learn more page"
    >
      <div className="learnMoreWrapper">
        <div className="learnMoreTextWrapper">
          <h1>Guess a word</h1>
          <p>Guess a word is a classic word guessing game where one player thinks of a secret word and the other player(s) try to guess the word by asking questions that can be answered with a "yes" or "no". The game typically starts with the word chooser selecting a secret word and telling the guessers how many letters the word contains. Then, the guessers take turns asking questions until they correctly guess the word or run out of guesses. It's a fun and engaging game that can be played in groups or one-on-one, and it helps to improve vocabulary, deduction skills, and critical thinking</p>
        
          <div>
            <h1>Truth or dare</h1>
            <p>Truth or Dare is a classic party game where players take turns asking each other to choose between answering a truth question or performing a dare. The game can be played virtually or in-person, with players taking turns sending messages to each other or interacting face-to-face. The questions and dares can range from lighthearted and silly to more personal and daring, making it a popular choice for social gatherings and events.</p>

          <div>
            <h1>Last letter word</h1>
            <p>Last letter word is a word game where players have to use the last letter of a given word to make a new word. The game can be played by one or more players, and the objective is to come up with as many words as possible within a specified time limit. The game can be played casually or competitively and is often used as a fun way to improve vocabulary and spelling skills.</p>
            <Link href="/">Return to home page</Link>
          </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default learnMorePage;
