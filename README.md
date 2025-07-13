# Course Explorer - React Task

A modern, performant course exploration web application built with React, featuring infinite scrolling, search, filtering, bookmark functionality, and enhanced bonus features.

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
- **Enhanced Caching**: localStorage caching with 5-minute expiry for better performance

### Bonus Features ✅
- **Responsive Layout**: Mobile-first design with tablet and desktop optimizations
- **Smooth Animations**: Fade-in, slide-in, scale-in animations throughout the app
- **Enhanced Mobile Experience**: Touch-friendly buttons, mobile-optimized text, hamburger menu
- **Advanced Caching System**: Intelligent caching with expiry handling and cache management
- **Loading States**: Beautiful skeleton loaders and loading indicators
- **Hover Effects**: Interactive hover states with smooth transitions
- **Accessibility**: Proper ARIA labels, keyboard navigation, and touch targets
- **Error Handling**: Comprehensive error states with helpful guidance

### Technical Features
- **Modern UI**: Clean, intuitive interface with smooth transitions
- **Error Handling**: Comprehensive error states and loading indicators
- **Local Storage**: Persistent bookmarks and intelligent caching across browser sessions
- **Performance Optimized**: Efficient rendering, caching, and data management

## 🛠️ Tech Stack

- **Framework**: React 19 (Functional Components + Hooks)
- **Routing**: React Router DOM
- **State Management**: React Context API + useState/useEffect
- **Styling**: Tailwind CSS v4 (with Vite plugin)
- **API**: Axios for HTTP requests
- **Performance**: react-window + react-window-infinite-loader
- **Build Tool**: Vite
- **Caching**: Custom localStorage caching system with expiry

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
│   ├── CourseCard.jsx   # Course display card with animations
│   ├── Navbar.jsx       # Responsive navigation bar
│   └── SearchAndFilter.jsx # Enhanced search and filter controls
├── context/             # React Context for state management
│   └── BookmarkContext.jsx # Bookmark state management
├── pages/               # Page components
│   ├── CoursesList.jsx  # Main courses listing with infinite scroll
│   ├── CourseDetails.jsx # Individual course details page
│   └── Bookmarks.jsx    # Bookmarked courses page
├── services/            # API and external services
│   └── api.js          # MockAPI integration with caching
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles, animations, and responsive design
```

## 🎯 Key Features Implementation

### Infinite Scrolling with Virtualization
- Uses `react-window` for efficient rendering
- Loads 6 courses at a time
- Handles large datasets (1000+ records) efficiently
- Smooth loading states with skeleton animations

### Debounced Search with Race Condition Handling
- 500ms delay prevents excessive API calls
- Cancels previous requests when new search is initiated
- Visual search indicator during debounce period
- Clear search functionality with one-click

### Enhanced Caching System
- localStorage-based caching with 5-minute expiry
- Automatic cache cleanup on app start
- Cache statistics and management functions
- Fallback to API when cache is expired or unavailable

### Responsive Design & Animations
- Mobile-first approach with breakpoint optimizations
- Smooth fade-in, slide-in, and scale-in animations
- Touch-friendly interface elements (44px minimum touch targets)
- Hamburger menu for mobile navigation
- Optimized typography and spacing for different screen sizes

### Bookmark System
- Context-based state management
- localStorage persistence
- Real-time updates across all components
- Quick actions for bulk operations

## 🎨 Animation System

The app includes a comprehensive animation system:

- **Fade-in animations**: For page loads and content appearance
- **Slide-in animations**: For navigation and menu transitions
- **Scale-in animations**: For interactive elements and cards
- **Hover effects**: Smooth transitions on interactive elements
- **Loading animations**: Skeleton loaders and spinners
- **Staggered animations**: Sequential loading of list items

## 📱 Mobile & Tablet Optimizations

- **Touch-friendly interface**: All interactive elements meet 44px minimum size
- **Responsive navigation**: Hamburger menu for mobile devices
- **Optimized typography**: Readable text sizes across all devices
- **Efficient layouts**: Grid systems that adapt to screen size
- **Performance optimizations**: Reduced animations on low-end devices

## 🧪 Testing the Application

1. **Course Browsing**: Navigate through the course list with infinite scroll
2. **Search & Filter**: Test debounced search and category filtering
3. **Bookmarking**: Add/remove bookmarks and check persistence
4. **Course Details**: View detailed course information and lessons
5. **Responsive Design**: Test on mobile, tablet, and desktop
6. **Caching**: Check browser console for cache logs
7. **Animations**: Observe smooth transitions throughout the app

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

### Cache Configuration
- Adjust cache expiry time in `src/services/api.js`
- Modify cache prefix for multiple app instances
- Customize cache cleanup behavior

## 🐛 Troubleshooting

### API Issues
- Verify MockAPI URL is correct
- Check MockAPI project is active
- Ensure CORS is enabled in MockAPI settings
- Check browser console for cache logs

### Performance Issues
- Check browser console for errors
- Verify react-window is working correctly
- Monitor network requests in DevTools
- Clear cache if needed: `courseAPI.clearAllCourseCache()`

### Styling Issues
- Ensure Tailwind CSS is properly installed
- Check if CSS classes are being applied
- Verify responsive breakpoints
- Test animations on different devices

### Mobile Issues
- Verify touch targets are large enough
- Check hamburger menu functionality
- Test responsive layouts on various devices
- Ensure proper viewport meta tags

## 📝 Commit History

The project follows detailed commit messages for each feature:

- **feat**: Add course browsing with infinite scroll
- **feat**: Implement search and filter functionality
- **feat**: Add course details page
- **feat**: Implement bookmark system with localStorage
- **perf**: Add list virtualization for large datasets
- **feat**: Add debounced search with race condition handling
- **style**: Implement responsive design with Tailwind CSS
- **feat**: Add enhanced caching system with expiry
- **feat**: Implement smooth animations and transitions
- **feat**: Add mobile-optimized navigation and touch targets
- **perf**: Optimize performance with skeleton loaders

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

## 🏆 Bonus Features Summary

✅ **Responsive Layout**: Mobile-first design with tablet and desktop optimizations  
✅ **Animations & Transitions**: Smooth fade-in, slide-in, and scale-in animations  
✅ **Enhanced Caching**: localStorage caching with expiry and management  
✅ **Mobile Experience**: Touch-friendly interface with hamburger menu  
✅ **Loading States**: Beautiful skeleton loaders and loading indicators  
✅ **Accessibility**: Proper ARIA labels and keyboard navigation  
✅ **Performance**: Optimized rendering and efficient data management  
✅ **Error Handling**: Comprehensive error states with helpful guidance
