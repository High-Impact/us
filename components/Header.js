// // Next.js
// import Link from 'next/link'

// export default function Header({ menu, global_options}) {
//     return (
//         <header className="bg-gray-400 p-4">
//             <div className="flex container m-auto">
//                 <div className="w-1/3">
//                     <Link href='../../'>
//                         <span className="w-20 h-20 overflow-hidden relative block rounded-full cursor-pointer shadow-2xl  border-4 border-solid border-gray-600 transition ease-in duration-200 transform hover:scale-95">
//                             <img  
//                                 src={global_options.acf.logo}
//                                 className="max-w-none min-h-full max-h-full -mx-4"
//                             />
//                         </span>
//                     </Link>
//                 </div>
//                 <ul className="w-2/3 flex justify-end items-center">
//                     {menu.items.map((item) =>
//                         <li className="mr-6" key={item.ID}>
//                             <Link href={`/${item.slug}`}>
//                                 <a className="text-blue-500 hover:text-blue-800">{item.title}</a>
//                             </Link>
//                         </li>
//                     )}
//                 </ul>

//             </div>
//             <div>
//                 <button class="hamburger hamburger--collapse" type="button">
//                     <span class="hamburger-box">
//                         <span class="hamburger-inner"></span>
//                     </span>
//                 </button>
//                 <button class="hamburger hamburger--collapse is-active" type="button">
//                     <span class="hamburger-box">
//                         <span class="hamburger-inner"></span>
//                     </span>
//                 </button>
//             </div>
//         </header>
//     )
// }

// =========================
// Next.js
import Link from 'next/link'
import React from 'react';

function Hamburger(props) {
    if (!props.open) {
        return (
            <button class="hamburger hamburger--collapse z-20 fixed bg-white top-0 right-0" type="button">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </button>
        );
    }

    return (
        <button class="hamburger hamburger--collapse is-active z-20 fixed bg-white top-0 right-0" type="button">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>
    );
}
function Menu(props) {
    if (!props.open) {
        return (
            <>
            </>
        );
    }

    return (
        <div className="fixed bg-white top-0 z-10 w-full h-full">
           <ul className="">
                {props.menu.items.map((item) =>
                    <li className="mr-6" key={item.ID}>
                        <Link href={`/${item.slug}`}>
                            <a className="text-blue-500 hover:text-blue-800">{item.title}</a>
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            menu: props.menu,
            global_options: props.global_options,
            menu_open: false
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            menu_open: !state.menu_open
        }));
    }

    render() {
        return (
            <header className="">
            {/* <div className="flex container m-auto">
                <div className="w-1/3">
                    <Link href='../../'>
                        <span className="w-20 h-20 overflow-hidden relative block rounded-full cursor-pointer shadow-2xl  border-4 border-solid border-gray-600 transition ease-in duration-200 transform hover:scale-95">
                            <img  
                                src={this.state.global_options.acf.logo}
                                className="max-w-none min-h-full max-h-full -mx-4"
                            />
                        </span>
                    </Link>
                </div>
                <ul className="w-2/3 flex justify-end items-center">
                    {this.state.menu.items.map((item) =>
                        <li className="mr-6" key={item.ID}>
                            <Link href={`/${item.slug}`}>
                                <a className="text-blue-500 hover:text-blue-800">{item.title}</a>
                            </Link>
                        </li>
                    )}
                </ul>

            </div> */}
            <div onClick={this.handleClick}>
                <Hamburger open={this.state.menu_open} />
                <Menu open={this.state.menu_open} menu={this.state.menu} />
            </div>
            <style global jsx>{`
                    .questionHolder {
                        width: 100%;
                        margin-bottom:2em;
                    }
                    .questionContainer {
                        padding:1em 2em;
                        border: 1px solid rgba(0,0,0,.25);
                        border-radius: .3em;
                        overflow: hidden;
                        margin-bottom: 2em;
                        cursor: pointer;
                        -webkit-transition: 375ms;
                        transition: 375ms;
                        box-shadow: 0px 6px 5px -4px rgba(0,0,0,0.51);
                        transition:500ms;
                        font-size:1.2em;
                        margin:0;
                    }
                    .finish {
                        opacity: .3;
                    }
                `}</style>
        </header>
        );
    }
}

export default Header;