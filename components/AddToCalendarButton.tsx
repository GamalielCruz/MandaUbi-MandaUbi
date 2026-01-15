'use client'

import { useEffect } from 'react'
import 'add-to-calendar-button'

interface AddToCalendarButtonProps {
  name: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  location: string
  options: string
  timeZone: string
  trigger: string
  inline: boolean
  listStyle: string
  iCalFileName: string
  label: string
}

export default function AddToCalendarButton(props: AddToCalendarButtonProps) {
  useEffect(() => {
    // Asegurar que el componente se carga en el cliente
  }, [])

  return (
    <add-to-calendar-button
      name={props.name}
      description={props.description}
      startDate={props.startDate}
      endDate={props.endDate}
      startTime={props.startTime}
      endTime={props.endTime}
      location={props.location}
      options={props.options}
      timeZone={props.timeZone}
      trigger={props.trigger}
      inline={props.inline}
      listStyle={props.listStyle}
      iCalFileName={props.iCalFileName}
      label={props.label}
    />
  )
}
