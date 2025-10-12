let taskList = {
    'to_do' : [

    ],
    'in_progress' : [
        {
            'type' : 'User Story',
            'name' : 'Join mit den besten zusammenstellen',
            'description' : 'Building all Pages with HTML and CSS and then we add functionality for the website!',
            'subtasks' : [
                {'name' : 'Page Overlays', 'status' : false},
                {'name' : 'functions', 'status' : false},
                {'name' : 'responsive', 'status' : false},
                {'name' : 'databank', 'status' : false},
                {'name' : 'final control', 'status' : false}
            ],
            'participants' : [
                {'name' : ['Furkan', 'Yigit']},
                {'name' : ['Can', 'Marco']},
                {'name' : ['Test', 'Person']},
                {'name' : ['David', 'Groß']},
                {'name' : ['Kim', 'B']}
            ],
            'priority' : 'urgent',
            'date' : '11/10/2025'
        },
        {
            'type' : 'User Story',
            'name' : 'Test',
            'description' : 'Building all Pages with HTML and CSS and then we add functionality for the website!',
            'subtasks' : [
                {'name' : 'Page Overlays', 'status' : true},
                {'name' : 'functions', 'status' : false},
                {'name' : 'responsive', 'status' : true},
                {'name' : 'databank', 'status' : false},
                {'name' : 'final control', 'status' : true}
            ],
            'participants' : [
                {'name' : ['Furkan', 'Yigit']},
                {'name' : ['Can', 'Marco']},
                {'name' : ['Sven', 'Degen']},
                {'name' : ['David', 'Groß']},
                {'name' : ['Kim', 'B']}
            ],
            'priority' : 'medium',
            'date' : '11/10/2025'
        }
    ],

    'await_feedback' : [
        {
            'type' : null,
            'name' : 'JavaScript Templates',
            'description' : null,
            'subtasks' : null,
            'participants' : null,
            'priority' : null,
            'date' : '11/10/2025'
        }
    ],
    
    'done' : [
        {
            'type' : 'Technical Task',
            'name' : 'Join Test',
            'description' : null,
            'subtasks' : [
                {'name' : 'Page Overlays', 'status' : true},
                {'name' : 'functions', 'status' : true},
                {'name' : 'responsive', 'status' : true},
                {'name' : 'databank', 'status' : true},
                {'name' : 'final control', 'status' : true}
            ],
            'participants' : [
                {'name' : ['Furkan', 'Yigit']},
                {'name' : ['Can', 'Marco']},
                {'name' : ['Sven', 'Degen']},
                {'name' : ['David', 'Groß']},
                {'name' : ['Kim', 'B']}
            ],
            'priority' : 'low',
            'date' : '11/10/2025'
        }
    ]
}