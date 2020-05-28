export default function MainMenu({ menu }) {
    function listItem(item) {
        console.dir(item.child_items)
        return <li>Title: {item.title} | ID: {item.object_id}</li>
    }

    return (
        <div className="container">
            {console.dir(menu)}
            <ul>
                {menu.items.map((item) =>
                    listItem(item)
                )}
            </ul>
        </div>
    )
}