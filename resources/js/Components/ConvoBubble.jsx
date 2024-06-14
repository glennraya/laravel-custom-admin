import { Avatar } from '@nextui-org/react'

const ConvoBubble = ({ user, sender, message }) => {
    return (
        <>
            <div
                className={`flex max-w-full gap-3 whitespace-pre-wrap ${user.id === sender.id ? 'justify-end' : null}`}
            >
                <Avatar
                    radius="full"
                    isBordered
                    size="sm"
                    color="success"
                    className={`flex-none shadow-lg shadow-green-400 ${user.id === sender.id ? 'order-2' : null}`}
                    src={`https://ui-avatars.com/api/?size=256&name=${sender.name}`}
                />
                <div className="flex flex-col">
                    <p
                        className={`-mt-4 whitespace-pre-wrap rounded-xl ${user.id === sender.id ? 'bg-blue-500 text-white' : 'bg-gray-200'} p-3 dark:bg-gray-900 dark:text-white`}
                    >
                        {message}
                    </p>
                    <span className="text-right text-sm font-medium text-gray-400 dark:text-gray-600">
                        1 hour ago
                    </span>
                </div>
            </div>

            {/* <div className="flex justify-end gap-3">
                <Avatar
                    radius="full"
                    isBordered
                    size="sm"
                    color="success"
                    className="order-2 flex-none shadow-lg shadow-green-400"
                    src={`https://ui-avatars.com/api/?size=256&name=Glenn Raya`}
                />
                <div className="flex flex-col">
                    <p className="-mt-4 whitespace-pre-wrap rounded-xl bg-blue-500 p-3 text-white">
                        I will marry you right now.
                    </p>
                    <span className="text-right text-sm font-medium text-gray-400">
                        A minute ago
                    </span>
                </div>
            </div> */}
        </>
    )
}

export default ConvoBubble
