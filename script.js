(function(){
  var answers=["2010","03","23"], cur=0;
  var dots=document.querySelectorAll("#dots i");
  var msgs=["Bu yil noto’g’ri. Bu sayt senga emas.","Bu oy noto’g’ri. Bu sayt senga emas.","Bu kun noto’g’ri. Bu sayt senga emas."];

  function norm(v,i){
    v=v.trim();
    if(i>0&&v.length===1)v="0"+v;
    return v;
  }
  function check(i){
    var inp=document.getElementById("i"+i), err=document.getElementById("e"+i);
    if(norm(inp.value,i)===answers[i]){
      err.textContent=""; dots[i].classList.add("d");
      document.getElementById("s"+i).classList.remove("on");
      if(i<2){ document.getElementById("s"+(i+1)).classList.add("on"); document.getElementById("i"+(i+1)).focus(); }
      else finish();
    }else{
      err.textContent=msgs[i];
      inp.classList.remove("shake"); void inp.offsetWidth; inp.classList.add("shake");
    }
  }
  document.querySelectorAll("button[data-i]").forEach(function(b){
    b.addEventListener("click",function(){check(+b.dataset.i)});
  });
  [0,1,2].forEach(function(i){
    document.getElementById("i"+i).addEventListener("keydown",function(e){if(e.key==="Enter")check(i)});
  });

  function hearts(){
    var n=0;
    var t=setInterval(function(){
      var h=document.createElement("div");
      h.className="heart"; h.textContent="♥";
      h.style.left=Math.random()*100+"vw";
      h.style.fontSize=(14+Math.random()*22)+"px";
      h.style.animationDuration=(5+Math.random()*5)+"s";
      document.body.appendChild(h);
      setTimeout(function(){h.remove()},11000);
      if(++n>60)clearInterval(t);
    },350);
  }
  function finish(){
    document.getElementById("dots").style.display="none";
    var f=document.getElementById("final"); f.classList.add("on");
    var els=f.querySelectorAll("p"), k=0;
    function next(){
      if(k<els.length){ els[k].classList.add("show"); k++; setTimeout(next,1700); }
      else document.getElementById("cta").classList.add("show");
    }
    setTimeout(next,300);
    hearts();
  }
  document.getElementById("i0").focus();
})();