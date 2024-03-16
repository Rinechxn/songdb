function DownloadButton() {
    return (
        <>
            <p className=" rounded-full hover:opacity-40 duration-150 -mt-[2px]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 "

                >
                    <path
                        stroke="#ffffff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M6 21h12M12 3v14m0 0 5-5m-5 5-5-5"
                    />
                </svg>
            </p>
        </>
    );
}

export default DownloadButton;