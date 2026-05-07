// === BOŞLUK DOLDUR ===
function play_fill(){
  let q=0,ok=0,tot=10,ans=false;
  const sents=shuffleArray(SENTENCES).slice(0,tot);
  const next=()=>{
    if(q>=tot){showResults(ok>=8?'🏆':ok>=5?'👏':'📝',ok>=8?'Harika!':ok>=5?'Güzel!':'Tekrar Dene!',ok+'/'+tot,`${ok} boşluğu doğru doldurdun!`,'fill');return;}
    ans=false;const s=sents[q];
    let opts=[s.word];while(opts.length<4){const r=getRandomWord();if(!opts.includes(r.word))opts.push(r.word);}
    opts=shuffleArray(opts);
    const display=s.sentence.replace(s.word,'_____').replace('___','_____');
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">📝 Boşluk Doldur</div>
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Soru</span><span class="v">${q+1}/${tot}</span></div>
        <div class="pill"><span class="l">Doğru</span><span class="v">${ok}</span></div>
      </div></div>
      <div class="qdef" style="font-size:1.1rem">${display}<br><small style="color:var(--text3);margin-top:6px;display:block">${s.sentenceTr}</small></div>
      <div class="qopts" id="fo">${opts.map(o=>{const tr=WORD_DB.find(x=>x.word===o);return`<button class="qopt" data-w="${o}">${o} ${tr?'<span class="tr-badge">'+tr.tr+'</span>':''}</button>`;}).join('')}</div></div>`;
    document.getElementById('fo').onclick=e=>{
      const b=e.target.closest('.qopt');if(!b||ans)return;ans=true;
      document.querySelectorAll('.qopt').forEach(x=>{x.disabled=true;if(x.dataset.w===s.word)x.classList.add('ok');else if(x===b)x.classList.add('no');});
      if(b.dataset.w===s.word){ok++;addScore(40);}else resetStreak();
      q++;setTimeout(next,1200);
    };
  };next();
}

// === EŞ ANLAM EŞLE ===
function play_synonym(){
  let ws=getRandomWords(12).filter(w=>w.syn&&w.syn.length>0);
  while(ws.length<6){const w=getRandomWord();if(w.syn&&w.syn.length>0&&!ws.find(x=>x.word===w.word))ws.push(w);}
  const pairs=ws.slice(0,6);
  let cards=[];
  pairs.forEach(p=>{cards.push({text:p.word,pid:p.word,type:'w'});cards.push({text:p.tr,pid:p.word,type:'t'});});
  cards=shuffleArray(cards);
  let sel=null,matched=[],att=0;
  const render=()=>{
    if(matched.length===pairs.length){const sc=Math.max(0,pairs.length*25-att*3);addScore(sc);showResults('🔗','Hepsi Eşleşti!',sc+' puan',`${pairs.length} çifti ${att} denemede eşledin`,'synonym');return;}
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">🔗 İngilizce-Türkçe Eşleştir</div>
      <p class="card-s">Her İngilizce kelimeyi Türkçe karşılığıyla eşleştir</p>
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Eşleşen</span><span class="v">${matched.length}/${pairs.length}</span></div>
        <div class="pill"><span class="l">Deneme</span><span class="v">${att}</span></div>
      </div></div>
      <div class="mgrid" id="mg">${cards.map((c,i)=>{
        const m=matched.includes(c.pid);
        return`<div class="mcard ${m?'ok':''} ${sel===i?'sel':''}" data-i="${i}" style="${c.type==='t'?'font-style:italic;color:var(--primary2)':''}">${c.text}</div>`;
      }).join('')}</div></div>`;
    document.getElementById('mg').onclick=e=>{
      const cd=e.target.closest('.mcard');if(!cd)return;
      const i=parseInt(cd.dataset.i);if(matched.includes(cards[i].pid))return;
      if(sel===null){sel=i;render();}
      else if(sel===i){sel=null;render();}
      else{att++;
        if(cards[sel].pid===cards[i].pid&&cards[sel].type!==cards[i].type){matched.push(cards[sel].pid);sel=null;toast('✅ Doğru eşleşme!');render();}
        else{cd.classList.add('wf');sel=null;toast('❌ Eşleşmedi!');setTimeout(render,500);}
      }
    };
  };render();
}

// === KELİME MERDİVENİ ===
function play_ladder(){
  const puz=WORD_LADDERS[Math.floor(Math.random()*WORD_LADDERS.length)];
  const steps=puz.steps;let usr=steps.map((s,i)=>(i===0||i===steps.length-1)?s:'');
  let aStep=1;
  const render=()=>{
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">🪜 Kelime Merdiveni</div>
      <p class="card-s">Her adımda sadece bir harf değiştirerek <strong>${puz.start}</strong> → <strong>${puz.end}</strong> dönüştür</p>
      <div class="lsteps">${usr.map((s,si)=>{
        const fx=si===0||si===steps.length-1;
        const w=fx?s:(s||'????');
        return`<div>${si>0?'<div style="text-align:center;color:var(--text3);font-size:1.1rem">↓</div>':''}
          <div class="lstep">${w.split('').map((c,ci)=>{
            const cl=fx?'fx':(si===aStep?'act':'');
            return`<div class="lcell ${cl}">${c==='?'?'':c}</div>`;
          }).join('')}</div></div>`;
      }).join('')}</div>
      <div style="text-align:center;margin-top:14px">
        <input class="inp" id="li" placeholder="${aStep+1}. adım kelimesini yaz..." style="max-width:280px;margin:0 auto" autofocus>
        <div class="btn-row" style="justify-content:center">
          <button class="btn btn-a btn-sm" id="ls">Gönder</button>
          <button class="btn btn-g btn-sm" id="lh">💡 İpucu</button>
          <button class="btn btn-g btn-sm" onclick="play_ladder()">🔄 Yeni</button>
        </div>
      </div></div>`;
    const sub=()=>{const v=document.getElementById('li').value.trim().toUpperCase();
      if(v.length!==steps[0].length){toast(steps[0].length+' harf olmalı!');return;}
      if(v===steps[aStep]){usr[aStep]=v;addScore(30);aStep++;
        if(aStep>=steps.length-1){toast('🎉 Merdiven tamamlandı!');addScore(50);setTimeout(play_ladder,1500);}
        render();}else{toast('❌ Doğru kelime değil!');resetStreak();}};
    document.getElementById('ls').onclick=sub;
    document.getElementById('li').onkeydown=e=>{if(e.key==='Enter')sub();};
    document.getElementById('lh').onclick=()=>{const h=steps[aStep];toast('İpucu: '+h[0]+'...'+h[h.length-1]);};
    document.getElementById('li').focus();
  };render();
}

// === BULMACA ===
function play_crossword(){
  const puz=CROSSWORDS[Math.floor(Math.random()*CROSSWORDS.length)];
  const sz=puz.size;let ug=puz.grid.map(r=>r.map(c=>c==='#'?'#':''));
  const render=()=>{
    let gh='';const nums={};
    [...puz.across,...puz.down].forEach(c=>{nums[c.row+','+c.col]=c.num;});
    for(let r=0;r<sz;r++)for(let c=0;c<sz;c++){
      if(puz.grid[r][c]==='#')gh+=`<div class="cwc blk"></div>`;
      else{const n=nums[r+','+c]||'';const ok=ug[r][c]&&ug[r][c]===puz.grid[r][c];
        gh+=`<div class="cwc">${n?`<span class="cwn">${n}</span>`:''}
          <input maxlength="1" value="${ug[r][c]}" class="${ok?'ok':''}" data-r="${r}" data-c="${c}"></div>`;}}
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">🧩 Mini Bulmaca</div>
      <p class="card-s">Türkçe ipuçlarına göre İngilizce kelimeleri yaz</p>
      <div style="text-align:center"><div class="cwgrid" style="grid-template-columns:repeat(${sz},38px)" id="cg">${gh}</div></div>
      <div class="cwclues">
        <div><h4>→ Yatay</h4>${puz.across.map(c=>`<div class="cwcl">${c.num}. ${c.clue}</div>`).join('')}</div>
        <div><h4>↓ Dikey</h4>${puz.down.map(c=>`<div class="cwcl">${c.num}. ${c.clue}</div>`).join('')}</div>
      </div>
      <div class="btn-row" style="justify-content:center;margin-top:14px">
        <button class="btn btn-a btn-sm" id="cwk">Kontrol Et</button>
        <button class="btn btn-g btn-sm" onclick="play_crossword()">🔄 Yeni</button>
      </div></div>`;
    document.querySelectorAll('#cg input').forEach(inp=>{
      inp.oninput=()=>{const r=parseInt(inp.dataset.r),c=parseInt(inp.dataset.c);
        ug[r][c]=inp.value.toUpperCase();
        if(inp.value){const nx=inp.parentElement.nextElementSibling?.querySelector('input');if(nx)nx.focus();}};});
    document.getElementById('cwk').onclick=()=>{
      let ok=true;for(let r=0;r<sz;r++)for(let c=0;c<sz;c++)if(puz.grid[r][c]!=='#'&&ug[r][c]!==puz.grid[r][c])ok=false;
      if(ok){addScore(150);toast('🎉 Bulmaca çözüldü!');setTimeout(play_crossword,1500);}else{toast('Bazı harfler yanlış!');render();}};
  };render();
}

// === HAFIZA KARTI ===
function play_memory(){
  const ws=getRandomWords(6);
  let cards=[];ws.forEach(w=>{cards.push({id:w.word,text:w.word,type:'en'});cards.push({id:w.word,text:w.tr,type:'tr'});});
  cards=shuffleArray(cards);
  let flipped=[],matched=[],moves=0,locked=false;
  const render=()=>{
    if(matched.length===ws.length){const sc=Math.max(0,200-moves*5);addScore(sc);showResults('🃏','Hafıza Şampiyonu!',sc+' puan',`${ws.length} çifti ${moves} hamlede eşledin`,'memory');return;}
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">🃏 Hafıza Kartı</div>
      <p class="card-s">İngilizce kelimeleri Türkçe karşılıklarıyla eşleştir</p>
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Çift</span><span class="v">${matched.length}/${ws.length}</span></div>
        <div class="pill"><span class="l">Hamle</span><span class="v">${moves}</span></div>
      </div></div>
      <div class="memgrid" id="mmg">${cards.map((c,i)=>{
        const fl=flipped.includes(i)||matched.includes(c.id);const mt=matched.includes(c.id);
        return`<div class="memc ${fl?'flip':''} ${mt?'done':''}" data-i="${i}">
          <div class="memc-in"><div class="memc-f">❓</div>
          <div class="memc-b" style="${c.type==='tr'?'color:var(--primary2);font-style:italic':''}">${c.text}</div></div></div>`;
      }).join('')}</div></div>`;
    document.getElementById('mmg').onclick=e=>{
      if(locked)return;const cd=e.target.closest('.memc');if(!cd)return;
      const i=parseInt(cd.dataset.i);if(flipped.includes(i)||matched.includes(cards[i].id))return;
      flipped.push(i);render();
      if(flipped.length===2){locked=true;moves++;
        const[a,b]=flipped;
        if(cards[a].id===cards[b].id&&cards[a].type!==cards[b].type){matched.push(cards[a].id);toast('✅ Eşleşti!');flipped=[];locked=false;setTimeout(render,300);}
        else{setTimeout(()=>{flipped=[];locked=false;render();},1000);}
      }
    };
  };render();
}

// === HIZLI TUR ===
function play_blitz(){
  let sc=0,rd=0,mx=12,tl=75;
  const types=['def','tr','ant','spell','fill'];
  const tick=()=>{tl--;if(tl<=0){clearInterval(gameTimer);showResults(sc>=150?'🏆':sc>=80?'🎲':'📝',sc>=150?'Blitz Kralı!':sc>=80?'İyi Tur!':'Isınma Turu!',sc+' puan',`${rd} soru tamamlandı`,'blitz');}};
  gameTimer=setInterval(tick,1000);
  function nx(){
    if(rd>=mx||tl<=0){clearInterval(gameTimer);showResults(sc>=150?'🏆':'🎲','Tur Bitti!',sc+' puan',`${rd} soru tamamlandı`,'blitz');return;}
    const tp=types[Math.floor(Math.random()*types.length)];const w=getRandomWord();rd++;
    let h=`<div class="card"><div class="card-t">🎲 Hızlı Tur</div>${timerBar(tl/75*100)}
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Soru</span><span class="v">${rd}/${mx}</span></div>
        <div class="pill"><span class="l">Süre</span><span class="v">${tl}s</span></div>
        <div class="pill"><span class="l">Puan</span><span class="v">${sc}</span></div>
      </div></div><div class="bch">`;
    if(tp==='def'){
      let opts=[w];while(opts.length<4){const r=getRandomWord();if(!opts.find(o=>o.word===r.word))opts.push(r);}opts=shuffleArray(opts);
      h+=`<div class="btype">Tanıma Göre Bul</div><div class="bprompt">${w.defTr}</div>
        <div class="qopts" id="bo">${opts.map(o=>`<button class="qopt" data-w="${o.word}">${o.word}</button>`).join('')}</div>`;
    }else if(tp==='tr'){
      let opts=[w.tr];while(opts.length<4){const r=getRandomWord();if(!opts.includes(r.tr))opts.push(r.tr);}opts=shuffleArray(opts);
      h+=`<div class="btype">Türkçe Karşılığı</div><div class="bprompt" style="font-size:1.6rem">${w.word}</div>
        <div class="qopts" id="bo">${opts.map(o=>`<button class="qopt" data-w="${o}">${o}</button>`).join('')}</div>`;
    }else if(tp==='ant'){
      if(!w.ant||!w.ant.length){nx();return;}
      let opts=[w.ant[0]];while(opts.length<4){const r=getRandomWord();if(r.word&&!opts.includes(r.word))opts.push(r.word);}opts=shuffleArray(opts);
      h+=`<div class="btype">Zıt Anlamını Bul</div><div class="bprompt"><strong>${w.word}</strong> (${w.tr}) kelimesinin zıttı?</div>
        <div class="qopts" id="bo">${opts.map(o=>`<button class="qopt" data-w="${o}">${o}</button>`).join('')}</div>`;
    }else if(tp==='spell'){
      const scr=shuffleArray(w.word.split('')).join('');
      h+=`<div class="btype">Harfleri Düzenle</div>
        <div class="bprompt" style="letter-spacing:6px;font-size:1.6rem">${scr.toUpperCase()}</div>
        <div style="color:var(--text3);margin-bottom:12px;font-size:.85rem">Türkçesi: ${w.tr}</div>
        <div style="display:flex;gap:8px;justify-content:center">
          <input class="inp" id="bi" style="max-width:220px" placeholder="Kelimeyi yaz..." autofocus>
          <button class="btn btn-a btn-sm" id="bsub">Gönder</button></div>`;
    }else{
      const display=w.ex.replace(w.word,'_____').replace('___','_____');
      let opts=[w.word];while(opts.length<4){const r=getRandomWord();if(!opts.includes(r.word))opts.push(r.word);}opts=shuffleArray(opts);
      h+=`<div class="btype">Boşluğu Doldur</div><div class="bprompt">${display}</div>
        <div class="qopts" id="bo">${opts.map(o=>`<button class="qopt" data-w="${o}">${o}</button>`).join('')}</div>`;
    }
    h+=`</div></div>`;document.getElementById('gameArea').innerHTML=h;
    const ca=tp==='tr'?w.tr:tp==='ant'?w.ant[0]:w.word;
    if(tp==='spell'){
      const sub=()=>{const v=document.getElementById('bi').value.trim().toLowerCase();
        if(v===w.word){sc+=30;addScore(30);nx();}else{resetStreak();toast('Doğrusu: '+w.word);setTimeout(nx,800);}};
      document.getElementById('bsub').onclick=sub;
      document.getElementById('bi').onkeydown=e=>{if(e.key==='Enter')sub();};
      document.getElementById('bi').focus();
    }else{
      document.getElementById('bo').onclick=e=>{const b=e.target.closest('.qopt');if(!b)return;
        document.querySelectorAll('.qopt').forEach(x=>{x.disabled=true;if(x.dataset.w===ca)x.classList.add('ok');else if(x===b&&x.dataset.w!==ca)x.classList.add('no');});
        if(b.dataset.w===ca){sc+=30;addScore(30);}else resetStreak();
        setTimeout(nx,800);};
    }
  }nx();
}
