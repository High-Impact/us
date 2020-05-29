export default function getPageID(pages, page) {
    var id = '404'
    pages.forEach(element => {
        if (element.slug == page) {
            id = element.id
        }
    });
    return id;
}