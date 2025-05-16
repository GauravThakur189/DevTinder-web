import React from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = React.useState(user.firstName);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [age, setAge] = React.useState(user.age || "");
  const [photoUrl, setPhotoUrl] = React.useState(user.photoUrl || "");
  const [gender, setGender] = React.useState(user.gender || "");
  const [about, setAbout] = React.useState(user.about || "");
  const saaveProfile = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:3000/edit/profile",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      console.log("response", response);
      dispatch(addUser(response?.data?.data));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex  justify-center my-10">
      <div className="flex flex-col items-center justify-center mx-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title text-shadow-black">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                value={firstName}
                className="input"
                placeholder="Type here"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Second Name</legend>
              <input
                type="text"
                value={lastName}
                className="input"
                placeholder="Type here"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">PhotoUrl</legend>
              <input
                type="text"
                value={photoUrl}
                className="input"
                placeholder="Type here"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                value={age}
                className="input"
                placeholder="Type here"
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              {/* <input 
              type="text" 
               value={gender}
              className="input" 
              placeholder="Type here"
             onChange={(e) => setGender(e.target.value)}
            /> */}
              <select
                className="select select-bordered w-full max-w-xs"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {/* <option disabled selected>Pick your favorite</option> */}
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                value={about}
                className="input"
                placeholder="Type here"
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            <div className="card-actions justify-end">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saaveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
