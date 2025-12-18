import React from 'react'
import { connect } from 'react-redux'
import Dropdown from 'react-dropdown'

import { selectFont } from '../../store/actions'
//import './css/styles.scss'
import '../../css/components/Dropdown/styles.scss'
 import 'react-dropdown/style.css'

const options = [ 'Rookie', 'Baseball', 'Ballpark', 'Source Sans Pro', 'Courgette', 'Cutive', 'Graduate', 'Lobster Two', 'Merienda One', 'Montserrat', 'Open Sans', 'Oswald', 'Pinyon Script', 'Satisfy' ];

const Fonts = ({ fixFont, font, selectFont }) => {
  function onSelect(option) {
    selectFont(option.value)
    fixFont()
  }

  return (
    <Dropdown
      options={options}
      onChange={onSelect}
      value={font}
      placeholder="Select an option"
    />
  )
}

const mapStateToProps = (state) => ({
  font: state.designs.font
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  selectFont: (val) => dispatch( selectFont(val) )
})


export default connect(mapStateToProps, mapDispatchToProps)(Fonts)