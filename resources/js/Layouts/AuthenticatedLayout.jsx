import ConversationPanel from '@/Components/ConversationPanel'
import ConvoBubble from '@/Components/ConvoBubble'
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
    ScrollShadow,
    Button,
    Textarea
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

const AuthenticatedLayout = ({ user, header, children }) => {
    const [team, setTeam] = useState([])
    const [isOpenConvo, setIsOpenConvo] = useState(true)
    const [selectedUser, setSelectedUser] = useState(null)

    // Emit an event to the conversation dialog to close it.
    const handleCloseConvo = () => {
        setIsOpenConvo(false)
    }

    // Load the user's conversation for the selected user.
    const handleSelectUser = id => {
        console.log(id)
    }

    useEffect(() => {
        axios.get('/team').then(response => {
            setTeam(response.data)
        })
    }, [])

    return (
        <>
            <div className="relative flex min-h-svh">
                <div className="fixed inset-y-0 left-0 hidden md:flex">
                    <div className="flex h-screen w-80 flex-col justify-between">
                        <div className="flex flex-col gap-y-8">
                            <nav className="flex flex-col">
                                <h1 className="p-6 text-xl font-bold dark:text-white">
                                    Silent Whisperer
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
                                <h2 className="mb-8 text-lg font-bold dark:text-white">
                                    Friends{' '}
                                    <span className="text-sm text-gray-500 dark:text-gray-600">
                                        (Who secretly hate you!)
                                    </span>
                                </h2>
                                <ScrollShadow
                                    size={150}
                                    className="flex max-h-96 flex-col gap-4 overflow-y-scroll py-2"
                                >
                                    {team.map(member => (
                                        <div
                                            className="flex cursor-pointer items-center gap-2 px-4 py-1"
                                            key={member.id}
                                            onClick={() =>
                                                handleSelectUser(member.id)
                                            }
                                        >
                                            <Avatar
                                                radius="full"
                                                isBordered
                                                color={
                                                    member.active === 1
                                                        ? 'success'
                                                        : 'default'
                                                }
                                                className={`shadow-lg ${member.active === 1 ? 'shadow-green-400' : null}`}
                                                src={`https://ui-avatars.com/api/?size=256&name=${member.name}`}
                                            />
                                            <div className="flex flex-col">
                                                <span className="flex cursor-pointer text-medium font-medium dark:text-white">
                                                    {member.name}
                                                </span>
                                                <span className="text-sm text-default-500">
                                                    {member.role}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollShadow>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-4 pb-4">
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

                {/* Chat box */}
                <ConversationPanel
                    user={user}
                    isOpenConvo={isOpenConvo}
                    onCloseConvo={handleCloseConvo}
                />

                <main className="my-3 ml-0 mr-3 flex w-full flex-1 rounded-xl border border-gray-200 bg-white shadow-sm md:ml-80 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                    {children}
                </main>
            </div>
        </>
    )
}

export default AuthenticatedLayout
