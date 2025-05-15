import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className='p-6 border-b flex justify-between items-center bg-blue-500 rounded-bl-lg ronunded-br-lg'>
        <Link className='text-2xl font-bold text-white' href={'/'}>Tech Interpretations</Link>
        <Link className='bg-slate-100 grid place-items-center px-4 py-2 rounded-full font-bold shadow-md' href={'/create'}>Add New</Link>
    </header>
  )
}
