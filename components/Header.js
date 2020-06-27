// Next.js
import Link from 'next/link'
import React from 'react';
import Head from 'next/head'

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
        <button 
            class="hamburger hamburger--collapse is-active z-20 fixed bg-white top-0 right-0" type="button">
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
            <ul className="container m-auto p-4">
                <h6 className="text-6xl font-bold mt-4 mb-2">Menu</h6>
                {props.menu.items.map((item) =>
                    ( item.title == 'Home' ? 
                        <li key="Home">
                            <Link href="/">
                                <a className="text-blue-500 hover:text-blue-800 text-4xl font-bold mt-4 mb-2">- {item.title}</a>
                            </Link>
                        </li> : 
                        <li className="mr-6" key={item.ID}>
                            <Link href={`/${item.slug}`}>
                                <a className="text-blue-500 hover:text-blue-800 text-4xl font-bold mt-4 mb-2">- {item.title}</a>
                            </Link>
                        </li>
                    )
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
                <Head>
                    <title>Our Journey</title>
                    <link rel="shortcut icon" href="https://storage.googleapis.com/stateless-us-wp/2020/06/2e9a212d-favi.png" />
                </Head>
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