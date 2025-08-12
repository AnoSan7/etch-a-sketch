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
    col='black';
})
for(let i=0;i<n;i++){
    let rows=document.createElement("div");
    rows.className="rows";
    for(let j=0;j<n;j++){
        let cell=document.createElement("div");
        cell.className="cell";
        cell.addEventListener("mouseover",(e)=>{
            if(e.buttons===1 && istopmost===false) {
                cell.style.backgroundColor=col;
            }
        });
        cell.addEventListener("touchstart", (e) => {
            e.preventDefault();
            cell.style.backgroundColor = col;
        }, { passive: false });
        cell.addEventListener("touchmove", (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            if (target && target.classList.contains('cell')) {
                target.style.backgroundColor = col;
            }
        }, { passive: false });
        rows.appendChild(cell);
    }
    container.appendChild(rows);
}
const eraser=document.querySelector("#eraser");
eraser.addEventListener("click",(e)=>{
    col='';
});
const topmost=document.querySelector("#topmost");
topmost.addEventListener("click", (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
if(window.innerWidth>=600){
    topmost.style.display='none';
}
else{
    window.addEventListener("scroll", () => {
        const contPos=container.getBoundingClientRect();
        if(contPos.top<0){
            topmost.style.display='block';
        }
        else{
            topmost.style.display='none';
        }
    });
}