import Mock from '../mock'
import shortId from 'shortid'
import jwt from 'jsonwebtoken';

import { 
    userList,
    schoolList,
    provinceList,
    districtList,
    categoryList,
    moduleList,
    uploadList,
    beneficiaryList,
    parentList,
    paymentList,
    clubList,
    clubTopicList,
    clubAttendenceList,
} from './data';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';

// Create different files for all the routes

const DB = {
    userList,
    schoolList,
    districtList,
    provinceList, 
    categoryList,
    moduleList,
    uploadList,
    beneficiaryList,
    parentList,
    paymentList,
    clubList,
    clubTopicList,
    clubAttendenceList,
}

// firebase.collection('users').add

const parseQueryString = (url) => {
  const queryString = url.replace(/.*\?/, '');
  if (queryString === url || !queryString) {
    return null;
  }

  const urlParams = new URLSearchParams(queryString);
  const result = {};

  urlParams.forEach((val, key) => {
    if (result.hasOwnProperty(key)) {
      result[key] = [result[key], val];
    } else {
      result[key] = val;
    }
  });

  return result;
}


// Users 
const getUserAccounts = () => {
  return DB.userList.filter(user => user?.email && user?.password && user.nrc)
}

Mock.onGet('/api/student-count').reply(config => {
  const studentCount = DB.beneficiaryList.length
  return [200, studentCount]
})
Mock.onGet('/api/student-gender-count').reply(config => {
  const studentGenderCount = getBeneficiaries.reduce((acc, cum) => {
    cum.gender === 'Male' ? acc.male++ : acc.female++
    return acc
  }, {male:0,female:0})
  return [200, studentGenderCount]
})

Mock.onGet('/api/users').reply(async (config) => {
    const users = getUserAccounts()
    const response = users.map(user => {
                    const school = DB.schoolList.filter(school =>  user.schoolId === school.id)[0]
      return {
        ...user,
        school: school.name
      }
    })
    // response = await getCollection('users')
   // const ref  =  collection(firestore, 'users').get()
    // console.log('user refs', ref)
    return [200, response]
})


Mock.onPost('/api/users/add').reply((config) => {
    const data = JSON.parse(config.data)
    const users = getUserAccounts()

    const userRegExists = users.filter(user => user.nrc === data.nrc)
    const userEmailExists = users.filter(user => user.email === data.email)
    if((userRegExists.length > 0) || (userEmailExists.length > 0) ){
    	return [500, users]
    } else {
        const creationDate = new Date()
        let dateOfBirth = new Date()
        if(data.dateOfBirth)
            dateOfBirth = new Date(data.dateOfBirth)

    	const newUser = {
            ...data,
            id: shortId.generate(),
            name: data.firstName + ' ' + data.lastName,
            creationDate: creationDate.toISOString(),
            dateOfBirth: dateOfBirth.toISOString()
        }
     //    const ref  =  collection(firestore, 'users')
    	// addDoc(ref, newUser)

        console.log()
    	DB.userList.push(newUser)

    	return [200, getUserAccounts()]
    }
})

Mock.onPost('/api/users/delete').reply((config) => {
    let { userId } = JSON.parse(config.data)
    let userList = DB.userList.filter((user) => user.id !== userId)
    DB.userList = userList
    const response = getUserAccounts()
    return [200, response]
})

Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const users = getUserAccounts()

    const { email, password } = JSON.parse(config.data);
    const user = users.find((u) => u.email === email);

    if (!user) {
      return [400, { message: 'User not registered' }];
    } 

    if (password !== user.password) {
      return [400, { message: 'Invalid email or password' }];
    } 

    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_VALIDITY,
    });

    return [
      200,
      {
        accessToken,
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role,
          schoolId: user?.schoolId || ''
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

// Mock.onPost('/api/auth/register').reply((config) => {
//   try {
//     const { email, username } = JSON.parse(config.data);
//     const user = DB.userList.find((u) => u.email === email);

//     if (user) {
//       return [400, { message: 'User already exists!' }];
//     }
//     const newUser = {
//       id: 2,
//       role: 'GUEST',
//       name: '',
//       username: username,
//       email: email,
//       avatar: '/assets/images/face-6.jpg',
//       age: 25,
//     };
//     DB.userList.push(newUser);

//     const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
//       expiresIn: JWT_VALIDITY,
//     });

//     return [
//       200,
//       {
//         accessToken,
//         user: {
//           id: newUser.id,
//           avatar: newUser.avatar,
//           email: newUser.email,
//           name: newUser.name,
//           username: newUser.username,
//           role: newUser.role,
//         },
//       },
//     ];
//   } catch (err) {
//     console.error(err);
//     return [500, { message: 'Internal server error' }];
//   }
// });


// Auth

Mock.onGet('/api/auth/profile').reply((config) => {
  try {
    const { Authorization } = config.headers;
    if (!Authorization) {
      return [401, { message: 'Invalid Authorization token' }];
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, JWT_SECRET);
    const user = DB.userList.find((u) => u.id === userId);

    if (!user) {
      return [401, { message: 'Invalid authorization token' }];
    }

    return [
      200,
      {
        user: {
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          role: user.role,
          schoolId: user?.schoolId || ''
        },
      },
    ];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});


// Schools
const getSchools = () => {
  return DB.schoolList.map(school => {
      const districtSC =  DB.districtList.filter(district => school.districtId === district.id)[0]
      const provinceSC =  DB.provinceList.filter(province => districtSC.provinceId === province.id)[0]
      return {
        ...school,
        district: districtSC.name,
        province: provinceSC.name,
      }
    })
}


Mock.onGet('/api/schools').reply((config) => {
    console.log('fetching schools', DB.schoolList)
    const response = getSchools()
    return [200, response]
})


Mock.onPost('/api/school/add').reply((config) => {
    const data = JSON.parse(config.data)
    const schoolEMISExists = DB.schoolList.filter(school => school.emisId === data.emisId)
    if(schoolEMISExists.length > 0){
      return [500, DB.schoolList]
    } else {
      const newSchool = {
            ...data,
            id: shortId.generate(),
        }
      DB.schoolList.push(newSchool)
      const response = getSchools()
      return [200, response]
    }
})


// Provinces 

Mock.onGet('/api/provinces').reply((config) => {
  const response = DB.provinceList
  return [200, response];
})

// Districts 

Mock.onGet(/api\/districts\/?.*/).reply((config) => {
  const params = parseQueryString(config.url);
  let response = DB.districtList
  if(!params){
    return [200, response]
  }
  const { provinceId } = params
  response = response.filter(district => district.provinceId === provinceId)
  return [200, response];
})



// Categories 

Mock.onGet('/api/categories').reply((config) => {
    const response = DB.categoryList
    return [200, response]
})

// Modules 

const getModules = () => {
  return DB.moduleList.map(mod => {
    const category = DB.categoryList.filter(category => category.id === mod.categoryId)[0]
    return {
      ...mod,
      category: category.name
    }

  })
}

Mock.onGet('/api/modules').reply((config) => {
    const response = getModules()
    return [200, response]
})


const createFile = (data, moduleId) => {
  const id = shortId.generate()
  const newFile = {
    id,
    moduleId,
    data
  }
  DB.uploadList.push(newFile)
  return newFile
}

Mock.onPost('/api/modules/add').reply((config) => {
    const { title, description, file, categoryId } = JSON.parse(config.data)
    const id = shortId.generate()
    const {id: uploadId} = createFile(file, id)
    const newModule = {
          id,
          title,
          description,
          uploadId,
          categoryId
      }

    DB.moduleList.push(newModule)
    const response = getModules()
    return [200, response]
})


Mock.onGet(/api\/upload\/?.*/).reply((config) => {
  const params = parseQueryString(config.url);
  if(!params){
    return [500, {message: 'No id sent'}]
  }
  const { id: uploadId } = params
  const response = DB.uploadList.filter(upload => upload.id === uploadId)[0]
  return [200, response];
})


// Beneficiaries

const createUser = (user) => {
  const id = shortId.generate();
  const newUser = {
    email: 'NULL',
    nrc: 'NULL',
    password: shortId.generate(),
    creationDate: (new Date()).toISOString(),
    id,
    ...user,
  }
  DB.userList.push(newUser)
  return newUser
}

const createParent = (parent, beneficiaries, address) => {
  const id = shortId.generate(); 
  const newParent = {
    id,
    userId: parent.id,
    beneficiaries,
    address
  }
  DB.parentList.push(newParent)
  return newParent
}

const getParent = (parentId) => {
    const parent = DB.parentList.find(parentRow => parentId === parentRow.id)
    const parentAccount = DB.userList.find(user => user.id === parent.userId)

    return { 
              parentFirstName: parentAccount.firstName,
              parentLastName: parentAccount.lastName,
              parentNRC: parentAccount.nrc,
              parentMobile: parentAccount.mobile,
              parentAddress: parent.address,
            }
}  
const getStudent = (userId) => {
    const student = DB.userList.filter(user => userId === user.id)[0]
    return { 
              firstName: student.firstName,
              lastName: student.lastName,
              gender: student.gender,
              dateOfBirth: student.dateOfBirth
            }
}  
const getBeneficiaries = () => {
  return DB.beneficiaryList.map(student => {
    const parent = getParent(student.parentId)
    const grade = DB.categoryList.filter(grade => grade.id === student.gradeId)[0]
    const school = DB.schoolList.filter(school => school.id === student.schoolId)[0]
    const user = getStudent(student.userId)

    const beneficiary = {
      ...student,
      ...user,
      ...parent,
      grade: grade.name,
      school: school.name
    }
    return beneficiary
  })
}

const getBeneficiary = (beneficiaryId) => {
  const beneficiaries = getBeneficiaries()
  return beneficiaries.filter(beneficiary => beneficiaryId === beneficiary.id)[0]
}


Mock.onPost('/api/cse/add').reply((config) => {
    const data = JSON.parse(config.data)
    console.log('CSE Data', data)
    const id = shortId.generate()
    const {
      students: attendence,
      totalRegistered,
      schoolId,
      teacherId,
      date: creationDate,
      topicId
    } = data
    const attendenceRegister =  {
      id, attendence, totalRegistered, schoolId, teacherId, creationDate, topicId 
    }

    const cseIndex = DB.clubList.findIndex(x => x.schoolId.startsWith(schoolId))
    DB.clubList[cseIndex].attendence.push(id)
    DB.clubAttendenceList.push(attendenceRegister)
    return [200, attendenceRegister]
    
})


Mock.onPost('/api/beneficiaries/add').reply((config) => {
    const data = JSON.parse(config.data)

    // Create the student
    const { firstName, lastName, gender } = data
    let dateOfBirth = new Date()
    if(data?.dateOfBirth)
            dateOfBirth = new Date(data.dateOfBirth)

    const student = createUser({
      firstName,
      lastName,
      gender,
      dateOfBirth
    })

    console.log('Student')

    const { parentFirstName, parentLastName, parentAddress: address, parentId, parentUserId, parentNRC: nrc, parentMobile: mobile } = data

    // Create the user
    let user = {}
    if(parentUserId){
        const parentUserIndex = DB.userList.findIndex(x =>  x.id === parentUserId)
        DB.userList[parentUserIndex] = { ...DB.userList[parentUserIndex], mobile }
        user = DB.userList[parentUserIndex]
    } else {
      createUser({firstName: parentFirstName,
                  lastName: parentLastName,
                  nrc,
                  mobile,
                })
    }
    console.log('User')


    // create the parent

    let parent = {}
    if(parentId){
      const parentIndex = DB.parentList.findIndex(parent => parent.id === parentId)
      DB.parentList[parentIndex] = {
                  ...DB.parentList[parentIndex],
                  address,
                  beneficiaries: [
                    ...DB.parentList[parentIndex].beneficiaries,
                    student.id
                  ],
                }
      parent = DB.parentList[parentIndex]
    } else {
      parent = createParent(user, [student.id], address)
    }
    console.log('Parent', parent)

    // create the beneficiary

    const { schoolId, categoryId: gradeId } = data
    const id = shortId.generate()

    const newBeneficiary = {
      id,
      schoolId,
      gradeId,
      userId: student.id,
      parentId: parent.id,
    }
        console.log('Beneficiary', newBeneficiary)

    DB.beneficiaryList.push(newBeneficiary)
    const response = getBeneficiaries()
    return [200, response]
})

Mock.onGet(/api\/beneficiaries\/?.*/).reply((config) => {
  const params = parseQueryString(config.url);
  let response = getBeneficiaries()
  console.log('Beneficiaries', response)
  if(!params){
    return [200, response]
  }
  response = getBeneficiary(params.id)
  return [200, response];
})

const getCSEStudents = (cse) => {
  const beneficiaries = getBeneficiaries()
  console.log('students', cse.students)
  return cse?.students.map(studentId => {
    return beneficiaries.find(x => x.id.startsWith(studentId))
  })
}

const getCSETeachers = (cse) => {
  const users = getUserAccounts()
  return cse?.teachers.map(teacherId => {
    return users.find(x => x.teacherId === teacherId)
  })
}

const getCSETopics = (cse) => {
  const topics = cse?.topics.map(topicId => {
    return DB.clubTopicList.find(x => x.id.startsWith(topicId))
  })
  return topics
}

const getCSE = (cse) => {
  const cseStudents = getCSEStudents(cse)
  const cseTeachers = getCSETeachers(cse)
  const cseTopics = getCSETopics(cse)
  return {
    ...cse,
    students: cseStudents,
    teachers: cseTeachers,
    topics: cseTopics,
  }
}

Mock.onGet(/api\/cse-all\/?.*/).reply((config) => {
  const params = parseQueryString(config.url);
  let schools = getSchools()
  if(!params){
    return [200, DB.clubList]
  }
  const school = schools.find(x => x.id === params.id)
  const cse = DB.clubList.find(x => x.schoolId === school.id)
  const response = getCSE(cse)
  return [200, response];
})


Mock.onGet(/api\/cse-students\/?.*/).reply((config) => {
  const params = parseQueryString(config.url);
  if(!params){
    return [400, {todo: 'bad request'}]
  }
  const cse = DB.clubList.find(x => x.schoolId === params.id)
  let response = getCSEStudents(cse)
  console.log('CSE ClubList:', DB.clubList)
  if(params.cse === 'false'){
    const beneficiaries = getBeneficiaries()
    response = beneficiaries.filter(x => {
      return x.schoolId.startsWith(params.id)})
    response = response.filter(x => x.cse !== 'true')
  }
  console.log(response)
  return [200, response]
})

Mock.onGet(/api\/cse-attendence\/?.*/).reply((config) => {
  const params = parseQueryString(config.url);
  let schools = getSchools()
  if(!params){
    return [200, DB.clubList]
  }
  const school = schools.find(x => x.id === params.id)
  const cse = DB.clubList.find(x => x.schoolId === school.id)
  console.log('DB.clubList')
  console.log(DB.clubList)
  console.log(DB.clubTopicList)
  const response = cse.attendence.map(attendendceId => {
                            const attendence = DB.clubAttendenceList.find(x => x.id.startsWith(attendendceId))
                            const topic = DB.clubTopicList.find(x => x.id.startsWith(attendence.topicId))
                            return {...attendence, 
                              attendenceCount: `${attendence.attendence.length}/${attendence.totalRegistered}`,
                              topic: topic.name
                            }
                            })
  return [200, response];
})
