

export default function (pageName: string): string {

    if (pageName === "category") {
        pageName = "categories"
    } else if (pageName === "goods") {
        pageName = "goods";
    }
    else {
        pageName = `${pageName}s`
    }
    return pageName
}
