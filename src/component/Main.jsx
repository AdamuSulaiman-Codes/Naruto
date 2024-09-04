import { useEffect, useState } from "react";
import { characters } from "../data/data";
import Card from "./Card";
import Result from "./Result";

const Main = () => {
    const [characterState, setCharacterState] = useState({
        selectedCharacters: [],
        character: {},
        roles: ["body", "clan", "mind", "sensei", "talent", "chakra", "summon"],
        roleIndex: 0, // Track the current role index
        statsCalculator: {},
        totalScore: 0,
        isDone: false,
    });

    useEffect(() => {
        if (characterState.selectedCharacters.length < 7) {
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * characters.length);
                const newCharacter = characters[randomIndex];

                setCharacterState(prevCharacterState => {
                    const newRole = prevCharacterState.roles[prevCharacterState.roleIndex];

                    return {
                        ...prevCharacterState,
                        character: { ...newCharacter, role: newRole },
                    };
                });
            }, 100);

            const timeout = setTimeout(() => {
                clearInterval(interval);
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
            };
        } else {
            alert("Limit reached");
        }
    }, [characterState.selectedCharacters]);

    function handleSelectCard(character) {
        // Check if we can still select more characters
        if (characterState.selectedCharacters.length < 7) {
            const currentRole = characterState.roles[characterState.roleIndex];
            const roleStat = character.stats[currentRole];
    
            setCharacterState(prevCharacterState => {
                const updatedCharacter = { ...character, role: currentRole };
    
                const newStatsCalculator = {
                    ...prevCharacterState.statsCalculator,
                    [currentRole]: roleStat,
                };
    
                // Calculate total score
                const totalScore = Object.values(newStatsCalculator).reduce((sum, value) => sum + value, 0);
    
                console.log(`Selected Character: ${updatedCharacter.name}, Role: ${updatedCharacter.role}`);
    
                return {
                    ...prevCharacterState,
                    selectedCharacters: [...prevCharacterState.selectedCharacters, updatedCharacter],
                    roleIndex: (prevCharacterState.roleIndex + 1) % prevCharacterState.roles.length, // Update role index
                    statsCalculator: newStatsCalculator,
                    totalScore: totalScore, // Store the total score
                    isDone: prevCharacterState.selectedCharacters.length === 6, // Set isDone when reaching 7 selections
                };
            });
        } else {
            alert("You can only select up to 7 characters.");
        }
    }
    
    

    return (
        <>
            <Card onSelect={handleSelectCard} character={characterState.character}/>
            <ul>
                {characterState.selectedCharacters.map((selectedCharacter, index) => {
                    return (
                        <Card key={index} character={selectedCharacter} />
                    );
                })}
            </ul>
            {
            characterState.isDone ? 
                <Result stats={characterState.statsCalculator} totalScore={characterState.totalScore} />
            : 
                <p>Continue selecting</p>
             }

        </>
    );
};

export default Main;
