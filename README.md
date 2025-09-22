# Talk with Notes 📝💬

> An intelligent note-taking application that combines traditional note management with AI-powered chat functionality, allowing users to interact with their notes using Google's Gemini AI.

## 🌟 Features

- **Smart Note Management**: Create, edit, search, and organize your notes efficiently
- **AI-Powered Chat**: Chat with your notes using Google Gemini AI for intelligent insights and queries
- **User Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Modern, mobile-friendly interface built with React and Tailwind CSS
- **Real-time Search**: Instant note search functionality
- **Profile Management**: User profiles with customizable settings

## 🚀 Live Demo

🌐 **[View Live Application](https://your-deployed-app-url.com)** _(Update with your actual deployment URL)_

## 🛠️ Tech Stack

### Backend

- **FastAPI** - High-performance Python web framework
- **MongoDB** - NoSQL database with Motor async driver
- **Google Gemini AI** - AI-powered chat functionality
- **JWT Authentication** - Secure token-based authentication
- **Pydantic** - Data validation and settings management

### Frontend

- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons library

## 📁 Project Structure

```
Talk_with_Notes/
├── Backend/                    # FastAPI backend server
│   ├── main.py                # Main application entry point
│   ├── auth.py                # Authentication logic
│   ├── chat.py                # AI chat functionality
│   ├── notes.py               # Notes management
│   ├── database.py            # Database connection and models
│   ├── schemas.py             # Pydantic data schemas
│   └── requirements.txt       # Python dependencies
├── React-Frontend/             # React frontend application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Application pages
│   │   ├── services/          # API service functions
│   │   └── assets/            # Static assets
│   ├── package.json           # Node.js dependencies
│   └── vite.config.js         # Vite configuration
└── README.md                  # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites

- Python 3.8+
- Node.js 16+
- MongoDB instance
- Google Gemini AI API key

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Deepak-Yadav-14/Talk_with_Notes.git
   cd Talk_with_Notes/Backend
   ```

2. **Create and activate virtual environment**

   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration**
   Create a `.env` file in the Backend directory:

   ```env
   MONGODB_URL=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   GOOGLE_AI_API_KEY=your_gemini_api_key
   CORS_ORIGINS=http://localhost:5173,http://localhost:3000
   ```

5. **Run the backend server**
   ```bash
   uvicorn main:app --reload
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../React-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update the API base URL in `src/services/api.js` if needed.

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 🔑 API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for interactive API documentation powered by Swagger UI.

### Key Endpoints

- `POST /auth/register` - User registration
- `POST /auth/token` - User login
- `GET /auth/users/me` - Get current user
- `GET /notes/` - Get user notes
- `POST /notes/` - Create new note
- `PUT /notes/{note_id}` - Update note
- `DELETE /notes/{note_id}` - Delete note
- `POST /chat/` - Chat with AI about notes

## 🎯 Usage

1. **Register/Login**: Create an account or log in to access the application
2. **Create Notes**: Add your notes using the intuitive interface
3. **Search & Organize**: Use the search functionality to quickly find specific notes
4. **AI Chat**: Interact with the AI chatbot to ask questions about your notes
5. **Profile Management**: Update your profile and preferences

## 🚀 Deployment

### Backend Deployment

- Deploy on platforms like Heroku, Railway, or DigitalOcean
- Ensure environment variables are properly configured
- Set up MongoDB Atlas for production database

### Frontend Deployment

- Build the application: `npm run build`
- Deploy on Vercel, Netlify, or any static hosting service
- Update API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Deepak Yadav**

- GitHub: [@Deepak-Yadav-14](https://github.com/Deepak-Yadav-14)
- LinkedIn: [Connect with me](https://linkedin.com/in/your-profile) _(Update with your actual LinkedIn)_

## 🙏 Acknowledgments

- Google Gemini AI for providing powerful AI capabilities
- FastAPI team for the excellent web framework
- React and Vite communities for amazing development tools
- Tailwind CSS for beautiful styling utilities

## 📞 Support

If you have any questions or run into issues, please feel free to:

- Open an issue on GitHub
- Contact me directly through my social profiles

---

⭐ **If you found this project helpful, please give it a star!** ⭐
