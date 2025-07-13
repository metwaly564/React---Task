# Course Explorer - React Task

A modern, performant course exploration web application built with React, featuring infinite scrolling, search, filtering, and bookmark functionality.

## 🚀 Features

### Core Features
- **Course Browsing**: Browse through a comprehensive list of courses with beautiful cards
- **Search & Filter**: Search by course title or teacher name with 500ms debounced input
- **Category Filtering**: Filter courses by category (Frontend, Backend, etc.)
- **Course Details**: View detailed course information including lessons and statistics
- **Bookmark System**: Save and manage favorite courses with localStorage persistence

### Performance Features
- **Infinite Scrolling**: Load courses 6 at a time for optimal performance
- **List Virtualization**: Uses react-window for efficient rendering of large datasets
- **Race Condition Handling**: Cancels previous API calls when new ones are triggered
- **Debounced Search**: 500ms delay to prevent excessive API calls

### Technical Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface with smooth transitions
- **Error Handling**: Comprehensive error states and loading indicators
- **Local Storage**: Persistent bookmarks across browser sessions

## 🛠️ Tech Stack

- **Framework**: React 19 (Functional Components + Hooks)
- **Routing**: React Router DOM
- **State Management**: React Context API + useState/useEffect
- **Styling**: Tailwind CSS v4 (with Vite plugin)
- **API**: Axios for HTTP requests
- **Performance**: react-window + react-window-infinite-loader
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MockAPI account (for backend data)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd React---Task
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up MockAPI

1. Go to [MockAPI](https://mockapi.io) and create a new project
2. Create a resource called `courses` with the following schema:

```json
{
  "id": "string",
  "title": "string",
  "image_source": "string",
  "description": "string",
  "teacher": "string",
  "category": "string",
  "lessons": [
    {
      "title": "string",
      "duration": "number",
      "videos_count": "number"
    }
  ]
}
```

3. Add some sample data to your MockAPI
4. Copy your MockAPI URL (e.g., `https://your-project-id.mockapi.io`)

### 4. Configure API

Update the API base URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://6873dfedc75558e273558266.mockapi.io/api/v1';
```

Replace `YOUR_MOCKAPI_PROJECT_ID` with your actual MockAPI project ID.

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CourseCard.jsx   # Course display card
│   ├── Navbar.jsx       # Navigation bar
│   └── SearchAndFilter.jsx # Search and filter controls
├── context/             # React Context for state management
│   └── BookmarkContext.jsx # Bookmark state management
├── pages/               # Page components
│   ├── CoursesList.jsx  # Main courses listing page
│   ├── CourseDetails.jsx # Individual course details
│   └── Bookmarks.jsx    # Bookmarked courses page
├── services/            # API and external services
│   └── api.js          # MockAPI integration
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎯 Key Features Implementation

### Infinite Scrolling with Virtualization
- Uses `react-window` for efficient rendering
- Loads 6 courses at a time
- Handles large datasets (1000+ records) efficiently

### Debounced Search
- 500ms delay prevents excessive API calls
- Cancels previous requests when new search is initiated
- Smooth user experience with immediate UI feedback

### Bookmark System
- Context-based state management
- localStorage persistence
- Real-time updates across all components

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements

## 🧪 Testing the Application

1. **Course Browsing**: Navigate through the course list
2. **Search**: Try searching for courses by title or teacher
3. **Filtering**: Use category filters to narrow down results
4. **Bookmarking**: Click the bookmark icon on any course
5. **Course Details**: Click "View Details" to see full course information
6. **Bookmarks Page**: Visit the bookmarks page to see saved courses

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Configure build settings if needed

## 🔧 Customization

### Adding New Categories
1. Add categories to your MockAPI data
2. Categories will automatically appear in the filter dropdown

### Modifying Course Schema
1. Update the schema in MockAPI
2. Modify the API service in `src/services/api.js`
3. Update components to handle new fields

### Styling Changes
- Modify Tailwind classes in components
- Add custom CSS in `src/index.css`
- Update color scheme in Tailwind config

## 🐛 Troubleshooting

### API Issues
- Verify MockAPI URL is correct
- Check MockAPI project is active
- Ensure CORS is enabled in MockAPI settings

### Performance Issues
- Check browser console for errors
- Verify react-window is working correctly
- Monitor network requests in DevTools

### Styling Issues
- Ensure Tailwind CSS is properly installed
- Check if CSS classes are being applied
- Verify responsive breakpoints

## 📝 Commit History

The project follows detailed commit messages for each feature:

- **feat**: Add course browsing with infinite scroll
- **feat**: Implement search and filter functionality
- **feat**: Add course details page
- **feat**: Implement bookmark system with localStorage
- **perf**: Add list virtualization for large datasets
- **feat**: Add debounced search with race condition handling
- **style**: Implement responsive design with Tailwind CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of a React task.

## 👨‍💻 Author

Built with ❤️ using React and modern web technologies.

---

**Note**: Make sure to replace the MockAPI URL with your actual project URL before running the application.
