// === ADAM ASMACA ===
function play_hangman(){
  const w=getRandomWord();let guessed=[],wrong=0,mx=6,done=false;
  const render=()=>{
    const L=w.word.toUpperCase().split('');
    const wh=L.map(l=>`<div class="lslot ${guessed.includes(l)?'rev':''}">${guessed.includes(l)?l:''}</div>`).join('');
    const won=L.every(l=>guessed.includes(l)),lost=wrong>=mx;
    if(won&&!done){done=true;addScore(100-wrong*10);toast('🎉 Doğru! Türkçesi: '+w.tr);}
    if(lost&&!done){done=true;resetStreak();toast('💀 Kelime: '+w.word+' ('+w.tr+')');}
    const P=[
      `<circle cx="100" cy="50" r="20" fill="none" stroke="${wrong>0?'var(--danger)':'var(--surface)'}" stroke-width="3"/>`,
      `<line x1="100" y1="70" x2="100" y2="130" stroke="${wrong>1?'var(--danger)':'var(--surface)'}" stroke-width="3"/>`,
      `<line x1="100" y1="90" x2="70" y2="110" stroke="${wrong>2?'var(--danger)':'var(--surface)'}" stroke-width="3"/>`,
      `<line x1="100" y1="90" x2="130" y2="110" stroke="${wrong>3?'var(--danger)':'var(--surface)'}" stroke-width="3"/>`,
      `<line x1="100" y1="130" x2="75" y2="170" stroke="${wrong>4?'var(--danger)':'var(--surface)'}" stroke-width="3"/>`,
      `<line x1="100" y1="130" x2="125" y2="170" stroke="${wrong>5?'var(--danger)':'var(--surface)'}" stroke-width="3"/>`
    ].join('');
    const kb='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l=>{
      let c='kbtn';if(guessed.includes(l))c+=L.includes(l)?' ok':' no';
      return`<button class="${c}" ${guessed.includes(l)||done?'disabled':''} data-l="${l}">${l}</button>`;
    }).join('');
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">🎯 Adam Asmaca</div>
      <p class="card-s">📖 İpucu: ${w.defTr}</p>
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Yanlış</span><span class="v">${wrong}/${mx}</span></div>
        <div class="pill"><span class="l">Seviye</span><span class="v">${diffLabel(w.diff)}</span></div>
      </div></div>
      <svg class="hcanvas" viewBox="0 0 200 200">
        <line x1="40" y1="190" x2="160" y2="190" stroke="var(--border)" stroke-width="3"/>
        <line x1="60" y1="190" x2="60" y2="20" stroke="var(--border)" stroke-width="3"/>
        <line x1="60" y1="20" x2="100" y2="20" stroke="var(--border)" stroke-width="3"/>
        <line x1="100" y1="20" x2="100" y2="30" stroke="var(--border)" stroke-width="3"/>
        ${P}</svg>
      <div class="wdisp">${wh}</div>
      <div class="kb" id="hkb">${kb}</div>
      ${done?`<div class="btn-row" style="justify-content:center;margin-top:16px">
        <button class="btn btn-p" onclick="play_hangman()">Sonraki Kelime</button></div>`:''}</div>`;
    if(!done)document.getElementById('hkb').onclick=e=>{const l=e.target.dataset.l;if(!l||guessed.includes(l))return;guessed.push(l);if(!L.includes(l))wrong++;render();};
  };render();
}

// === HARF KARIŞTIR ===
function play_scramble(){
  const w=getRandomWord();const L=shuffleArray(w.word.toUpperCase().split(''));
  let sel=[];
  const render=()=>{
    const ah=sel.map((s,i)=>`<div class="tile sel" data-ri="${i}">${L[s]}</div>`).join('');
    const th=L.map((l,i)=>`<div class="tile ${sel.includes(i)?'lk':''}" data-i="${i}">${l}</div>`).join('');
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">🔀 Harf Karıştır</div>
      <p class="card-s">📖 ${w.defTr} <span class="tr-badge">${w.tr}</span></p>
      <div class="aarea" id="aa">${ah||'<span style="color:var(--text3)">Harflere tıklayarak kelimeyi oluştur</span>'}</div>
      <div class="stiles" id="st">${th}</div>
      <div class="btn-row" style="justify-content:center">
        <button class="btn btn-g btn-sm" onclick="play_scramble()">🔄 Yeni Kelime</button>
        ${sel.length?`<button class="btn btn-g btn-sm" id="clr">Temizle</button>`:''}
        ${sel.length===L.length?`<button class="btn btn-a btn-sm" id="chk">Kontrol Et ✓</button>`:''}
      </div></div>`;
    document.getElementById('st').onclick=e=>{const i=parseInt(e.target.dataset.i);if(isNaN(i)||sel.includes(i))return;sel.push(i);render();};
    document.getElementById('aa').onclick=e=>{const ri=parseInt(e.target.dataset.ri);if(isNaN(ri))return;sel.splice(ri,1);render();};
    const c=document.getElementById('clr');if(c)c.onclick=()=>{sel=[];render();};
    const k=document.getElementById('chk');if(k)k.onclick=()=>{
      if(sel.map(i=>L[i]).join('')===w.word.toUpperCase()){addScore(80);toast('🎉 Doğru!');setTimeout(play_scramble,1200);}
      else{resetStreak();toast('❌ Tekrar dene!');sel=[];render();}
    };
  };render();
}

// === ARI KOVANI ===
function play_bee(){
  const V='AEIOU',C='BCDFGHJKLMNPQRSTVWXYZ';
  const ctr=V[Math.floor(Math.random()*5)];
  let oth=shuffleArray(C.split('')).slice(0,4).concat(shuffleArray(V.replace(ctr,'').split('')).slice(0,2));
  const all=[ctr,...oth];let inp='',found=[],sc=0;
  const render=()=>{
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">🐝 Arı Kovanı</div>
      <p class="card-s">Bu harfleri kullanarak kelime yaz. Ortadaki harf zorunlu. En az 4 harf.</p>
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Puan</span><span class="v">${sc}</span></div>
        <div class="pill"><span class="l">Bulunan</span><span class="v">${found.length}</span></div>
      </div></div>
      <div style="text-align:center;margin:16px 0">
        <div class="inp" style="max-width:280px;margin:0 auto 14px;font-size:1.2rem;font-weight:700;letter-spacing:4px;min-height:46px;display:flex;align-items:center;justify-content:center">${inp||'<span style="color:var(--text3)">...</span>'}</div>
        <div class="honeycomb">${all.map((l,i)=>`<button class="hbtn ${i===0?'ctr':''}" data-l="${l}">${l}</button>`).join('')}</div>
        <div class="btn-row" style="justify-content:center;margin-top:14px">
          <button class="btn btn-g btn-sm" id="bd">⌫ Sil</button>
          <button class="btn btn-a btn-sm" id="bs">Gönder ✓</button>
          <button class="btn btn-g btn-sm" id="bsh">🔀 Karıştır</button>
        </div>
      </div>
      <div class="fwords">${found.map(w=>`<span class="fw">${w}</span>`).join('')}</div></div>`;
    document.querySelectorAll('.hbtn').forEach(b=>b.onclick=()=>{inp+=b.dataset.l;render();});
    document.getElementById('bd').onclick=()=>{inp=inp.slice(0,-1);render();};
    document.getElementById('bsh').onclick=()=>{oth=shuffleArray(oth);render();};
    document.getElementById('bs').onclick=()=>{
      const w=inp.toLowerCase();
      if(w.length<4){toast('En az 4 harf olmalı!');inp='';render();return;}
      if(!w.split('').every(c=>all.includes(c.toUpperCase()))){toast('Geçersiz harf!');inp='';render();return;}
      if(!w.includes(ctr.toLowerCase())){toast('Ortadaki harfi kullanmalısın!');inp='';render();return;}
      if(found.includes(w)){toast('Zaten bulundu!');inp='';render();return;}
      const db=WORD_DB.find(x=>x.word===w);
      if(db){found.push(w);const p=w.length*10;sc+=p;addScore(p);toast('✅ '+db.tr);inp='';render();}
      else{toast('Kelime listesinde yok!');inp='';render();}
    };
  };render();
}

// === KELİME TESTİ ===
function play_quiz(){
  let q=0,ok=0,tot=10,ans=false;
  const ws=getRandomWords(tot);
  const next=()=>{
    if(q>=tot){showResults(ok>=8?'🏆':ok>=5?'👏':'📖',ok>=8?'Mükemmel!':ok>=5?'İyi İş!':'Daha Çok Çalış!',ok+'/'+tot,`${ok} doğru cevap verdin!`,'quiz');return;}
    ans=false;const w=ws[q];
    let opts=[w];while(opts.length<4){const r=getRandomWord();if(!opts.find(o=>o.word===r.word))opts.push(r);}
    opts=shuffleArray(opts);
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">📚 Kelime Testi</div>
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Soru</span><span class="v">${q+1}/${tot}</span></div>
        <div class="pill"><span class="l">Doğru</span><span class="v">${ok}</span></div>
      </div></div>
      <div class="qdef">📖 ${w.defTr}<br><small style="color:var(--text3)">${w.def}</small></div>
      <div class="qopts" id="qo">${opts.map(o=>`<button class="qopt" data-w="${o.word}">${o.word} <span class="tr-badge">${o.tr}</span></button>`).join('')}</div></div>`;
    document.getElementById('qo').onclick=e=>{
      const b=e.target.closest('.qopt');if(!b||ans)return;ans=true;
      document.querySelectorAll('.qopt').forEach(x=>{x.disabled=true;if(x.dataset.w===w.word)x.classList.add('ok');else if(x===b)x.classList.add('no');});
      if(b.dataset.w===w.word){ok++;addScore(50);}else resetStreak();
      q++;setTimeout(next,1200);
    };
  };next();
}

// === KELİME ZİNCİRİ ===
function play_chain(){
  let chain=[],sc=0,tl=60,done=false;
  chain.push(getRandomWord().word.toUpperCase());
  const tick=()=>{if(done)return;tl--;if(tl<=0){done=true;clearInterval(gameTimer);showResults(chain.length>=8?'🏆':'⛓️','Zincir Tamamlandı!',sc+' puan',`Zincir uzunluğu: ${chain.length} kelime`,'chain');return;}rc();};
  gameTimer=setInterval(tick,1000);
  function rc(){
    const last=chain[chain.length-1],lc=last[last.length-1];
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">⛓️ Kelime Zinciri</div>
      <p class="card-s">Önceki kelimenin son harfiyle başlayan yeni bir kelime yaz</p>
      ${timerBar(tl/60*100)}
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Süre</span><span class="v">${tl}s</span></div>
        <div class="pill"><span class="l">Zincir</span><span class="v">${chain.length}</span></div>
        <div class="pill"><span class="l">Puan</span><span class="v">${sc}</span></div>
      </div></div>
      <ul class="clist">${chain.map((w,i)=>`<li class="citem"><span class="n">#${i+1}</span><span class="w">${w}</span></li>`).join('')}</ul>
      <div style="display:flex;gap:8px;margin-top:10px">
        <input class="inp" id="ci" placeholder="'${lc}' harfiyle başlayan kelime..." autofocus>
        <button class="btn btn-p" id="cs">Gönder</button>
      </div></div>`;
    const sub=()=>{const v=document.getElementById('ci').value.trim().toUpperCase();
      if(!v)return;if(v[0]!==lc){toast("'"+lc+"' harfiyle başlamalı!");return;}
      if(v.length<3){toast('En az 3 harf!');return;}if(chain.includes(v)){toast('Bu kelime kullanıldı!');return;}
      chain.push(v);sc+=v.length*10;addScore(v.length*5);rc();};
    document.getElementById('cs').onclick=sub;
    document.getElementById('ci').onkeydown=e=>{if(e.key==='Enter')sub();};
    document.getElementById('ci').focus();
  }rc();
}

// === HIZLI YAZMA ===
function play_speed(){
  let ws=getRandomWords(20),wi=0,typed='',ok=0,tot=0,tl=30,started=false,done=false;
  const tick=()=>{if(done)return;tl--;if(tl<=0){done=true;clearInterval(gameTimer);
    const wpm=Math.round(ok/(30/60));
    showResults(wpm>=15?'🏆':wpm>=8?'⚡':'📝',wpm>=15?'Süper Hızlı!':wpm>=8?'İyi!':'Pratik Yap!',wpm+' KPD',`${ok} kelime doğru yazıldı`,'speed');return;}rs();};
  function rs(){
    const cur=ws[wi]?ws[wi].word.toLowerCase():'';
    let d='';for(let i=0;i<cur.length;i++){
      if(i<typed.length)d+=typed[i]===cur[i]?`<span class="cc">${cur[i]}</span>`:`<span class="cw">${cur[i]}</span>`;
      else if(i===typed.length)d+=`<span class="cu">${cur[i]}</span>`;else d+=cur[i];}
    const trWord=ws[wi]?ws[wi].tr:'';
    document.getElementById('gameArea').innerHTML=`<div class="card">
      <div class="card-t">⚡ Hızlı Yazma</div>
      ${timerBar(tl/30*100)}
      <div class="gh"><div class="gi">
        <div class="pill"><span class="l">Süre</span><span class="v">${tl}s</span></div>
        <div class="pill"><span class="l">Doğru</span><span class="v">${ok}</span></div>
      </div></div>
      <div style="text-align:center;margin-bottom:6px;color:var(--text3);font-size:.82rem">Türkçesi: <strong style="color:var(--primary2)">${trWord}</strong></div>
      <div class="sword">${d}</div>
      <input class="inp" id="si" placeholder="Kelimeyi yaz..." autofocus style="max-width:380px;margin:0 auto;display:block;text-align:center;font-size:1.1rem">
      <div class="sstats">
        <div class="sstat"><div class="n">${ok}</div><div class="lb">Doğru</div></div>
        <div class="sstat"><div class="n">${tot}</div><div class="lb">Toplam</div></div>
        <div class="sstat"><div class="n">${tot?Math.round(ok/tot*100):0}%</div><div class="lb">Doğruluk</div></div>
      </div></div>`;
    const inp=document.getElementById('si');inp.focus();
    inp.oninput=()=>{if(!started){started=true;gameTimer=setInterval(tick,1000);}typed=inp.value;
      if(typed===cur){ok++;tot++;addScore(20);wi++;if(wi>=ws.length)ws=ws.concat(getRandomWords(10));typed='';inp.value='';rs();}};
    inp.onkeydown=e=>{if(e.key===' '){e.preventDefault();tot++;typed='';inp.value='';wi++;rs();}};
  }rs();
}
