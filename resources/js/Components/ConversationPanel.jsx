import { useEffect, useState } from 'react'
import { Avatar, Button, ScrollShadow, Textarea } from '@nextui-org/react'
import ConvoBubble from './ConvoBubble'

const ConversationPanel = ({
    user,
    receiver,
    conversation,
    isOpenConvo,
    onCloseConvo
}) => {
    const [chatThread, setChatThread] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        setChatThread(conversation)
        if (conversation && isOpenConvo) {
            axios.get('/get-messages/' + conversation.id).then(response => {
                setChatThread(response.data)
                console.log('Thread: ', response.data)
            })

        } else {
            setChatThread([])
        }
    }, [conversation, isOpenConvo, receiver])

    // Close the conversation dialog.
    const handleClose = () => {
        onCloseConvo(false)
        setChatThread(null)
    }

    const handleSendMessage = async () => {
        await axios
            .post('/messages', {
                conversation_id: conversation.id,
                sender_id: user.id,
                message: message
            })
            .then(response => {
                console.log(response)
            })
    }

    return (
        <>
            {isOpenConvo && (
                <div className="absolute bottom-20 left-72 flex max-h-[600px] min-h-[500px] w-96 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl dark:border-gray-800 dark:bg-black">
                    <div className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-4 shadow-sm dark:border-gray-800">
                        <div className="flex gap-4">
                            <Avatar
                                radius="full"
                                isBordered
                                size="sm"
                                color="success"
                                className="shadow-lg shadow-green-400"
                                src={`https://ui-avatars.com/api/?size=256&name=${receiver.name}`}
                            />
                            <span className="font-medium dark:text-white">
                                {receiver.name}
                            </span>
                        </div>

                        <Button
                            radius="full"
                            size="md"
                            color="none"
                            isIconOnly
                            onClick={() => handleClose(false)}
                        >
                            <svg
                                data-slot="icon"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                className="size-12 text-gray-400 dark:text-white"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                                />
                            </svg>
                        </Button>
                    </div>

                    <ScrollShadow
                        size={150}
                        className="flex min-h-96 w-full flex-col overflow-y-scroll p-4 py-8"
                    >
                        <div className="flex w-full flex-col gap-8">
                            {chatThread.length > 0
                                ? chatThread.map(thread => (
                                      <ConvoBubble
                                          user={user} // -> The currently authenticated user.
                                          sender={thread.sender} // -> The sender of the message.
                                          message={thread.message}
                                          key={thread.id}
                                      />
                                  ))
                                : null}
                        </div>
                    </ScrollShadow>
                    <div className="flex w-full items-center gap-2 p-2">
                        <Textarea
                            minRows="1"
                            maxRows="4"
                            variant="flat"
                            radius="md"
                            size="lg"
                            className="dark:dark"
                            classNames={{
                                inputWrapper:
                                    'dark:bg-gray-900 dark:hover:bg-gray-800',
                                input: 'dark:group-focus:bg-gray-800'
                            }}
                            value={message}
                            onValueChange={setMessage}
                        />
                        <Button
                            size="lg"
                            isIconOnly
                            radius="full"
                            variant="none"
                            onClick={handleSendMessage}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-8 text-blue-500"
                            >
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                            </svg>
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConversationPanel
