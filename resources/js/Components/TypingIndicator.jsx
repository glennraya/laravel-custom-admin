const TypingIndicator = () => {
    return (
        <>
            <svg
                height="20"
                width="40"
                className="loader ml-2 dark:border dark:border-gray-700 dark:bg-gray-800"
            >
                <circle className="dot" cx="10" cy="10" r="3" />
                <circle className="dot" cx="20" cy="10" r="3" />
                <circle className="dot" cx="30" cy="10" r="3" />
            </svg>
        </>
    )
}

export default TypingIndicator
