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
}


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

Mock.onGet('/api/users').reply((config) => {
    const response = DB.userList.map(user => {
                    const school = DB.schoolList.filter(school =>  user.schoolId === school.id)[0]
      return {
        ...user,
        school: school.name
      }
    })
    return [200, response]
})


Mock.onPost('/api/users/add').reply((config) => {
    const data = JSON.parse(config.data)
    console.log('inside mock', config.data)
    const userRegExists = DB.userList.filter(user => user.nrc === data.nrc)
    const userEmailExists = DB.userList.filter(user => user.email === data.email)
    console.log('User Exists:', userRegExists)
    if((userRegExists.length > 0) || (userEmailExists.length > 0) ){
    	return [500, DB.userList]
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
    	
    	DB.userList.push(newUser)
    	return [200, DB.userList]
    }
})

Mock.onPost('/api/users/delete').reply((config) => {
    let { userId } = JSON.parse(config.data)
    let userList = DB.userList.filter((user) => user.id !== userId)
    DB.userList = userList
    return [200, userList]
})

Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, password } = JSON.parse(config.data);
    const user = DB.userList.find((u) => u.email === email);

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
      console.log('District', districtSC)
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
