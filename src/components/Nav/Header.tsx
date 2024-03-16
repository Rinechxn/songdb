function Header() {
    return (
        <>
            <div className="fixed py-4 px-4 flex items-center justify-between">
                <form action="">
                    <input type="text" className="placeholder:text-white/50 w-full outline-none rounded-full p-2 px-4 bg-[#4b4b4b85] backdrop-blur-lg" placeholder="Search.." />
                </form>
                <div>
                   
                </div>
            </div>
        </>
    );
}

export default Header;