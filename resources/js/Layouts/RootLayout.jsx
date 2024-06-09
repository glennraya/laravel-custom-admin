import { HomeIcon, InboxIcon, GearIcon } from '@/Components/Icons'
import NavLink from '@/Components/NavLink'

const RootLayout = ({ user, header, children }) => {
    return (
        <>
            <div className="flex">
                <nav className="flex h-full w-[380px] flex-col">
                    <h1 className="p-6 font-bold uppercase">Talkativ</h1>
                    <div className="flex flex-col gap-3 border-t border-gray-300 px-4 pt-8 font-medium">
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
                            <GearIcon />
                            <span>Settings</span>
                        </NavLink>
                    </div>
                </nav>
                <main className="my-3 mr-3 w-full rounded-lg border border-gray-200 bg-white shadow-sm shadow-black/5">
                    {children}
                </main>
            </div>
        </>
    )
}

export default RootLayout
