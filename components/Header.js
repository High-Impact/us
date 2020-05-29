export default function Header() {
    return (
        <header className="bg-gray-400 py-4">
            <div className="flex container m-auto">
                <div className="w-1/3">
                    <span className="w-20 h-20 overflow-hidden relative block rounded-full">
                        <img  
                            src="https://storage.googleapis.com/stateless-us-wp/2020/05/88454212-dsc_0279-scaled.jpg" 
                            className="max-w-none min-h-full max-h-full -mx-4"
                        />

                    </span>
                </div>
                <ul className="w-2/3 flex justify-end items-center">
                    <li className="mr-6">
                        <a className="text-blue-500 hover:text-blue-800" href="#">Active</a>
                    </li>
                    <li className="mr-6">
                        <a className="text-blue-500 hover:text-blue-800" href="#">Link</a>
                    </li>
                    <li className="mr-6">
                        <a className="text-blue-500 hover:text-blue-800" href="#">Link</a>
                    </li>
                </ul>

            </div>
        </header>
    )
}