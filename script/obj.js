let taskList = [
    {
        'category': 'to_do',
        'type': 'User Story',
        'name': 'Task Board Drag & Drop',
        'description': 'Add drag and drop functionality for better UX.',
        'subtasks': null,
        'participants': null,
        'priority': 'medium',
        'date': '19/10/2025',
    },
    {
        'category': 'to_do',
        'type': 'Technical Task',
        'name': 'Unit Testing Setup',
        'description': 'Initialize Jest and write basic test cases.',
        'subtasks': [
            { 'name': 'Install Jest', 'status': true },
            { 'name': 'Write Sample Tests', 'status': false }
        ],
        'participants': [
            { 'name': ['Sven', 'Degen'] }
        ],
        'priority': 'low',
        'date': '20/10/2025'
    },
    {
        'category': 'to_do',
        'type': 'User Story',
        'name': 'Contact Form Validation',
        'description': null,
        'subtasks': [
            { 'name': 'Frontend Validation', 'status': true },
            { 'name': 'Backend Validation', 'status': false }
        ],
        'participants': null,
        'priority': 'medium',
        'date': '21/10/2025'
    },
    {
        'category': 'to_do',
        'type': 'Technical Task',
        'name': 'Deployment Pipeline',
        'description': 'Setup CI/CD with GitHub Actions.',
        'subtasks': [
            { 'name': 'Create Workflow', 'status': true },
            { 'name': 'Add Test Step', 'status': true },
            { 'name': 'Deploy to Server', 'status': false }
        ],
        'participants': [
            { 'name': ['Furkan', 'Yigit'] },
            { 'name': ['David', 'Groß'] }
        ],
        'priority': 'urgent',
        'date': '22/10/2025'
    },
    {
        'category': 'in_progress',
        'type': 'User Story',
        'name': 'Join mit den besten zusammenstellen',
        'description': 'Building all Pages with HTML and CSS and then we add functionality for the website!',
        'subtasks': [
            { 'name': 'Page Overlays', 'status': false },
            { 'name': 'functions', 'status': false },
            { 'name': 'responsive', 'status': false },
            { 'name': 'databank', 'status': false },
            { 'name': 'final control', 'status': false }
        ],
        'participants': [
            { 'name': ['Furkan', 'Yigit'] },
            { 'name': ['Can', 'Marco'] },
            { 'name': ['Test', 'Person'] },
            { 'name': ['David', 'Groß'] },
            { 'name': ['Kim', 'B'] }
        ],
        'priority': 'urgent',
        'date': '11/10/2025'
    },
    {
        'category': 'in_progress',
        'type': 'User Story',
        'name': 'Landing Page Redesign',
        'description': 'Improve layout and visuals for better conversion rate.',
        'subtasks': [
            { 'name': 'Hero Section', 'status': true },
            { 'name': 'Animations', 'status': false },
            { 'name': 'Accessibility', 'status': true }
        ],
        'participants': [
            { 'name': ['Furkan', 'Yigit'] },
            { 'name': ['Can', 'Marco'] }
        ],
        'priority': 'medium',
        'date': '12/10/2025'
    },
    {
        'category': 'in_progress',
        'type': 'Technical Task',
        'name': 'Database Optimization',
        'description': 'Reduce query load times and add indexing.',
        'subtasks': [
            { 'name': 'Add Indexes', 'status': true },
            { 'name': 'Refactor Queries', 'status': false }
        ],
        'participants': [
            { 'name': ['Sven', 'Degen'] }
        ],
        'priority': 'urgent',
        'date': '13/10/2025'
    },
    {
        'category': 'in_progress',
        'type': 'User Story',
        'name': 'User Authentication Flow',
        'description': 'Add secure login and signup with validation.',
        'subtasks': [
            { 'name': 'Login Page', 'status': true },
            { 'name': 'Signup Page', 'status': false },
            { 'name': 'Password Reset', 'status': false }
        ],
        'participants': [
            { 'name': ['David', 'Groß'] },
            { 'name': ['Kim', 'B'] }
        ],
        'priority': 'high',
        'date': '15/10/2025'
    },
    {
        'category': 'await_feedback',
        'type': 'Technical Task',
        'name': 'JavaScript Templates',
        'description': null,
        'subtasks': null,
        'participants': null,
        'priority': 'urgent',
        'date': '11/10/2025'
    },
    {
        'category': 'await_feedback',
        'type': 'Technical Task',
        'name': 'API Integration Weather Data',
        'description': 'Fetch live weather data from OpenWeather API.',
        'subtasks': null,
        'participants': null,
        'priority': 'low',
        'date': '16/10/2025'
    },
    {
        'category': 'await_feedback',
        'type': 'User Story',
        'name': 'Profile Settings Page',
        'description': null,
        'subtasks': [
            { 'name': 'Upload Avatar', 'status': true },
            { 'name': 'Change Password', 'status': false }
        ],
        'participants': [
            { 'name': ['Can', 'Marco'] }
        ],
        'priority': 'medium',
        'date': '17/10/2025'
    },
];