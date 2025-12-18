import React from 'react'

const Loader = ({ msg }) => {
  return (
    <div className="cjd-loader">
      <div className="lds-roller"> <div/> <div/> <div/> <div/> <div/> <div/> <div/> <div/> </div>
      <div className="cjd-loading-msg">{msg}</div>
    </div>
  )
}

export default Loader