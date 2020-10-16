# Auth endpoints

`register`
method: POST
Endpoint: /api/users/register

registers a user to the database & returns the user's details and an authentication token.

body: {
    name: 'string',
    username: 'string',
    password: 'string',
    role: 'string' *instructor or client (case sensitive)*
}

`post login`
method: POST
Endpoint: /api/users/login

Logs the user in and returns the user's id, role, and an authentication token.

body: {
    username: 'string',
    password: 'string',
}


# Class Endpoints

`post (instructor only)`
method: POST
Endpoint: /api/classes

Adds a class to the database & returns the class details with the class Id.

body: {
    class_name: 'string,
    type: 'string', - *strength, endurance, calisthenics, etc, etc*
    class_time: "00/00/000:hr:min:sec", - *month/day/yearr*
    duration_minutes: integer,
    intensity_level: integer,
    location: "string",
    attendees: integer,
    max_class_size: integer
}

*coming soon*
`put (instructor only) - edit course details` *still need to relate back to instructor_classes table*
`post (client) - enroll in classes` *we'll relate to the client_classes table*
`delete (instructor only)`
`get (user & instructor)`
