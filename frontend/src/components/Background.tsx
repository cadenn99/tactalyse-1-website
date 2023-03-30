import Image from 'next/image'
import React from 'react'

export default function Background() {
  return (
      <Image
      src="/Background.png"
      layout="fill"
      className="-z-10 !hidden opacity-60 sm:!inline blur-sm"
      objectFit="cover"
      alt="The Tactalyse logo"
    />
  )
}