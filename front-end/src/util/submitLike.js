import axios from "axios";

const submitLike = (event, course, index, user, courses) => {
    event.preventDefault();
    console.log(user.id, courses);
    let config = {
        method: 'post',
        url: `http://localhost:3001/api/courses/like/${user.id}/${course._id}`,
    };
      
    axios(config)
    .then(function (response) {
        // console.log(response.data);
        let newArr = [...courses];
        newArr[index] = response.data;
        return newArr;
    })
    .catch(function (error) {
        console.log(error);
    });
}

export default submitLike;