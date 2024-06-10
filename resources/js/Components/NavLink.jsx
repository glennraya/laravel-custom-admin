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
                ' inline-flex items-center px-4 py-3 text-sm transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? ' rounded-[.8rem] bg-black font-medium text-white dark:from-gray-800 dark:text-white '
                    : ' rounded-[.8rem] px-4 py-2 text-gray-500 hover:bg-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700 dark:hover:bg-gray-900 dark:hover:text-white ') +
                className
            }
        >
            {children}
        </Link>
    )
}
