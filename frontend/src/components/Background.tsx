import Image from 'next/image'
import React from 'react'

/**
 * This function build the background component.
 * @returns The background seen on the site.
 */
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