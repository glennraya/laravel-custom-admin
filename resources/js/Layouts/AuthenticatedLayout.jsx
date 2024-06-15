import ConversationPanel from '@/Components/ConversationPanel'
import { HomeIcon, InboxIcon, DocIcon } from '@/Components/Icons'
import NavLink from '@/Components/NavLink'
import ProfileDropdown from '@/Components/ProfileDropdown'
import { Avatar, ScrollShadow } from '@nextui-org/react'
import { useEffect, useState } from 'react'

const AuthenticatedLayout = ({ user, children }) => {
    const [team, setTeam] = useState([])
    const [isOpenConvo, setIsOpenConvo] = useState(false)
    const [peer, setPeer] = useState(null)

    // Emit an event to the conversation dialog to close it.
    const handleCloseConvo = () => {
        setIsOpenConvo(false)
    }

    // Load the user's conversation for the selected user.
    const handleSelectUser = peer_id => {
        setIsOpenConvo(true)
        setPeer(peer_id)
    }

    useEffect(() => {
        axios.get('/team').then(response => {
            setTeam(response.data)
        })
    }, [])

    return (
        <>
            <div className="relative flex h-screen">
                <div className="fixed inset-y-0 left-0 hidden flex-grow md:flex">
                    <div className="flex w-80 flex-grow flex-col gap-y-8">
                        <div className="flex flex-grow flex-col gap-y-8">
                            <nav className="flex flex-col">
                                <h1 className="p-6 text-xl font-bold dark:text-white">
                                    Shouting Whisperer
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

                            <div className="flex h-full flex-grow flex-col overflow-y-scroll px-4">
                                <h2 className="mb-4 text-lg font-bold dark:text-white">
                                    Friends{' '}
                                    <span className="text-sm text-gray-500 dark:text-gray-600">
                                        (Who secretly hate you!)
                                    </span>
                                </h2>

                                <ScrollShadow
                                    size={50}
                                    className="flex h-[400px] flex-col gap-4 overflow-y-scroll scroll-smooth py-2"
                                >
                                    {team.map(member => (
                                        <div
                                            className="flex cursor-pointer items-center gap-2 px-4 py-1"
                                            key={member.id}
                                            onClick={() =>
                                                handleSelectUser(member)
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

                            <ProfileDropdown user={user} />
                        </div>
                    </div>
                </div>

                {/* Chat box */}
                <ConversationPanel
                    user={user}
                    peer={peer}
                    isOpenConvo={isOpenConvo}
                    onCloseConvo={handleCloseConvo}
                />

                <main className="my-3 ml-0 mr-3 flex w-full rounded-xl border border-gray-200 bg-white shadow-sm md:ml-80 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                    {children}
                </main>
            </div>
        </>
    )
}

export default AuthenticatedLayout
