import"./modulepreload-polyfill-B5Qt9EMX.js";document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("add-button"),r=document.getElementById("todo-input"),u=document.getElementById("task-date"),p=document.getElementById("task-category"),m=document.getElementById("incompleted-list"),g=document.getElementById("completed-list");d(),n.addEventListener("click",t=>{t.preventDefault();const e=r.value.trim(),s=u.value;if(!e){alert("Please enter a task.");return}const o={id:Date.now(),text:e,date:s||null,category:p.value,completed:!1};i(o),c(o),r.value="",u.value="",p.value="work"});function c(t){const e=k(t);m.appendChild(e)}function k(t){const e=document.createElement("li");e.classList.add("todo-list"),e.setAttribute("data-id",t.id);const s=document.createElement("label");s.classList.add("custom-checkbox");const o=document.createElement("input");o.type="checkbox",o.checked=t.completed;const a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttribute("xmlns","http://www.w3.org/2000/svg"),a.setAttribute("viewBox","0 0 24 24"),a.setAttribute("fill","none"),a.setAttribute("stroke-width","2"),a.setAttribute("stroke-linecap","round"),a.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","path");E.setAttribute("d","M20 6L9 17l-5-5"),a.appendChild(E),s.appendChild(o),s.appendChild(a);const l=document.createElement("label");l.classList.add("task-label"),l.textContent=t.text,t.category==="work"?l.classList.add("work"):t.category==="personal"&&l.classList.add("personal"),t.completed&&(l.style.textDecoration="line-through");const y=document.createElement("button");return y.classList.add("delete-button"),y.innerHTML=`
            <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18M9 6v12m6-12v12M19 6l-1 14H6L5 6"></path>
            </svg>
        `,o.addEventListener("change",()=>{t.completed=o.checked,v(t),t.completed?(l.style.textDecoration="line-through",g.appendChild(e)):(l.style.textDecoration="none",m.appendChild(e))}),y.addEventListener("click",()=>{e.remove(),h(t.id)}),e.appendChild(s),e.appendChild(l),e.appendChild(y),e}function i(t){const e=JSON.parse(localStorage.getItem("tasks"))||[];e.push(t),localStorage.setItem("tasks",JSON.stringify(e))}function v(t){const e=JSON.parse(localStorage.getItem("tasks"))||[],s=e.findIndex(o=>o.id===t.id);s!==-1&&(e[s]=t,localStorage.setItem("tasks",JSON.stringify(e)))}function h(t){const s=(JSON.parse(localStorage.getItem("tasks"))||[]).filter(o=>o.id!==t);localStorage.setItem("tasks",JSON.stringify(s))}function d(){(JSON.parse(localStorage.getItem("tasks"))||[]).forEach(e=>{e.completed?g.appendChild(k(e)):c(e)})}});document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("audio-player"),r=document.getElementById("audio-source"),u=document.getElementById("play-button"),p=document.getElementById("pause-button"),m=document.getElementById("next-button"),g=document.getElementById("stop-button"),c=document.getElementById("song-select"),k=document.getElementById("volume-slider");let i=0;n.play(),u.addEventListener("click",()=>{n.play()}),p.addEventListener("click",()=>{n.pause()}),g.addEventListener("click",()=>{n.pause(),n.currentTime=0}),m.addEventListener("click",()=>{v()}),c.addEventListener("change",d=>{const t=d.target.value;r.src=t,n.load(),n.play(),h()}),n.addEventListener("ended",()=>{v()}),k.addEventListener("input",d=>{n.volume=d.target.value});function v(){const d=Array.from(c.options);i=(i+1)%d.length,c.selectedIndex=i;const t=d[i].value;r.src=t,n.load(),n.play()}function h(){i=Array.from(c.options).findIndex(t=>t.value===r.src)}});
