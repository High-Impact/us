export default function Layout({children}) {
    return (
        <div className="container">
            {children}
            <ul>
                <li>Layout</li>
            </ul>
        </div>
    )
}