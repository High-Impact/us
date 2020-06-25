// Next.js
import Link from 'next/link'

export default function Header({ menu, global_options}) {
    return (
        <header className="bg-gray-400 p-4">
            <div className="flex container m-auto">
                <div className="w-1/3">
                    <Link href='../../'>
                        <span className="w-20 h-20 overflow-hidden relative block rounded-full cursor-pointer shadow-2xl  border-4 border-solid border-gray-600 transition ease-in duration-200 transform hover:scale-95">
                            <img  
                                src={global_options.acf.logo}
                                className="max-w-none min-h-full max-h-full -mx-4"
                            />
                        </span>
                    </Link>
                </div>
                <ul className="w-2/3 flex justify-end items-center">
                    {menu.items.map((item) =>
                        <li className="mr-6" key={item.ID}>
                            {console.log(item.slug)}
                            <Link href={`/${item.slug}`}>
                                <a className="text-blue-500 hover:text-blue-800">{item.title}</a>
                            </Link>
                        </li>
                    )}
                </ul>

            </div>
        </header>
    )
}