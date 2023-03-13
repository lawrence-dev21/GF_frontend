Province {
    id: text
    name: text
    district: District
}

District {
    id: text
    name: text
    province: text
    schools: School[]
}

Teacher {
    id: text
    school: School
    grades: Grade[]
    cse: CSE[]
}

Student {
    id: text
    school: School
    user: User
    parent: Parent
    payments: Payment[]
    cse: CSE[]
}

Grade {
    id: text
    students: Student[]
    name: text
}

CSE {
    id: text
    school: School
    students: Students[]
    attendence: Attendance[]
    totalRegistered: number
    teachers: Teachers[]
    topics: CSETopics[]
    grade: Grade[]
}

CSETopics {
    id: text
    name: text
    schools: School[]
    modules: Module[]
}

Attendence {
    id: text
    students: Student[]
    totalRegistered: number
    school: School
    teachers: Teacher
    topic: CSETopic
}

Module {
    id: text
    title: text
    upload: text
    grade: Grade[]
    description: text
}