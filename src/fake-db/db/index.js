import Mock from '../mock'
import shortId from 'shortid'
import jwt from 'jsonwebtoken';
import { userList } from './data';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';

// Create different files for all the routes

const DB = {
    userList,
}



Mock.onGet('/api/users').reply((config) => {
    const response = DB.userList
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
