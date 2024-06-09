import { Link } from '@inertiajs/react'

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center font-medium transition duration-150 ease-in-out focus:outline-none' +
                (active
                    ? ' rounded-[1rem] bg-white px-4 py-3 font-bold text-black shadow-sm '
                    : 'border-transparent px-4 py-2 text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700') +
                className
            }
        >
            {children}
        </Link>
    )
}
