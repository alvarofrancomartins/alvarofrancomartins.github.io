---
title: Can AI Agents Coordinate Without Communication?
subtitle: How ChatGPT-5.1 and DeepSeek-V3 Learn to Cooperate
summary: An experimental analysis of coordination capabilities in large language models through a simple pattern discovery game, revealing that same-model pairs achieve significantly better coordination than cross-model pairs.
projects: []

date: "2025-11-22"

draft: false

featured: false

authors:
- admin

tags:
- Artificial Intelligence
- AI
- Agents
- LLM
- Large Language Models
- ChatGPT 
- ChatGPT 5.1
- DeepSeek

categories:
- artificial_intelligence

toc: true

image:
  placement: 2
  caption: "Coordination between Large Language Models" 
  focal_point: "Smart"
  preview_only: false

---

<link rel="stylesheet" type="text/css" href="css/style.css">

## Overview

This project evaluates the coordination capabilities of large language models (LLMs) through a simple game. Two AI agents must independently discover and maintain a two-color alternating sequence without any communication.

## Game Mechanics

**Rules**
- Two agents choose either red or blue each round;
- Agents cannot communicate or see each other's reasoning. Each agent only sees the history of color choices made by both players and minimal feedback: "Correct", "Wrong pattern", or "Waiting for next round" (if it's the first round).
<br>

Points are scored based on a simple color alternation pattern:

<br>

| Round | Player 1 | Player 2 | Feedback | Score |
|:-----:|:--------:|:--------:|:---------|:-----:|
| 1 | 🔵 | 🔵 | Waiting for next round to verify pattern | 0 |
| 2 | 🔴 | 🔴 | Correct! +1 point | 1 |
| 3 | 🔵 | 🔵 | Correct! +1 point | 2 |
| 4 | 🔴 | 🔴 | Correct! +1 point | 3 |

<br>

The first color does not matter, as long as agents chose the same and keep alternating them. More specifically, points are awarded when three conditions are met:

1. Previous round: both agents matched colors;
2. Current round: both agents matched colors;
3. Colors differ between the two rounds.
<br>

Another example:

<br>

| Round | Player 1 | Player 2 | Feedback | Score |
|:-----:|:--------:|:--------:|:---------|:-----:|
| 1 | 🔴 | 🔴 | Waiting for next round to verify pattern | 0 |
| 2 | 🔵 | 🔵 | Correct! +1 point | 1 |
| 3 | 🔵 | 🔵 | Wrong pattern | 1 |
| 4 | 🔴 | 🔴 | Correct! +1 point | 2 |

<br>

There is no communication between agents. Agents should infer the pattern from minimal feedback. In order to win the game, agents must excel at sustained coordination. That is to say, both choosing the same color and also switching colors together. 
<br>

## Methodology
<br>

I employed GPT-5.1 and DeepSeek (chat versions only, not reasoning models), using each model's default temperature. Three game modes were performed: ChatGPT versus ChatGPT, DeepSeek versus DeepSeek and Mixed (ChatGPT versus DeepSeek).

<br>

Each game ran for 30 rounds, giving a **maximum possible score** of 29 points because the first round has no previous round for comparison. I collected data from 100 games per mode. Therefore, each game mode could accumulate up to 2,900 points (100 games × 29 points).

<br>

I stored all game data in JSON files (one file per game, e.g., `data/chatgpt_flag_game_0.json`) containing: the round number, both agents' color choices along with their reasoning (limited to 15 words), the current cumulative score, and each agent's identity (ChatGPT or DeepSeek). The reasoning is what the model returns in response to the following prompt: "Explain in 15 words or less why you chose that color based on the pattern". For more details, see `flag_game.py` in the [GitHub repository](https://github.com/alvarofrancomartins/LLMs-coordination).

{{< include-html "content/post/flag_game/game.html" >}}

## Results

### Summary Statistics Table
<br>


| Game Mode | Games | Median Score |Total Points | Total Points Percentage | Success Rate|
|:-----------:|:-------:|:--------------:|:--------------:|:-------------:| :-------------:|
| **ChatGPT vs ChatGPT** | 100 | 23.0 | 2,073 | 71% | 0% |
| **DeepSeek vs DeepSeek** | 100 | 14.0 |  1,769| 61%| 45% |
| **Mixed (GPT vs DeepSeek)** | 100 | 6.0 |  585 | 20%| 0% |

<br>

- Total Points represents the cumulative score across all 100 games;
- Total Points Percentage is the proportion of maximum achievable (2,900) points;
- Success Rate indicates the proportion of games that achieved a perfect score (29/29 points). 
<br>

### Histogram analysis
<br>
The graph below shows the scoring histograms for each game mode.

<img src="images/scores.png" alt="drawing" width="1000"/>

The differences are astounding! First, ChatGPT playing with itself never achieves a perfect score, reaching a maximum of 27 points in 44% of games. In contrast, DeepSeek reaches the maximum score of 29 points 45% of the time. 

<br>

However, ChatGPT versus itself is more consistent than DeepSeek. ChatGPT usually (in 60% of the games) guarantees scores of 20+ points, whereas DeepSeek's scoring distribution is bimodal: sometimes it finds the pattern and locks in perfectly, while other times it struggles a lot.

<br>

Finally, when ChatGPT and DeepSeek play together, they perform extremely poorly, reaching a maximum of only 15 points with an even lower median of 6 points. This is surprising because, even though they don't communicate, their choices (Red, Blue, etc.) still seem to capture how each model thinks. And as we're seeing, they can't find common ground or coordinate well. This suggests cross-model coordination isn't just difficult, it's fundamentally broken, with neither model able to adapt to the other's coordination style.

<br>

Overall, DeepSeek achieved more perfect scores, but ChatGPT's median (23.0) exceeds DeepSeek's (14.0), and its total points (2,073 vs 1,769) demonstrate that consistency beats occasional perfection in coordination tasks.

### Coordination breaks
<br>

The next graph reveals fundamental differences between the models' ability to maintain coordination once established. Analysis of consecutive correct rounds before coordination breaks shows that ChatGPT is less reliable than DeepSeek once it locks onto the correct pattern.

<img src="images/coordination_break.png" alt="drawing" width="1000"/>

We can see that even after getting 3, 4 or more consecutive correct rounds, they still break the coordination. Most surprisingly, there are 8 distinct games where ChatGPT breaks the coordination after exactly 16 consecutive correct rounds. Overall, DeepSeek breaks the coordination fewer times than ChatGPT.

<br>

There's a trade-off, though. ChatGPT's questioning nature helps it recover from early mistakes (leading to higher median performance). DeepSeek's commitment yields perfection when correct but failure when wrong.

### Reasoning Pattern Analysis

Beyond the scores, examining how each model thinks about the problem reveals differences in their strategies.

#### ChatGPT's Reasoning: Structured Abstraction

ChatGPT is systematically testing hypotheses and formalizing the pattern as a two-round cycle. This methodical strategy leads to high consistency, allowing ChatGPT to converge on the correct pattern even when initial rounds fail. The model demonstrates gradual convergence (it never starts scoring at round 2), iteratively refining its hypothesis about the pattern through careful observation and adjustment. Even when struggling initially, ChatGPT eventually identifies the underlying structure, rarely experiencing complete failure.

<br>

ChatGPT's weakness stems from this tendency to overthink. Agents debate whether the rule demands single-round alternation (R, B, R, B...), paired repetition (RR, BB, RR, BB...), or round-number dependency (odd=Red, even=Blue). This internal debate causes desynchronization when partners interpret the pattern differently. For example, one agent might reason *"Pattern seems Red then Blue; last round started Red, so continue Red now"* while its partner concludes the opposite, breaking coordination despite both understanding the general structure.

#### DeepSeek's Reasoning: Binary Lock-On

DeepSeek takes a different approach through rapid hypothesis formation, committing immediately to the first plausible pattern interpretation. This decisive strategy produces extreme bimodality: the model either discovers the pattern instantly or rarely recovers from an incorrect initial guess. The results demonstrate a binary performance: 45 perfect games (29/29 points) contrasted against 53 failed games (0-15 points), with virtually no middle ground. Only 2 games scored between 16-28 points, highlighting the all-or-nothing nature of DeepSeek's coordination strategy.

<br>

DeepSeek exhibits two distinct cognitive modes with little recovery mechanism. In success mode (45% of games), it start scoring immediately at round 2 and locks onto the simplest pattern (*"alternating Red, Blue each round"*), maintaining perfect execution from round 2 onward with unwavering commitment. In failure mode (55% of games), sometimes it fixates on complex counting mechanisms (*"both Blue every third round"*) and never converges on the correct pattern. Once committed to an incorrect hypothesis, there is no recovery mechanism - the model continues exploring the wrong theory for all 30 rounds, with reasoning like *"Pattern scores every third round when both choose Blue"* persisting despite consistent negative feedback.

#### Cross-Model Coordination Fails Consistently

The mixed-model games reveal a fundamental incompatibility between the two coordination strategies. ChatGPT uses a gradual convergence strategy, building understanding through iterative refinement, while DeepSeek employs either immediate lock-on or seemingly random exploration. These incompatible approaches prevent alignment even when one model correctly understands the pattern - the other simply doesn't adapt to match its partner's coordination style.

<br>

The results reflect this breakdown: no game exceeded 15 points out of a possible 29. Neither model's individual strengths compensate for the coordination failure, suggesting that successful coordination requires not just pattern recognition, but shared cognitive processes that enable implicit synchronization.

<br>

Since agents only see actions (not reasoning), coordination should be model-agnostic. But results show strong model-pairing effects.

## Limitations

- Limited number of games: To properly validate the results, I would need to run many more games, but I stopped at 100 because ChatGPT API is relatively expensive;
- Single pattern: Only tested one specific coordination pattern;
- No communication: More sophisticated coordination might involve communication;
- Temperature settings: Used default temperature; performance may vary with explicit temperature control;
- Model versions: Results specific to GPT-5.1 and DeepSeek-V3 as of November 2025.
<br>

## Future Directions

- Increase the number of games and rounds;
- Use LLMs with reasoning (CoT) capabilities. This will likely improve their performance;
- Test other coordination patterns;
- Analyze reasoning quality using another LLM as evaluation;
- Compare performance at different temperature settings;
- Test with other leading models (Claude, Gemini, Kimi, etc.).
<br>

## Technical Implementation

{{< spoiler text="Click to view the code" >}}
```py
import json
import re
from openai import OpenAI

# API Keys for each player. Replace the variables below with your own API keys.
chatgpt_key_player1 = YOUR_CHATGPT_API_KEY_1
chatgpt_key_player2 = YOUR_CHATGPT_API_KEY_2

deepseek_key_player1 = YOUR_DEEPSEEK_API_KEY_1
deepseek_key_player2 = YOUR_DEEPSEEK_API_KEY_2

def setup_clients(game_mode):
    if game_mode == "chatgpt":
        chatgpt_client1 = OpenAI(api_key=chatgpt_key_player1)
        chatgpt_client2 = OpenAI(api_key=chatgpt_key_player2)
        return chatgpt_client1, chatgpt_client2
    elif game_mode == "deepseek":
        deepseek_client1 = OpenAI(base_url='https://api.deepseek.com/v1', api_key=deepseek_key_player1)
        deepseek_client2 = OpenAI(base_url='https://api.deepseek.com/v1', api_key=deepseek_key_player2)
        return deepseek_client1, deepseek_client2
    else:  # mixed mode
        chatgpt_client = OpenAI(api_key=chatgpt_key_player1)
        deepseek_client = OpenAI(base_url='https://api.deepseek.com/v1', api_key=deepseek_key_player1)
        return chatgpt_client, deepseek_client

def format_history(history, is_player1):
    formatted = []
    for idx, (p1, p2, fb) in enumerate(history, start=1):
        if is_player1:
            formatted.append(f"Round {idx}: You (Player 1) chose: {p1} | Player 2 chose: {p2} | Feedback: {fb}")
        else:
            formatted.append(f"Round {idx}: You (Player 2) chose: {p2} | Player 1 chose: {p1} | Feedback: {fb}")
    return "\n".join(formatted) if formatted else "No previous rounds"

def validate_response(response):
    # Regex pattern to find Choice: and Reasoning: anywhere in the text
    pattern = r'Choice:\s*(.*?)(?=\s*Reasoning:|\s*$|\s*\Z).*Reasoning:\s*(.*)'
    match = re.search(pattern, response, re.DOTALL)
    
    if match:
        choice = match.group(1).strip()
        reasoning = match.group(2).strip()
        return True, choice, reasoning
    else:
        return False, None, None

def get_player_choice(client, player_type, history, score, is_player1):
    system_prompt = """You are in a coordination game with another player.
                       The goal is to discover the secret pattern and align your choices. 
                       Note: the pattern is cyclic with exactly two rounds and based on controlled repetitions, and only scores when both follow it correctly.
                       Observe the feedback when you score to decipher it.
                       
                       Rules:
                       1. Choose ONLY Red or Blue.
                       2. Your response must be strictly formatted as follows:
                       Choice: Red or Blue 
                       Reasoning: Explain in 15 words or less why you chose that color based on the pattern
                    """
    
    user_prompt  = f"""Complete history:
                       {format_history(history, is_player1)}

                       Current score: {score}
                       Your choice and reasoning:
                   """
    
    # Determine the model based on player type
    if player_type == "chatgpt":
        model = "gpt-5.1"  # OpenAI's best model
    else:  # deepseek
        model = "deepseek-chat"  # DeepSeek's best standard model (v3)
    
    for attempt in range(3):
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": user_prompt}
            ]
        )

        message = response.choices[0].message
        full_response = message.content.strip() if message.content else ""
        
        # If the response is empty, try to get from reasoning_content (for compatibility)
        if not full_response and hasattr(message, 'reasoning_content') and message.reasoning_content:
            full_response = message.reasoning_content.strip()
        
        is_valid, choice, reasoning = validate_response(full_response)
        
        if is_valid:
            return choice, reasoning
        
    raise ValueError(f"Invalid response after 3 attempts. Last response:\n{full_response}")

def run_game(rounds = 50, game_mode = "chatgpt", json_filename = 'flag_game.json'):
    client1, client2 = setup_clients(game_mode)

    # Configure player types based on game_mode
    if game_mode == "chatgpt":
        player1_type, player2_type = "chatgpt", "chatgpt"
        display_name1, display_name2 = "ChatGPT-5.1", "ChatGPT-5.1"
    elif game_mode == "deepseek":
        player1_type, player2_type = "deepseek", "deepseek"
        display_name1, display_name2 = "DeepSeek-V3", "DeepSeek-V3"
    else: # mixed mode
        player1_type, player2_type = "chatgpt", "deepseek"
        display_name1, display_name2 = "ChatGPT-5.1", "DeepSeek-V3"

    print(f"\n🔴🔵 Synchronization Game {display_name1} vs {display_name2} ({rounds} rounds) 🔵🔴\n")
    
    try:
        # Store the score that can accumulate
        score = 0
        # Add current choices with feedback from this round
        history  = []
        # Record data in JSON
        json_data = []

        for round_num in range(1, rounds + 1):
            # Player choices with reasoning
            p1, p1_reasoning = get_player_choice(client1, player1_type, history, score, True)
            p2, p2_reasoning = get_player_choice(client2, player2_type, history, score, False)
            
            feedback = ""
            if len(history):
                # Current pattern is synchronized alternation:
                # p1: 🔵, p2: 🔵
                # p1: 🔴, p2: 🔴 -- +1 point
                # p1: 🔵, p2: 🔵
                # p1: 🔴, p2: 🔴 -- +1 point
                # The order of which color starts doesn't matter, as long as they keep choosing the same color in alternation.

                last_p1, last_p2, _ = history[-1]
                
                if ((last_p1 == last_p2) and (p1 == p2) and (last_p1 != p1)):
                    score += 1
                    feedback = "Correct! +1 point"
                else:
                    # Specific feedback for the first round
                    feedback = "Wrong pattern"
            else:
                feedback = "Waiting for next round to verify pattern"
            
            history.append((p1, p2, feedback))
            json_data.append({
                "round": round_num,
                "player_1": player1_type,
                "color_player_1": p1,
                "reasoning_player_1": p1_reasoning,
                "player_2": player2_type,
                "color_player_2": p2,
                "reasoning_player_2": p2_reasoning,
                "score": score
            })
            
            print(f"Round {round_num}:")

            print(f"{display_name1}: {p1}")
            print(f"Reasoning: {p1_reasoning}")
            
            print(f"\n{display_name2}: {p2}")
            print(f"Reasoning: {p2_reasoning}")
            
            print(f"\nFeedback: {feedback}" + (f" | Points: {score}" if round_num > 1 else ""))
            print("─" * 70)
            print()
            
    except Exception as e:
        print(f"\nSERIOUS ERROR: {str(e)}")
        raise  # Propagate the error to show the complete stack trace
    finally:
        # Save data to JSON
        with open(json_filename, 'w') as jsonfile:
            json.dump(json_data, jsonfile, indent=2)

        print(f"\nGame data saved to: {json_filename}")
    
    print(f"\nFinal Score: {score} points!")

if __name__ == "__main__":
    game_mode = "mixed" # alternatives: "deepseek", "chatgpt"
    for i in range(0, 100):
        run_game(rounds=30, game_mode = game_mode, json_filename = f'data/{game_mode}_flag_game_{i}.json')
```
{{< /spoiler >}}

## Practical Considerations 

Cost-performance tradeoff: An important factor in model selection is cost. DeepSeek-V3 is significantly cheaper than GPT-5.1.

## Closing thoughts

This experiment demonstrates that LLM coordination capabilities vary significantly across models and even simple consecutive decisions such as choosing red or blue still carry their own biases.

- GPT-5.1 excels at reliable, consistent coordination;
- DeepSeek-V3 shows extreme bimodal performance with either perfect success or poor performance;
- Cross-model coordination remains broken.

Coordination is an emergent phenomena that current LLMs cannot execute reliably. Despite some success in same-model pairings, the complete failure of cross-model coordination and frequent breakdowns even after correct pattern identification suggest LLMs lack the underlying mechanisms necessary for robust coordinated behavior.

<br>

This project regards a specific kind of game with rather specific rules, but I reckon the main takeaway is that if you're deploying multiple agents for a given task, using the same model is preferable.

---
>  Project Date: November, 2025   
Models Tested: ChatGPT-5.1, DeepSeek-V3  
Total Games Analyzed: 300 games (9,000 rounds)  
Code: Python with OpenAI-compatible API