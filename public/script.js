const backendurl = "http://localhost:3000/fruit";

async function adatokLetoltese() {
    const response = await fetch(backendurl);
    const data = await response.json();
    adatokMegjelenitese(data);
}

function adatokMegjelenitese(fruitJSON) {
    var htmlTartalom = "";
    for(let i = 0; i < fruitJSON.length; i++) {
        htmlTartalom += `
        <div class="card">
        <div><h3>Megnevezés:</h3><h4>${fruitJSON[i].megnevezes}</h4></div>
        <div><h3>Egységár:</h3><h4>${fruitJSON[i].egysegar}</h4></div>
        <div><h3>Mennyiségi egység:</h3><h4>${fruitJSON[i].mennyisegiEgyseg}</h4></div>
        <div><h3>Mennyiség:</h3><h4>${fruitJSON[i].mennyiseg}</h4></div>
    </div>
        `;
    }
    htmlTartalom += `
        <form class="card" action="http://localhost:3000/" method="post" enctype="application/x-www-form-urlencoded">
                    <input type="text" placeholder="Megnevezés" name="megnevezes" id="megnevezes">
                    <input type="number" placeholder="Egységár" name="egysegar" id="egysegar">
                    <select name="mennyisegiEgyseg" id="mennyisegiEgyseg">
                        <option value="db">db</option>
                        <option value="kg">kg</option>
                    </select>
                    <input type="number" placeholder="Mennyiség" name="mennyiseg" id="mennyiseg">
                    <button type="submit">Submit</button>
                </form>
        `;
    document.getElementById("row").innerHTML = htmlTartalom;
}

document.addEventListener("DOMContentLoaded", () => {
    adatokLetoltese();
});