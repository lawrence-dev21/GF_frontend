import qs from 'qs'
import { authRoles } from 'app/auth/authRoles';


export const authRouteParams = {
    // getCSE: (user, cseId) => {
    //         const query = qs.stringify({
    //             // populate: ['user', 'grade'] , 
    //             filters: {
    //             $and: [
    //               {
    //                   $or: grades.map(grade => {
    //                       return { grade:{id: {$eq: grade}} }
    //                           })
    //               },
    //               {
    //                 user_permissions: {

    //                 }
    //               },
    //               {   
    //                   $or: [
    //                   {cse: {id: {$null: true}}},
    //                   {cse: {id: {$not: id}}}
    //                   ]
    //               },
    //             ]
    //             },
    //           }, {
    //             encodeValuesOnly: true, // prettify URL
    //           });
    //     },

    getRolesSelect: (user) => {
        let authFilters = []
        if(!authRoles.district.includes(user.role))
            authFilters = authRoles.district.map(authRole => {return { name: { $not: authRole} }})
        else if(!authRoles.hq.includes(user.role))
            authFilters = authRoles.hq.map(authRole => {return { name: { $not: authRole} }})
        else if(!authRoles.sa.includes(user.role))
            authFilters =  authRoles.sa.map(authRole => {return { name: { $not: authRole} }})
        const params = qs.stringify({
            filters: {
                $and: [
                        ...authFilters,
                        {
                            name: { $not: 'Student'}
                        },{
                            name: { $not: 'Authenticated'}
                        },{
                            name: { $not: 'Public'}
                        }
                    ]
                }
            })
            return params
    }  
} 