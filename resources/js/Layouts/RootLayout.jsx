import { HomeIcon, InboxIcon, GearIcon, DocIcon } from '@/Components/Icons'
import NavLink from '@/Components/NavLink'
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
    User
} from '@nextui-org/react'

const RootLayout = ({ user, header, children }) => {
    return (
        <>
            <div className="flex min-h-svh">
                <div className="fixed inset-y-0 left-0 hidden md:flex">
                    <nav className="flex h-screen w-64 flex-col justify-between">
                        <div className="flex flex-col">
                            <h1 className="p-6 text-xl font-bold dark:text-white">
                                Talkativ
                            </h1>
                            <div className="flex flex-col gap-y-2 border-t border-gray-300 px-4 pt-8 font-medium dark:border-gray-800">
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
                                <NavLink className="flex items-center gap-2">
                                    <GearIcon />
                                    <span>Preferences</span>
                                </NavLink>
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
                                        className="transition-transform dark:text-white"
                                        description={user.email}
                                        name={user.name}
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
                                            @tonyreichert
                                        </p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">
                                        My Settings
                                    </DropdownItem>
                                    <DropdownItem key="team_settings">
                                        Team Settings
                                    </DropdownItem>
                                    <DropdownItem key="analytics">
                                        Analytics
                                    </DropdownItem>
                                    <DropdownItem key="system">
                                        System
                                    </DropdownItem>
                                    <DropdownItem key="configurations">
                                        Configurations
                                    </DropdownItem>
                                    <DropdownItem key="help_and_feedback">
                                        Help & Feedback
                                    </DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </nav>
                </div>
                <main className="my-3 ml-0 mr-3 flex w-full flex-1 rounded-xl border border-gray-200 bg-white shadow-sm shadow-black/5 md:ml-64 dark:border-gray-800 dark:bg-gray-900/70">
                    {children}
                </main>
            </div>
        </>
    )
}

export default RootLayout
