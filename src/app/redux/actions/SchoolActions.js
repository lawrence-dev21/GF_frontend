import axiosInstance from "axios";

export const GET_SCHOOLS = "GET_SCHOOLS";
export const ADD_SCHOOL = "ADD_SCHOOL";
export const DELETE_SCHOOL = "DELETE_SCHOOL";
export const UPDATE_SCHOOL = "UPDATE_SCHOOL";

export const getSchools = () => (dispatch) => {
  const param = encodeURI('populate[district][populate][0]=province')
  axiosInstance
    .get(`http://localhost:1337/api/schools?${param}`)
    .then((res) => res.data)
    .then(({ data }) => {
      dispatch({
        type: GET_SCHOOLS,
        payload: data,
      });
    })
    .catch((err) => console.log);
};

export const addSchool = (school) => async (dispatch) => {
  const payload = { data: school };
  const res = await axiosInstance.post(
    "http://localhost:1337/api/schools",
    payload
  );
  const { error } = await res.data;
  if (!error) {
    dispatch({
      type: ADD_SCHOOL,
      payload: res.data,
    });
    return true;
  } else {
    return error;
  }
};
