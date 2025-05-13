import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, about,} = user;
  return (
   <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default UserCard