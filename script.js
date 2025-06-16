const n=90;
let col='black';
colour=document.querySelector("#colour");
reset=document.querySelector("#reset");
submit=document.querySelector("#submit");
submit.addEventListener("click",(e)=>{
    if(colour.value==''){
        col='black';
    }
    else{
        col=colour.value;
    }
});
let container=document.querySelector(".container");
let wid=Math.floor(560/n);
reset.addEventListener('click',(e)=>{
    const cells=container.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor='';
    });
})
for(let i=0;i<n;i++){
    let rows=document.createElement("div");
    rows.className="rows";
    for(let j=0;j<n;j++){
        let cell=document.createElement("div");
        cell.className="cell";
        cell.style.width=`${wid}px`;
        cell.style.height=`${wid}px`;
        cell.addEventListener("mouseover",(e)=>cell.style.backgroundColor=col);
        rows.appendChild(cell);
    }
    container.appendChild(rows);
}