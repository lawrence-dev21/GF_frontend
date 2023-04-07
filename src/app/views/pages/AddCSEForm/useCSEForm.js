import { useState, useEffect } from "react";
import axiosInstance from "axios";
import useAuth from "app/hooks/useAuth";
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack";

export const useCSEForm = () => {
  const [state, setState] = useState({});
  const [topics, setTopics] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (topics.length === 0) {
      fetch(`${process.env.REACT_APP_BACKEND}api/cse-topics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setTopics(data.data);
        })
        .catch((error) => console.error(error));
    }

    if (grades.length === 0) {
      axiosInstance
        .get(`${process.env.REACT_APP_BACKEND}api/grades`)
        .then(({ data }) => {
          setGrades(data.data);
        })
        .catch((error) => console.error(error));
    }
  }, [topics.length, grades.length]);

  const handleSubmit = (event) => {
    setLoading(true)
    event.preventDefault();
    const payload = {
      data: {
        
        name: 'CSE: ' + state.name,
        school: user.school.id,
        cse_topics: state.topics,
        description: state.description,
        startDate: new Date().toISOString(),
        grades: state.grades,
      },
    };

    axiosInstance
      .post(`${process.env.REACT_APP_BACKEND}api/cses`, payload)
      .then(() => {
        console.log("Form submitted successfully");
        enqueueSnackbar("Form submitted successfully", {variant: 'success'})
        navigate('/cse')
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      })
      .finally(() => setLoading(false))
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return { loading, state, topics, grades, handleChange, handleSubmit };
};
