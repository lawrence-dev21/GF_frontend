import { useState, useEffect } from "react";
import axiosInstance from "axios";
import useAuth from "app/hooks/useAuth";

export const useCSEForm = () => {
  const [state, setState] = useState({});
  const [topics, setTopics] = useState([]);
  const [grades, setGrades] = useState([]);
  const { user } = useAuth();

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
      .then((response) => {
        console.log("Form submitted successfully");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  return { state, topics, grades, handleChange, handleSubmit };
};
