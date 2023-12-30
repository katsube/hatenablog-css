//----------------------------------------
// 404
//----------------------------------------
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.querySelector('#main-inner').getElementsByClassName('no-entry').length === 0){
    return;
  }

  const entryContent = document.querySelector('.entry-content');
  if(!entryContent){
    return;
  }

  //----------------------------------------
  // リダイレクト
  //----------------------------------------
  const path = location.pathname;
  const showMessage = ()=>{
    const h1  = entryContent.querySelector('h1');
    const h1p = entryContent.querySelector('p');
    h1.textContent = 'このページは移動しました'
    h1p.textContent = '自動的に移動します。しばらくお待ちください。';
  };

  //---------------------
  // WordPress
  //---------------------
  // /tag/xxx -> /archive/category/xxx
  if(path.match(/^\/tag\/.+/)){
    showMessage();
    const tag = path.replace(/^\/tag\//, '');
    location.href = `/archive/category/${tag}`;
    return;
  }
  // /20xx -> /archive/20xx
  else if(path.match(/^\/20\d{2}$/)){
    showMessage();
    const year = path.replace(/^\//, '');
    location.href = `/archive/${year}`;
    return;
  }
  // /20xx/xx -> /archive/20xx/xx
  else if(path.match(/^\/20\d{2}\/\d{2}$/)){
    showMessage();
    const year_month = path.replace(/^\//, '');
    location.href = `/archive/${year_month}`;
    return;
  }
  //---------------------
  // 静的ページ
  //---------------------
  // /static/〜 -> https://static.blog.katsubemakito.net/〜
  else if(path.match(/^\/static\/.+/)){
    showMessage();
    const static_path = path.replace(/^\/static\//, '');
    location.href = `https://static.blog.katsubemakito.net/${static_path}`;
    return;
  }


  //----------------------------------------
  // 404表示
  //----------------------------------------
  const h2 = document.createElement('h2');
  h2.appendChild(document.createTextNode('最近アクセス数の多い記事'));
  h2.setAttribute('style', 'font-size:1.2em;');
  entryContent.appendChild(h2);

  const hatena_module = document.createElement('div');
  hatena_module.setAttribute('class', 'hatena-module hatena-module-entries-access-ranking');
  hatena_module.setAttribute('data-count', '10');
  hatena_module.setAttribute('data-display_entry_category', '1');
  hatena_module.setAttribute('data-display_entry_image', '1');
  hatena_module.setAttribute('data-display_entry_image_size_width', '150');
  hatena_module.setAttribute('data-display_entry_image_size_height', '150');
  hatena_module.setAttribute('data-display_entry_body_length', '0');
  hatena_module.setAttribute('data-display_entry_date', '1');
  hatena_module.setAttribute('data-display_bookmark_count', '0');
  hatena_module.setAttribute('data-source', 'access');

  const hatena_module_body = document.createElement('div');
  hatena_module_body.setAttribute('class', 'hatena-module-body');
  hatena_module.appendChild(hatena_module_body);
  entryContent.appendChild(hatena_module);
});
