function Header() {
    return (
        <>
            <div className="">
                <form action="w-full">
                    <input type="text" className="placeholder:text-white/50 w-full outline-none rounded-full p-2 px-4 bg-[#181818]" placeholder="Search.." />
                </form>
            </div>
        </>
    );
}

export default Header;