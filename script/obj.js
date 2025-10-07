let task = {
    'to_do' :[

    ],
    'in_progress' : [
        {
            'type' : userStory,
            'name' : 'Join mit den besten zusammenstellen',
            'description' : 'Building all Pages with HTML and CSS and then we add functionality for the website!',
            'subtasks' : [
                {'name' : 'Page Overlays', 'status' : true},
                {'name' : 'functions', 'status' : true},
                {'name' : 'responsive', 'status' : true},
                {'name' : 'databank', 'status' : true},
                {'name' : 'final control', 'status' : true}
            ],
            'participants' : [
                {'name' : 'Furkan'},
                {'name' : 'Can'},
                {'name' : 'Sven'},
                {'name' : 'David'},
                {'name' : 'Kim'}
            ],
            'priority' : urgent
        }
    ],

    'await_feedback' : [
        {
            'type' : userStory,
            'name' : 'JavaScript Templates',
            'description' : 'Adding all JS Templates',
            'subtasks' : [null],
            'participants' : [
                {'name' : 'Furkan'},
            ],
            'priority' : low
        }
    ],
    
    'done' : [

    ]
}