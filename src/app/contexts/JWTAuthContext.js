import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axiosInstance from "axios";
import { MatxLoading } from 'app/components'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }
    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    console.log(decodedToken.exp > currentTime ? 'Valid Token': 'Invalid Token')
    return decodedToken.exp > currentTime
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload
            console.log('Authenticating user');
            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})
const sanitizeUser = (user) => {
    const newUser = {
        ...user,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role.name
    }
    return newUser
}
const setSession = async (accessToken) => {
    if (accessToken) {
        console.log('setting the session')
        localStorage.setItem('accessToken', accessToken)
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axiosInstance.defaults.headers.common.Authorization
    }
  }
  
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (identifier, password) => {
        // fetch the jwt

        console.log('Logging in')
        const response = await axiosInstance.post(`${process.env.REACT_APP_BACKEND}api/auth/local`, {
            identifier,
            password,
        })
        const { jwt: accessToken } = response.data
        // console.log('access token of type:', typeof(accessToken))
        await setSession(accessToken)
        // // the fetch the user
        // const userResponse = await axiosInstance.get(`${process.env.REACT_APP_BACKEND}api/users/me?populate=*`, {
        //     headers: { }
        // })

        const uResponse = await fetch(`${process.env.REACT_APP_BACKEND}api/users/me`, 
                { headers: { Authorization: `Bearer ${accessToken}`}})
        let user = await uResponse.json() 
        user = sanitizeUser(user)
        // const user = await userResponse.data 
        console.log(user)
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axiosInstance.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        await setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = async () => {
        await setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
                if (accessToken && isValidToken(accessToken)) {
                    await setSession(accessToken)
                    const uResponse = await fetch(`${process.env.REACT_APP_BACKEND}api/users/me`, 
                    { headers: { Authorization: `Bearer ${accessToken}`}})
                    let user = await uResponse.json()
                    user = sanitizeUser(user)
                    console.log('Getting User', user)
                    
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
