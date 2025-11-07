
/**
 * Creates example tasks for new users to demonstrate the application
 * Generates 5 sample tasks with different priorities, categories, and statuses
 * @returns {Array} Array of 5 example task objects
 */
function createExampleTasks() {
    const exampleTasks = [
        {
            "id": 0,
            "name": "Design Landing Page",
            "description": "Create a modern and responsive landing page for our new product launch with compelling visuals and clear call-to-action buttons.",
            "date": "2025-11-15",
            "priority": "urgent",
            "category": "to-do",
            "type": "User Story",
            "participants": [
                {"name": "Alice Johnson"},
                {"name": "Bob Smith"}
            ],
            "subtasks": [
                {"name": "Create wireframes", "status": true},
                {"name": "Design mockups", "status": false},
                {"name": "Implement responsive layout", "status": false}
            ]
        },
        {
            "id": 1,
            "name": "Setup Database Schema",
            "description": "Design and implement the database structure for user management, content storage, and analytics tracking.",
            "date": "2025-11-20",
            "priority": "medium",
            "category": "in-progress",
            "type": "Technical Task",
            "participants": [
                {"name": "Charlie Brown"},
                {"name": "Diana Prince"}
            ],
            "subtasks": [
                {"name": "Define entity relationships", "status": true},
                {"name": "Create migration scripts", "status": true},
                {"name": "Setup indexes", "status": false}
            ]
        },
        {
            "id": 2,
            "name": "User Authentication System",
            "description": "Implement secure user login, registration, and password recovery functionality with two-factor authentication support.",
            "date": "2025-11-25",
            "priority": "urgent",
            "category": "await-feedback",
            "type": "Technical Task",
            "participants": [
                {"name": "Eva Martinez"},
                {"name": "Frank Wilson"}
            ],
            "subtasks": [
                {"name": "Implement login flow", "status": true},
                {"name": "Add password validation", "status": true},
                {"name": "Setup 2FA", "status": true},
                {"name": "Test security measures", "status": false}
            ]
        },
        {
            "id": 3,
            "name": "Mobile App Testing",
            "description": "Comprehensive testing of the mobile application across different devices and operating systems to ensure optimal performance.",
            "date": "2025-11-12",
            "priority": "low",
            "category": "done",
            "type": "User Story",
            "participants": [
                {"name": "Grace Lee"},
                {"name": "Henry Davis"}
            ],
            "subtasks": [
                {"name": "Test on Android devices", "status": true},
                {"name": "Test on iOS devices", "status": true},
                {"name": "Performance testing", "status": true},
                {"name": "Create test report", "status": true}
            ]
        },
        {
            "id": 4,
            "name": "API Documentation",
            "description": "Create comprehensive API documentation for developers including examples, authentication methods, and error handling.",
            "date": "2025-11-30",
            "priority": "medium",
            "category": "to-do",
            "type": "Technical Task",
            "participants": [
                {"name": "Isabel Garcia"},
                {"name": "Jack Thompson"}
            ],
            "subtasks": [
                {"name": "Document endpoints", "status": false},
                {"name": "Add code examples", "status": false},
                {"name": "Create interactive guide", "status": false}
            ]
        }
    ];
    return exampleTasks;
}

/**
 * Creates example contacts for new users to demonstrate the contact management features
 * Generates 10 sample contacts with diverse names, emails, and phone numbers
 * @returns {Array} Array of 10 example contact objects
 */
function createExampleContacts() {
    const exampleContacts = [
        {
            "name": "Alice Johnson",
            "email": "alice.johnson@email.com",
            "phone": "+1 (555) 123-4567",
            "fillColor": "#FF6B6B",
            "nameLetters": "AJ"
        },
        {
            "name": "Bob Smith",
            "email": "bob.smith@email.com", 
            "phone": "+1 (555) 234-5678",
            "fillColor": "#4ECDC4",
            "nameLetters": "BS"
        },
        {
            "name": "Charlie Brown",
            "email": "charlie.brown@email.com",
            "phone": "+1 (555) 345-6789",
            "fillColor": "#45B7D1",
            "nameLetters": "CB"
        },
        {
            "name": "Diana Prince",
            "email": "diana.prince@email.com",
            "phone": "+1 (555) 456-7890",
            "fillColor": "#96CEB4",
            "nameLetters": "DP"
        },
        {
            "name": "Eva Martinez",
            "email": "eva.martinez@email.com",
            "phone": "+1 (555) 567-8901",
            "fillColor": "#FECA57",
            "nameLetters": "EM"
        },
        {
            "name": "Frank Wilson",
            "email": "frank.wilson@email.com",
            "phone": "+1 (555) 678-9012",
            "fillColor": "#FF9FF3",
            "nameLetters": "FW"
        },
        {
            "name": "Grace Lee",
            "email": "grace.lee@email.com",
            "phone": "+1 (555) 789-0123",
            "fillColor": "#54A0FF",
            "nameLetters": "GL"
        },
        {
            "name": "Henry Davis",
            "email": "henry.davis@email.com",
            "phone": "+1 (555) 890-1234",
            "fillColor": "#5F27CD",
            "nameLetters": "HD"
        },
        {
            "name": "Isabel Garcia",
            "email": "isabel.garcia@email.com",
            "phone": "+1 (555) 901-2345",
            "fillColor": "#00D2D3",
            "nameLetters": "IG"
        },
        {
            "name": "Jack Thompson",
            "email": "jack.thompson@email.com",
            "phone": "+1 (555) 012-3456",
            "fillColor": "#FF6348",
            "nameLetters": "JT"
        }
    ];
    return exampleContacts;
}