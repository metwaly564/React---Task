# React Task – Course Explorer (8 Hours)

# Objective :

Build a Course Explorer web app where users can:

-   Browse a list of courses
-   View course details
-   Search and filter courses
-   Bookmark favorite courses
-   Handle large datasets efficiently

# Features to Implement :

-   Courses List Page
    Fetch courses from Mock API
    Display cards with:
    Title
    image
    Teacher name
    Short description
    Category
    Bookmark toggle (Add/Remove)

-   Search & Filter
    Search by course title or teacher
    Filter by category (e.g., "Frontend", "Backend")

-   Course Details Page
    Show full course info:
    Title, Image ,full description, teacher, category
    List of lessons (title + duration)

-   Bookmarks Page
    Show all bookmarked courses
    Bookmarks stored in localStorage
    Option to remove a bookmark

# Required Challenges :

Challenge 1: Large Dataset Performance
The course list should handle large datasets (1,000+ records).
Implement pagination or infinite scroll (fetching data 6 by 6)
Use list virtualization (e.g., react-window or react-virtualized) to boost performance

Challenge 2: Debounced Search + Race Condition Handling
Add 500ms debounce to search input
Cancel previous API calls if a new one is triggered before the last finishes

Bonus (Optional) :
Responsive layout (mobile/tablet)
Animations or transitions
Add caching in localStorage + proper handling of cache fetch and expiry

# Tech Requirements:

Framework : React (functional components + hooks)
Routing : React Router
State : useState, useEffect, Context (if needed)
Styling : (Tailwind, styled-components, CSS)
API : Use provided MockAPI
Data Storage: localStorage for bookmarks

# Deliverables :

GitHub repo with:
Clean code and commits (DETAILED COMMITS MESSAGES FOR EACH FEATURE)
README with setup instructions

-   Live demo (Vercel/Netlify/etc) – optional but appreciated \*

# Time Estimate :

~8 hours total. Take breaks, structure your time well.

# API Access :

You’ll create your own project at https://mockapi.io and define a courses, lessons resource.

# Suggested schema :

    {
        "id": "string",
        "title": "string",
        "image_source":"string",
        "description": "string",
        "teacher": "string",
        "category": "string",
        "lessons": [
            {
                "title": "string",
                "duration": number,
                "videos_count": number
            }
        ]
    }

# How to Submit :

    Share the GitHub repo link
    (Optional) Share a link to a live deployment

# What We Evaluate :

Code Quality : Clean structure, reusable components, naming
React Knowledge : Proper use of state, effects, and async logic
UX Design : Simple, usable, responsive interface
Performance : Efficient rendering, optimization of large lists
Problem Solving : Handling race conditions, managing large datasets, handling errors
Communication : Clear README and understandable, CLEAR commit history
