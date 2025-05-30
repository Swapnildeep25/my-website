import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tab, Tabs, Badge } from 'react-bootstrap';
import QuizCard from '../components/QuizCard';
import '../styles/Home.css';

// Mock quiz data
const mockQuizzes = [
  {
    id: 'quiz1',
    title: '₹9 Cricket Quiz',
    description: '5 questions, 2 minutes, win up to ₹20!',
    entryFee: 9,
    prizeDistribution: [20, 5, 2],
    startTime: new Date(Date.now() + 3600000), // 1 hour from now
    duration: 120,
    participants: ['user1', 'user2'],
    maxParticipants: 5,
    questions: [
      {
        text: "Who won the 2019 Cricket World Cup?",
        options: ["India", "Australia", "England", "New Zealand", "West Indies"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'quiz2',
    title: '₹49 Cricket Quiz',
    description: '5 questions, 2 minutes, win up to ₹150!',
    entryFee: 49,
    prizeDistribution: [150, 20, 10],
    startTime: new Date(Date.now() + 7200000), // 2 hours from now
    duration: 120,
    participants: [],
    maxParticipants: 5,
    questions: []
  },
  {
    id: 'quiz3',
    title: 'Free Practice Quiz',
    description: 'Practice with 5 cricket questions',
    entryFee: 0,
    prizeDistribution: [0, 0, 0],
    startTime: new Date(),
    duration: 120,
    participants: [],
    maxParticipants: 999,
    questions: []
  }
];

const Home = ({ user, initiatePayment }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('paid');

  useEffect(() => {
    // In a real app, you would fetch this from your backend
    setQuizzes(mockQuizzes);
  }, []);

  const handleJoinQuiz = (quizId, isPaid) => {
    if (isPaid) {
      const quiz = quizzes.find(q => q.id === quizId);
      initiatePayment(quiz);
    } else {
      // Navigate to quiz page
      window.location.href = `/quiz/${quizId}`;
    }
  };

  return (
    <Container className="home-container">
      <div className="hero-section">
        <h1>Cricket Quiz Challenge</h1>
        <p>Test your cricket knowledge and win real money!</p>
        {user && (
          <div className="wallet-info">
            <span>Wallet: ₹{user.wallet}</span>
            <Button variant="outline-light" size="sm" href="/wallet">Add Money</Button>
          </div>
        )}
      </div>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4 quiz-tabs"
      >
        <Tab eventKey="paid" title={
          <span>
            Play With Money <Badge bg="success">{quizzes.filter(q => q.entryFee > 0).length}</Badge>
          </span>
        }>
          <Row>
            {quizzes.filter(q => q.entryFee > 0).map(quiz => (
              <Col key={quiz.id} md={6} lg={4} className="mb-4">
                <QuizCard 
                  quiz={quiz} 
                  user={user} 
                  onJoin={() => handleJoinQuiz(quiz.id, true)} 
                />
              </Col>
            ))}
          </Row>
        </Tab>
        <Tab eventKey="free" title="Play For Free">
          <Row>
            {quizzes.filter(q => q.entryFee === 0).map(quiz => (
              <Col key={quiz.id} md={6} lg={4} className="mb-4">
                <QuizCard 
                  quiz={quiz} 
                  user={user} 
                  onJoin={() => handleJoinQuiz(quiz.id, false)} 
                />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Home;
Add Home.jsx
