let taskList = [
    {
        'id' : '0',
        'category': 'to-do',
        'type': 'User Story',
        'name': 'Task Board Drag & Drop',
        'description': 'Add drag and drop functionality for better UX.',
        'subtasks': null,
        'participants': null,
        'priority': 'medium',
        'date': '2025-10-19',
    },
    {
        'id' : '1',
        'category': 'to-do',
        'type': 'Technical Task',
        'name': 'Unit Testing Setup',
        'description': 'Initialize Jest and write basic test cases.',
        'subtasks': [
            { 'name': 'Install Jest', 'status': true },
            { 'name': 'Write Sample Tests', 'status': false }
        ],
        'participants': [
            { 'name': 'Anton Mayer'}
        ],
        'priority': 'low',
        'date': '2025-10-20'
    },
    {
        'id' : '2',
        'category': 'to-do',
        'type': 'User Story',
        'name': 'Contact Form Validation',
        'description': null,
        'subtasks': [
            { 'name': 'Frontend Validation', 'status': true },
            { 'name': 'Backend Validation', 'status': false }
        ],
        'participants': null,
        'priority': 'medium',
        'date': '2025-10-21'
    },
    {
        'id' : '3',
        'category': 'to-do',
        'type': 'Technical Task',
        'name': 'Deployment Pipeline',
        'description': 'Setup CI-CD with GitHub Actions.',
        'subtasks': [
            { 'name': 'Create Workflow', 'status': true },
            { 'name': 'Add Test Step', 'status': true },
            { 'name': 'Deploy to Server', 'status': false }
        ],
        'participants': [
            { 'name': 'Tatjana Wolf'},
            { 'name': 'Anja Schulz'}
        ],
        'priority': 'urgent',
        'date': '2025-10-22'
    },
    {
        'id' : '4',
        'category': 'in-progress',
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
            { 'name': 'Tatjana Wolf'},
            { 'name': 'David Eisenberg'},
            { 'name': 'Emmanuel Mauer'},
            { 'name': 'Anja Schulz'},
            { 'name': 'Anton Mayer'},
        ],
        'priority': 'urgent',
        'date': '2025-10-11'
    },
    {
        'id' : '5',
        'category': 'in-progress',
        'type': 'User Story',
        'name': 'Landing Page Redesign',
        'description': 'Improve layout and visuals for better conversion rate.',
        'subtasks': [
            { 'name': 'Hero Section', 'status': true },
            { 'name': 'Animations', 'status': false },
            { 'name': 'Accessibility', 'status': true }
        ],
        'participants': [
            { 'name': 'Eva Fischer'},
            { 'name': 'Anja Schulz'}
        ],
        'priority': 'medium',
        'date': '2025-10-12'
    },
    {
        'id' : '6',
        'category': 'in-progress',
        'type': 'Technical Task',
        'name': 'Database Optimization',
        'description': 'Reduce query load times and add indexing.',
        'subtasks': [
            { 'name': 'Add Indexes', 'status': true },
            { 'name': 'Refactor Queries', 'status': false }
        ],
        'participants': [
            { 'name': 'Eva Fischer'}
        ],
        'priority': 'urgent',
        'date': '2025-10-13'
    },
    {
        'id' : '7',
        'category': 'in-progress',
        'type': 'User Story',
        'name': 'User Authentication Flow',
        'description': 'Add secure login and signup with validation.',
        'subtasks': [
            { 'name': 'Login Page', 'status': true },
            { 'name': 'Signup Page', 'status': false },
            { 'name': 'Password Reset', 'status': false }
        ],
        'participants': [
            { 'name': 'Anton Mayer'},
            { 'name': 'David Eisenberg'}
        ],
        'priority': 'high',
        'date': '2025-10-15'
    },
    {
        'id' : '8',
        'category': 'await-feedback',
        'type': 'Technical Task',
        'name': 'JavaScript Templates',
        'description': null,
        'subtasks': null,
        'participants': null,
        'priority': 'urgent',
        'date': '2025-10-11'
    },
    {
        'id' : '9',
        'category': 'await-feedback',
        'type': 'Technical Task',
        'name': 'API Integration Weather Data',
        'description': 'Fetch live weather data from OpenWeather API.',
        'subtasks': null,
        'participants': null,
        'priority': 'low',
        'date': '2025-10-16'
    },
    {
        'id' : '10',
        'category': 'await-feedback',
        'type': 'User Story',
        'name': 'Profile Settings Page',
        'description': null,
        'subtasks': [
            { 'name': 'Upload Avatar', 'status': true },
            { 'name': 'Change Password', 'status': false }
        ],
        'participants': [
            { 'name': 'David Eisenberg'}
        ],
        'priority': 'medium',
        'date': '2025-10-17'
    },
];