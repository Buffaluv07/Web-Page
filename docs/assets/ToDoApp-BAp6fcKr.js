import"./modulepreload-polyfill-B5Qt9EMX.js";document.addEventListener("DOMContentLoaded",()=>{const d=document.getElementById("todo-input"),a=document.getElementById("task-date"),r=document.getElementById("task-category"),u=document.getElementById("add-button"),i=document.getElementById("incompleted-list"),m=document.getElementById("completed-list"),g=n=>{const t=document.createElement("li");t.classList.add("todo-list",n.category);const e=document.createElement("label");e.classList.add("custom-checkbox");const o=document.createElement("input");o.type="checkbox",o.id=`task-${n.id}`,o.name=`task-${n.id}`;const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("stroke-width","2"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round");const h=document.createElementNS("http://www.w3.org/2000/svg","path");h.setAttribute("d","M20 6L9 17l-5-5"),s.appendChild(h),e.appendChild(o),e.appendChild(s);const l=document.createElement("label");l.setAttribute("for",`task-${n.id}`),l.classList.add("task-label",n.category),l.textContent=`${n.text} (${n.date||"No date"})`;const p=document.createElement("button");p.classList.add("delete-button");const c=document.createElementNS("http://www.w3.org/2000/svg","svg");c.setAttribute("class","delete-icon"),c.setAttribute("xmlns","http://www.w3.org/2000/svg"),c.setAttribute("viewBox","0 0 24 24"),c.setAttribute("fill","none"),c.setAttribute("stroke","currentColor"),c.setAttribute("stroke-width","2"),c.setAttribute("stroke-linecap","round"),c.setAttribute("stroke-linejoin","round");const E=document.createElementNS("http://www.w3.org/2000/svg","path");return E.setAttribute("d","M3 6h18M9 6v12m6-12v12M19 6l-1 14H6L5 6"),c.appendChild(E),p.appendChild(c),p.addEventListener("click",()=>{t.remove()}),o.addEventListener("change",()=>{o.checked?(l.style.textDecoration="line-through",m.appendChild(t)):(l.style.textDecoration="none",i.appendChild(t))}),t.appendChild(e),t.appendChild(l),t.appendChild(p),t},v=n=>{const t=g(n);i.appendChild(t)};u.addEventListener("click",n=>{n.preventDefault();const t=d.value.trim(),e=a.value,o=r.value;if(!t){alert("Please enter a task.");return}const s={id:Date.now(),text:t,date:e,category:o};v(s),d.value="",a.value="",r.value="personal"})});document.addEventListener("DOMContentLoaded",()=>{const d=document.getElementById("audio-player"),a=document.getElementById("song-select"),r=document.getElementById("play-button"),u=document.getElementById("pause-button"),i=document.getElementById("stop-button"),m=document.getElementById("next-button"),g=document.getElementById("volume-slider"),v=document.querySelectorAll(".control-button"),n=e=>{d.src=e,d.play().catch(o=>{console.error("Error playing audio:",o)})},t=e=>{v.forEach(o=>o.classList.remove("active")),e.classList.add("active")};r.addEventListener("click",()=>{d.play().catch(e=>{console.error("Error playing audio:",e)}),t(r)}),u.addEventListener("click",()=>{d.pause(),t(u)}),i.addEventListener("click",()=>{d.pause(),d.currentTime=0,t(i)}),m.addEventListener("click",()=>{const o=(a.selectedIndex+1)%a.options.length;a.selectedIndex=o,n(a.value),t(m)}),a.addEventListener("change",e=>{n(e.target.value)}),g.addEventListener("input",e=>{d.volume=e.target.value}),n(a.value)});
