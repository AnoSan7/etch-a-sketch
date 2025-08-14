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
            if(e.buttons===1 && !dragging) {
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
document.addEventListener("DOMContentLoaded", () => {
    topmost.style.display = 'none';
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
const scroller=document.querySelector(".scroller");
const bar=document.querySelector(".bar");
function updThumb(){
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const thumbHeight = Math.max((winHeight / docHeight) * winHeight, 50);
    const thumbTop = (scrollTop/(docHeight-winHeight))*(winHeight-thumbHeight);
    bar.style.height = `${thumbHeight}px`;
    bar.style.top = `${thumbTop}px`;
}
updThumb();
window.addEventListener("scroll", updThumb);
window.addEventListener("resize", updThumb);
let dragging=false;
let y=0;
bar.addEventListener("mousedown", (e) => {
    dragging = true;
    y = e.clientY - bar.getBoundingClientRect().top;
    document.body.style.userSelect = 'none'; // Prevent text selection
});
document.addEventListener("mouseup",()=>{
    dragging = false;
    document.body.style.userSelect = ''; // Re-enable text selection
})
document.addEventListener("mousemove", (e) => {
    if(!dragging) return;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const thumbHeight=parseFloat(bar.style.height);
    const curr=scroller.getBoundingClientRect();
    let newTop=e.clientY-curr.top-y;
    newTop=Math.max(0,newTop);
    newTop=Math.min(newTop,winHeight-thumbHeight);
    const ratio=newTop/(winHeight-thumbHeight);
    window.scrollTo(0, ratio * (docHeight - winHeight));
});
bar.addEventListener("touchstart", (e) => {
    e.preventDefault();
    dragging = true;
    y = e.touches[0].clientY - bar.getBoundingClientRect().top;
    document.body.style.userSelect = 'none'; // Prevent text selection
}, { passive: false });
document.addEventListener("touchend", () => {
    dragging = false;
    document.body.style.userSelect = ''; // Re-enable text selection
}, { passive: false });
document.addEventListener("touchmove", (e) => {
    if(!dragging) return;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const thumbHeight=parseFloat(bar.style.height);
    const curr=scroller.getBoundingClientRect();
    let newTop=e.touches[0].clientY-curr.top-y;
    newTop=Math.max(0,newTop);
    newTop=Math.min(newTop,winHeight-thumbHeight);
    const ratio=newTop/(winHeight-thumbHeight);
    window.scrollTo(0, ratio * (docHeight - winHeight));
}, { passive: false });
let hideTimeout;
function showScrollbar(){
    bar.style.opacity=1;
    bar.style.pointerEvents='auto';
    clearTimeout(hideTimeout);
    hideTimeout=setTimeout(()=>{
        bar.style.opacity=0;
        bar.style.pointerEvents='none';
    },2000);
}
['mousedown','mousemove','touchstart','touchmove'].forEach(eventType => {
    scroller.addEventListener(eventType, showScrollbar, { passive: true });
});
showScrollbar();