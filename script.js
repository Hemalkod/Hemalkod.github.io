fetch('articles.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Chyba při načítání článků');
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('articles');

    function stripHTML(html) {
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    }

    data.reverse();

    data.forEach((article, index) => {
      const link = document.createElement('a');
      link.href = `article.html?id=${article.id}`;

      const h2 = document.createElement('h2');
      h2.textContent = article.title;
      link.appendChild(h2);

      const p = document.createElement('p');
      p.textContent = stripHTML(article.content).substring(0, 100) + '...';
      link.appendChild(p);

      // Pokud je to hlavní článek, přidáme třídu a obrázek
      if (index === 0) {
        link.classList.add('featured-article');

        const img = document.createElement('img');
        img.src = 'https://i.imgur.com/lzSmmbp.png'; // <- sem dávej vlastní URL obrázku
        img.alt = 'Titulní obrázek';
        img.style.marginTop = '15px';
        img.style.width = '100%';
        img.style.borderRadius = '8px';
        link.appendChild(img);
      } else {
        link.classList.add('article');
      }

      container.appendChild(link);
    });
  })
  .catch(error => {
    console.error('Chyba při načítání článků:', error);
    document.getElementById('articles').innerHTML = '<p>Nelze načíst články.</p>';
  });
