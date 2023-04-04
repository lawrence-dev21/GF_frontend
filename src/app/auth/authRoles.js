export const authRoles = {
    sa: ['Super Administrator'], // Only Super Administrator has access
    hq: ['Super Administrator', 'Headquarters Administrator'], // Only Super Administrator has access
    district: ['Super Administrator', 'Headquarters Administrator', 'District Administrator'], // Only Super Administrator & Administrator has access
    school: ['Super Administrator', 'Headquarters Administrator', 'District Administrator', 'School Administrator'], // Only Super Administrator & Administrator & Editor has access
    teacher: ['Super Administrator', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher'], // Only Super Administrator & Administrator & Editor has access
    parent: ['Super Administrator', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher', 'Parent'], // Only Super Administrator & Administrator & Editor has access
    student: ['Super Administrator', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher', 'Student'], // Only Super Administrator & Administrator & Editor has access
    guest: ['Super Administrator', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher', 'Parent','Student', 'Guest'] // Only Super Administrator & Administrator & Editor has access
}