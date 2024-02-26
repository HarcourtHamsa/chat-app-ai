import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import insightImage from "./images/team-success.png";
import { submitQuizResponse } from "./utils/quiz";
import { useNavigate } from "react-router-dom";

const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [showCustomAnswerInput, setShowCustomAnswerInput] = useState(false);
  const [showQuizAnalysis, setShowQuizAnalysis] = useState(false);
  const [followUpResponse, setFollowUpResponse] = useState("");
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const quizData = [
    // Business Type
    {
      question: "What type of business entity is your company?",
      suggestions: [
        {
          text: "Sole Proprietorship",
          followUpQuestion:
            "Great! How many employees does your Sole Proprietorship have?",
        },
        {
          text: "Partnership",
          followUpQuestion:
            "Okay. How many partners are there in your Partnership?",
        },
        {
          text: "Corporation",
          followUpQuestion:
            "Nice choice! What industry does your Corporation operate in?",
        },
        {
          text: "Limited Liability Company (LLC)",
          followUpQuestion:
            "Interesting! What is the main reason for forming your LLC?",
        },
      ],
    },
    // Size
    {
      question: "How many employees does your company have?",
      suggestions: [
        {
          text: "1-10",
          followUpQuestion:
            "Small team! What are some advantages of having a small team?",
        },
        {
          text: "11-50",
          followUpQuestion:
            "Medium-sized! What challenges do you face in managing a medium-sized team?",
        },
        {
          text: "51-200",
          followUpQuestion:
            "Growing! How do you maintain company culture as you scale?",
        },
        {
          text: "200+",
          followUpQuestion:
            "Large workforce! How do you ensure effective communication across departments?",
        },
      ],
    },
    // Operational Areas
    {
      question: "In which geographical regions does your company operate?",
      suggestions: [
        {
          text: "Local",
          followUpQuestion:
            "Keeping it close! What are the benefits of focusing on the local market?",
        },
        {
          text: "National",
          followUpQuestion:
            "Expanding across borders! How do you navigate regulatory differences between states?",
        },
        {
          text: "International",
          followUpQuestion:
            "Going global! What are the biggest challenges in international expansion?",
        },
      ],
    },
    // Goals
    {
      question: "What are the primary goals of your company?",
      suggestions: [
        {
          text: "Increase Revenue",
          followUpQuestion:
            "Revenue growth! What strategies are you implementing to increase revenue?",
        },
        {
          text: "Market Expansion",
          followUpQuestion:
            "Expanding horizons! How do you identify new market opportunities?",
        },
        {
          text: "Product Innovation",
          followUpQuestion:
            "Innovation focus! How do you foster a culture of innovation within your company?",
        },
        {
          text: "Customer Satisfaction",
          followUpQuestion:
            "Customer-centric! What measures do you take to ensure customer satisfaction?",
        },
      ],
    },
    // Challenges
    {
      question: "What are the major challenges your company faces?",
      suggestions: [
        {
          text: "Competition",
          followUpQuestion:
            "Competitive landscape! How do you differentiate your offerings from competitors?",
        },
        {
          text: "Regulatory Compliance",
          followUpQuestion:
            "Compliance matters! How do you stay updated with changing regulations?",
        },
        {
          text: "Resource Constraints",
          followUpQuestion:
            "Resource management! How do you prioritize resource allocation?",
        },
        {
          text: "Technology Adoption",
          followUpQuestion:
            "Tech-savvy! How do you ensure smooth adoption of new technologies?",
        },
      ],
    },
  ];

  const handleSubmitResponses = ({ responses }) => {
    setIsLoading(true);

    submitQuizResponse({ responses })
      .then((res) => {
        const data = res.data;
        navigate("/insight", { state: { data: data } });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    const question = quizData[currentQuestionIndex].question;
    const answer = quizData[currentQuestionIndex].suggestions[answerIndex].text;

    setResponses((prevState) => [...prevState, { question, answer }]);

    setShowFollowUp(true);
  };

  const handleNextQuestion = () => {
    if (quizData.length === currentQuestionIndex + 1) {
      setShowQuizAnalysis(true);
      return;
    }

    const question =
      quizData[currentQuestionIndex].suggestions[selectedAnswer]
        .followUpQuestion;
    const answer = followUpResponse;

    setResponses((prevState) => [...prevState, { question, answer }]);

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setShowFollowUp(false);
    setShowCustomAnswerInput(false);
    setFollowUpResponse("");
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="quiz__wrapper">
      <div className="container">
        <div className="quiz__question">
          <h2>{currentQuestion.question}</h2>
        </div>

        {showFollowUp && (
          <div>
            <div className="quiz__feedback">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(
                      currentQuestion.suggestions[selectedAnswer]
                        .followUpQuestion
                    )
                    .callFunction(() => {
                      console.log("String typed out!");
                    })
                    .start();
                }}
                options={{ devMode: true }}
              />
            </div>
            <div className="quiz__followup__feedback">
              <div className="quiz__followup">
                <input
                  placeholder="Enter your response"
                  name="followUpResponse"
                  value={followUpResponse}
                  onChange={(e) => setFollowUpResponse(e.target.value)}
                />
              </div>
            </div>

            <button className="next__button" onClick={handleNextQuestion}>
              Submit Response
            </button>
          </div>
        )}

        <div className="bottom__section">
          <ul className="outer__quiz__suggestions">
            <ul className="quiz__suggestions">
              {currentQuestion.suggestions.map((answer, index) => (
                <li
                  key={index}
                  className="suggestion"
                  onClick={() => handleAnswerClick(index)}
                  style={{ cursor: "pointer" }}
                >
                  {answer.text}
                </li>
              ))}
            </ul>

            <li
              className="suggestion"
              onClick={() => setShowCustomAnswerInput(!showCustomAnswerInput)}
              style={{ cursor: "pointer" }}
            >
              Custom Answer
            </li>
          </ul>

          {showCustomAnswerInput && (
            <textarea
              className="quiz__custom__input"
              placeholder="Type your answer here..."
            />
          )}
        </div>

        {showQuizAnalysis && (
          <div className="overlay">
            <div className="modal">
              <div className="modal__header">
                <button
                  onClick={() => {
                    setShowQuizAnalysis(false);
                    setShowFollowUp(false);
                    setCurrentQuestionIndex(0);
                  }}
                >
                  Close
                </button>
              </div>

              <div className="modal__body">
                <img src={insightImage} width={200} alt="celebration" />
                <h2>Congratulations</h2>
                <p>Would you like to generate a report?</p>
              </div>

              <div className="modal__footer">
                <button
                  onClick={() => {
                    setShowQuizAnalysis(false);
                    setShowFollowUp(false);
                    setCurrentQuestionIndex(0);
                  }}
                >
                  No
                </button>
                <button onClick={() => handleSubmitResponses({ responses })}>
                  {isLoading ? "Generating..." : "Yes, Generate Report"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
