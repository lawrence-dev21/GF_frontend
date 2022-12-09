import Mock from '../mock'
import shortId from 'shortid'
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '7 days';


const UsersDB = {
    usersList: [
        {
            firstName: 'Lawrence',
            lastName: 'Kasonde',
            name: 'Lawrence Kasonde',
            email: 'lawrence.kasonde@moe.gov.zm',
            nrc: '123456/12/1',
            gender: 'Male',
            role: 'SA',
            position: 'Full-Stack Developer',
            mobile: '',
            dataOfBirth: '1990-12-01',
            creationDate: '2022-09-01',
            avatar: '',
            id: '323sa680b32497dsfdsgga21rt47',
            password: 'Lusaka@123',
        },
    ],
}

//                       ['Ngalande', 'Banda', 'nb@.com','112435/12/1','Developer', '1986-12-03', '2022-11-24'],
//                       ['Frank', 'Chaiwa', 'fc@.com','112435/12/1','Software Engineer', '1994-01-01', '2022-11-24'],
//                       ['Michael', 'chuck', 'mck@.com','112435/12/1','Accounts', '1991-11-10', '2022-11-24'],
//                       ['Given', 'mwaba', 'gm@.com','112435/12/1','Procurement', '1994-11-7', '2022-11-24'],
//                       ['David', 'Mbao', 'dm@.com','112435/12/1','Finance', '1977-10-08', '2022-11-24'],
//                       ['Chewe', 'Chileshe', 'cc@.com','112435/12/1','ICT cyberscurity', '1989-02-03', '2022-11-24'],             


Mock.onGet('/api/users').reply((config) => {
    const response = UsersDB.usersList
    return [200, response]
})


Mock.onPost('/api/users/add').reply((config) => {
    const data = JSON.parse(config.data)
    console.log('inside mock', config.data)
    const userRegExists = UsersDB.usersList.filter(user => user.nrc === data.nrc)
    const userEmailExists = UsersDB.usersList.filter(user => user.email === data.email)
    console.log('User Exists:', userRegExists)
    if((userRegExists.length > 0) || (userEmailExists.length > 0) ){
    	return [500, UsersDB.usersList]
    } else {
        const creationDate = new Date()
        let dateOfBirth = new Date()
        if(data.dateOfBirth)
            dateOfBirth = new Date(data.dateOfBirth)

    	const newUser = {
            ...data,
            id: shortId.generate(),
            name: (data.firstName, data.lastName),
            creationDate: creationDate.toISOString(),
            dateOfBirth: dateOfBirth.toISOString()
        }
    	
    	UsersDB.usersList.push(newUser)
    	return [200, UsersDB.usersList]
    }
})

Mock.onPost('/api/users/delete').reply((config) => {
    let { userId } = JSON.parse(config.data)
    let usersList = UsersDB.usersList.filter((user) => user.id !== userId)
    UsersDB.usersList = usersList
    return [200, usersList]
})

Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { email, password } = JSON.parse(config.data);
    const user = UsersDB.usersList.find((u) => u.email === email);

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
//     const user = UsersDB.usersList.find((u) => u.email === email);

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
//     UsersDB.usersList.push(newUser);

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
    const user = UsersDB.usersList.find((u) => u.id === userId);

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
