# SkillBoost - E-Learning Platform

SkillBoost is a next-generation e-learning platform built with **Angular** and **Spring Boot**. It offers personalized learning experiences, expert-led content, interactive course management, and certification. This project aims to bridge the global skills gap with accessible, industry-relevant, and engaging education.

---

## 🌟 Key Features

- 🎯 Personalized learning paths using AI-driven recommendations
- 👨‍🏫 Course management with video, quizzes, and downloadable content
- 📈 Progress tracking, gamification (badges, leaderboards)
- 📚 Certification management (automated & manual grading, PDF certificates)
- 💬 Peer-to-peer learning and live instructor Q&A sessions
- 💳 Subscription plans and secure payment processing
- 🛡️ Role-based access for Students, Instructors, and Admins

---

## 📦 Course Management Module

The Course Management Module is the core feature of SkillBoost, empowering instructors to build, deliver, and manage interactive courses.

### 🔧 Features

- **Instructor Dashboard**: Create, update, and manage course content
- **Multi-format Support**: Videos, PDFs, assignments, quizzes
- **Categorization & Search**: Courses are filterable by level, category, and instructor
- **Progress Tracking**: Completion percentage, last accessed lesson
- **Live Sessions**: Instructors can schedule webinars and Q&A
- **Course Reviews**: Learners can leave ratings and feedback
- **Gamification**: Badges and rewards upon course milestones

### 📘 Student Perspective

- Browse and enroll in categorized courses
- Follow structured content flow
- Participate in forums, polls, and live sessions
- Track progress in the "My Courses" section
- Rate and review completed courses

---

## 🛠️ Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | Angular            |
| Backend     | Spring Boot (Java) |
| Database    | MySQL              |
| Auth        | OAuth2, JWT        |
| File Storage| Local / Cloud (e.g., AWS S3) |
| Version Control | GitHub         |

---

## 📁 Project Structure

skillboost/
├── frontend/ # Angular frontend
│ └── src/app/
│ └── course-management/
├── backend/ # Spring Boot backend
│ └── src/main/java/com/skillboost/
│ └── course/
├── database/ # SQL Scripts
├── docs/ # Diagrams, mockups
└── README.md
Database (MySQL)
Create schema: skillboost_db

Update DB credentials in application.properties

Run initialization scripts from /database/init.sql

🧪 Testing
Unit Tests (JUnit, Jasmine)

Integration Testing for backend APIs

Manual Testing for Course Creation and Enrollment

🧑‍💻 Contributing
We welcome contributions! Please open an issue or create a pull request.
