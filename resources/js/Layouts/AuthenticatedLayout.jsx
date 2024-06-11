import { HomeIcon, InboxIcon, GearIcon, DocIcon } from '@/Components/Icons'
import NavLink from '@/Components/NavLink'
import { router } from '@inertiajs/react'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User,
    Link,
    Image,
    ScrollShadow
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

const AuthenticatedLayout = ({ user, header, children }) => {
    const [team, setTeam] = useState([])

    useEffect(() => {
        axios.get('/team').then(response => {
            console.log(response.data)
            setTeam(response.data)
        })
    }, [])
    return (
        <>
            <div className="flex min-h-svh">
                <div className="fixed inset-y-0 left-0 hidden md:flex">
                    <div className="flex h-screen w-64 flex-col justify-between">
                        <div className="flex flex-col gap-y-8">
                            <nav className="flex flex-col">
                                <h1 className="p-6 text-xl font-bold dark:text-white">
                                    Whisper
                                </h1>
                                <div className="flex flex-col gap-y-2 border-t border-gray-300 px-4 pt-8 font-medium dark:border-gray-900">
                                    <NavLink
                                        href={route('dashboard')}
                                        active={route().current('dashboard')}
                                        className="flex items-center gap-2"
                                    >
                                        <HomeIcon />
                                        <span className="pt-1">Home</span>
                                    </NavLink>
                                    <NavLink className="flex items-center gap-2">
                                        <InboxIcon />
                                        <span>Inbox</span>
                                    </NavLink>
                                    <NavLink className="flex items-center gap-2">
                                        <DocIcon />
                                        <span>Reports</span>
                                    </NavLink>
                                </div>
                            </nav>
                            <div className="flex flex-col px-4">
                                <h2 className="mb-8 text-lg font-bold">
                                    Your so called "friends"
                                </h2>
                                <ScrollShadow className="flex max-h-96 flex-col gap-4 overflow-y-scroll">
                                    {team.map(member => (
                                        <div className="flex items-center gap-2">
                                            <Image
                                                alt={member.name}
                                                className="w-full object-cover"
                                                height={48}
                                                src={`https://ui-avatars.com/api/?size=256&name=${member.name}`}
                                                width={48}
                                                radius="full"
                                            />
                                            <div className="flex flex-col">
                                                <span className="text-medium flex font-medium">
                                                    {member.name}
                                                </span>
                                                <span className="text-default-500 text-sm">
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollShadow>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-8">
                            <Dropdown
                                placement="bottom-start"
                                className="dark:bg-gray-900 dark:text-white"
                            >
                                <DropdownTrigger>
                                    <User
                                        as="button"
                                        avatarProps={{
                                            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
                                        }}
                                        className="text-2xl transition-transform dark:text-white"
                                        description={
                                            <span className="text-sm">
                                                {user.email}
                                            </span>
                                        }
                                        name={
                                            <Link
                                                size="md"
                                                className="text-black dark:text-white"
                                            >
                                                {user.name}
                                            </Link>
                                        }
                                    />
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="User Actions"
                                    variant="flat"
                                >
                                    <DropdownItem
                                        key="profile"
                                        className="h-14 gap-2"
                                    >
                                        <p className="font-bold">
                                            Signed in as
                                        </p>
                                        <p className="font-bold">
                                            {user.email}
                                        </p>
                                    </DropdownItem>
                                    <DropdownItem key="configurations">
                                        Settings
                                    </DropdownItem>
                                    <DropdownItem key="help_and_feedback">
                                        Help & Feedback
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        color="danger"
                                        onPress={() => {
                                            router.post('/logout')
                                        }}
                                    >
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <main className="my-3 ml-0 mr-3 flex w-full flex-1 rounded-xl border border-gray-200 bg-white shadow-sm md:ml-64 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                    {children}
                </main>
            </div>
        </>
    )
}

export default AuthenticatedLayout
