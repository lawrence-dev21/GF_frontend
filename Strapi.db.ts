** Province {
    id: text
    name: text
    district: District
}

** District {
    id: text
    name: text
    province: text
    schools: School[]
}

** Deb {
    id: text
    district: Disctrict
    officer: User[]
}


** Teacher {
    id: text
    school: School
    grades: Grade[]
    cse: CSE[]
    role: text
    user: User
}

** Student {
    id: text
    school: School
    user: User
    parent: Parent
    payments: Payment[]
    cse: CSE[]
}
** Student {
    id: text
    address: text
    students: Student
    user: User
}

** Grade {
    id: text
    students: Student[]
    name: text
}

** CSE {
    id: text
    school: School
    students: Students[]
    attendence: Attendance[]
    totalRegistered: number
    teachers: Teachers[]
    topics: CSETopics[]
    grade: Grade[]
}


** Attendence {
    id: text
    students: Student[]
    totalRegistered: number
    school: School
    teachers: Teacher
    topic: CSETopic
}

** CSETopics {
    id: text
    name: text
    schools: School[]
    modules: Module[]
}

** Module {
    id: text
    title: text
    upload: text
    grade: Grade[]
    description: text
    data: text
}