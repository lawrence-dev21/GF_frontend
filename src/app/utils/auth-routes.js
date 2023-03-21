import qs from 'qs'

export const authRoutes = {
    teacher: {
        cse: (cseId) => {
            const query = qs.stringify({
                // populate: ['user', 'grade'] , 
                filters: {
                $and: [
                  {
                      $or: grades.map(grade => {
                          return { grade:{id: {$eq: grade}} }
                              })
                  },
                  {
                      $or: [
                      {cse: {id: {$null: true}}},
                      {cse: {id: {$not: id}}}
                      ]
                  },
                ]
                },
              }, {
                encodeValuesOnly: true, // prettify URL
              });
        }
    }
} 