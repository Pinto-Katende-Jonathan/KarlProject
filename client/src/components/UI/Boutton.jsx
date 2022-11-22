import { Button } from '@mui/material'
import React from 'react'

export default function Boutton(props) {
  return (
    <Button variant="contained" color={props.color} className={props.className} onClick={props.onClick}>{props.title}</Button>
  )
}