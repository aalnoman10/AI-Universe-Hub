const loadingAi = async () => {
    const URL = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(URL);
    const data = await res.json();
    displayDataItems(data.data.tools.slice(0, 6))
}

const displayDataItems = (items) => {
    console.log(items);
    const itemsContainer = document.getElementById("item-container");

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
            <div class="card h-100 p-3">
                <img src="${item.image}" class="card-img-top h-100" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.</p>
                </div>
                <div class="card-footer">
                    <small class="text-muted">Last updated 3 mins ago</small>
                </div>
            </div>
        `
        itemsContainer.appendChild(div)
        console.log(item);
    });
}

loadingAi();