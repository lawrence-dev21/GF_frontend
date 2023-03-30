export const authRoles = {
    sa: ['SA'], // Only SA has access
    hq: ['SA', 'Headquarters Administrator'], // Only SA has access
    district: ['SA', 'Headquarters Administrator', 'District Administrator'], // Only SA & Administrator has access
    school: ['SA', 'Headquarters Administrator', 'District Administrator', 'School Administrator'], // Only SA & Administrator & Editor has access
    teacher: ['SA', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher'], // Only SA & Administrator & Editor has access
    parent: ['SA', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher', 'Parent'], // Only SA & Administrator & Editor has access
    student: ['SA', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher', 'Student'], // Only SA & Administrator & Editor has access
    guest: ['SA', 'Headquarters Administrator', 'District Administrator', 'School Administrator', 'Teacher', 'Parent','Student', 'Guest'] // Only SA & Administrator & Editor has access
}