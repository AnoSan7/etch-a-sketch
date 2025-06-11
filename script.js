const n=50;
let container=document.querySelector(".container");
let wid=Math.floor(480/n);
for(let i=0;i<n;i++){
    let rows=document.createElement("div");
    rows.className="rows";
    for(let j=0;j<n;j++){
        let cell=document.createElement("div");
        cell.className="cell";
        cell.style.width=`${wid}px`;
        cell.style.height=`${wid}px`;
        cell.addEventListener("mouseover",(e)=>cell.style.backgroundColor="black");
        rows.appendChild(cell);
    }
    container.appendChild(rows);
}