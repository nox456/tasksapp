export default function logoHeader() {
    const header = document.createElement("header")
    header.classList.add("main-header")
    header.innerHTML = `
        <button class="button">
            <a href="/"><i class="gg-arrow-left"></i></a>
        </button>
        <h1 class="title">TasksApp</h1>
        <div></div>
        `
    document.body.insertAdjacentElement("afterbegin", header)
    return
}
