import { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Kbd, ScrollShadow, Textarea } from '@nextui-org/react'
import ConvoBubble from './ConvoBubble'
import LoadingIcon from './LoadingIcon'
import TypingIndicator from './TypingIndicator'

const ConversationPanel = ({ user, peer, isOpenConvo, onCloseConvo }) => {
    const [chatThread, setChatThread] = useState([])
    const [message, setMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [peerUser, setPeerUser] = useState(null)

    // Chat box viewport reference.
    const chatContainerRef = useRef(null)

    // Scroll to the bottom of the chat box
    // viewport to view the latest message.
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight
        }
    }

    // Detect if we hit the ceiling of the chat box so
    // we can load the previous messages.
    const handleScroll = () => {
        if (chatContainerRef.current) {
            if (chatContainerRef.current.scrollTop === 0) {
                handleLoadPreviousMessages()
            }
        }
    }

    // Load previous messages when the user scrolls up
    // from the conversation panel.
    const [isLoadingPrevMessages, setIsLoadingPrevMessages] = useState(false)
    let nextPage = null

    const handleLoadPreviousMessages = async () => {
        // console.log('Next page ', nextPage)
        setIsLoadingPrevMessages(true)
        if (nextPage)
            await axios.get(nextPage).then(response => {
                nextPage = response.data.messages.next_page_url
                setChatThread(prevChatThread => [
                    ...prevChatThread,
                    ...response.data.messages.data
                ])
                setIsLoadingPrevMessages(false)
            })
        setIsLoadingPrevMessages(false)
    }

    // Close the conversation dialog.
    const handleClose = () => {
        onCloseConvo(false)
        setChatThread(null)
    }

    // Send message to your so-called friend.
    const handleSendMessage = async () => {
        await axios
            .post('/messages', {
                sender_id: user.id,
                recipient_id: peer.id,
                message: message
            })
            .then(response => {
                console.log('Message Payload sending: ', response)
                setMessage('')

                setChatThread(prevChatThread => [
                    response.data,
                    ...prevChatThread
                ])

                // Scroll to the latest message.
                setTimeout(() => {
                    scrollToBottom()
                }, 100)
            })
    }

    // Fetch latest messages.
    const fetchMessages = () => {
        axios.get('/get-messages/' + peer.id).then(response => {
            // console.log('Thread: ', response.data)
            setChatThread(response.data.messages.data)
            nextPage = response.data.messages.next_page_url

            // Scroll to the latest message.
            setTimeout(() => {
                scrollToBottom()
            }, 100)
        })
    }

    // Send Typing event
    const sendTypingEvent = () => {
        console.log('Peer ', peer)
        Echo.private(`messages.${peer.id}`).whisper('typing', {
            user_id: user.id,
            name: user.name
        })
    }

    // Function to listen for typing events
    const listenForTypingEvents = () => {
        Echo.private(`messages.${user.id}`).listenForWhisper('typing', e => {
            // if (e.user_id !== currentUser.id) {
            console.log('typing.....')
            console.log(e.name + ' is typing...')
            // Handle the typing indication for other users here
            // }
        })
    }

    useEffect(() => {
        if (peer && isOpenConvo) {
            // Fetch the messages when the conversation dialog was opened.
            fetchMessages()
            listenForTypingEvents(peer.id)
        } else {
            // Clear the chatThread state when convesation dialog is closed.
            setChatThread([])
        }

        // Add scroll listener to the chat box to detect if it hits the top.
        const chatContainer = chatContainerRef.current
        if (chatContainer) {
            chatContainer.addEventListener('scroll', handleScroll)
        }

        // Listen to incoming messages...
        const channel = Echo.private(`messages.${user.id}`).listen(
            'MessageSent',
            event => {
                console.log('Message Payload: ', event)
                setChatThread(prevChatThread => [
                    event.message,
                    ...prevChatThread
                ])

                setTimeout(() => {
                    scrollToBottom()
                }, 100)
            }
        )

        return () => {
            if (chatContainer) {
                chatContainer.removeEventListener('scroll', handleScroll)
            }

            // Cleanup function, stop listening to messages and leave channel
            // after closing the conversation dialog.
            channel.stopListening('MessageSent')
            Echo.leaveChannel(`message.${user.id}`)
        }
    }, [isOpenConvo, peer, user.id])

    return (
        <>
            {isOpenConvo && (
                <div className="absolute bottom-20 left-72 flex max-h-[600px] min-h-[500px] w-96 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-xl dark:border-gray-800 dark:bg-black">
                    <div className="flex w-full items-center justify-between border-b border-gray-200 px-4 py-4 shadow-sm dark:border-gray-800">
                        <div className="flex w-[75%] gap-4">
                            <Avatar
                                radius="full"
                                isBordered
                                size="sm"
                                color="success"
                                className="shadow-lg shadow-green-400"
                                src={`https://ui-avatars.com/api/?size=256&name=${peer.name}`}
                            />
                            <span className="flex-1 truncate font-medium dark:text-white">
                                {peer.name}
                            </span>
                        </div>

                        <Button
                            radius="sm"
                            size="lg"
                            color="none"
                            isIconOnly
                            onClick={() => handleClose(false)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="size-7 text-gray-500 transition duration-300 ease-in-out hover:scale-125"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </Button>
                    </div>

                    <ScrollShadow
                        size={25}
                        ref={chatContainerRef}
                        className="flex min-h-96 w-full flex-col overflow-y-scroll overscroll-contain p-4 py-8"
                    >
                        <div className="flex min-h-96 w-full flex-col gap-8">
                            {isLoadingPrevMessages && <LoadingIcon />}
                            {chatThread.length > 0 ? (
                                chatThread
                                    .slice()
                                    .reverse()
                                    .map(thread => (
                                        <ConvoBubble
                                            user={user} // -> The currently authenticated user.
                                            thread={thread}
                                            key={thread.id}
                                        />
                                    ))
                            ) : (
                                <div className="m-auto flex text-center dark:text-gray-500">
                                    Say Hi!
                                </div>
                            )}
                        </div>
                    </ScrollShadow>

                    <div className="flex w-full flex-col gap-2 p-2">
                        {isTyping && <TypingIndicator className="p-3" />}
                        <div className="flex w-full gap-2 p-2">
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
                                onKeyDown={sendTypingEvent}
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
                </div>
            )}
        </>
    )
}

export default ConversationPanel
