function PageNotFound() {
    return (
        <>
            <div className="py-32 w-full h-screen flex items-center justify-center bg-[#1e1922]">
                <div className="p-8 w-[48rem] flex flex-col space-y-4">
                    <b className="text-3xl">Whoops! You've discovered a secret garden...</b>
                    <p>But it seems the path you were looking for has blossomed into mystery. Don't worry, though! Our team of friendly garden gnomes is already on a quest to find it.

                        In the meantime, why not explore our homepage to see if you can find another path that intrigues you? Or if you're feeling adventurous, use our search bar to uncover other hidden treasures.

                        Remember, every adventure begins with a single step... or a <a href="/" className="underline">click!</a></p>
                </div>

            </div>
        </>
    );
}

export default PageNotFound;