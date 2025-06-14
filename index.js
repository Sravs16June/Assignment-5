document.addEventListener('DOMContentLoaded', () => {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(({ products }) => {
      const grid = document.getElementById('box');
      grid.innerHTML = products.map(p => {
        const cover = (p.images && p.images[0]) || p.thumbnail || '';
        const payload = JSON.stringify(p).replace(/'/g, "&apos;");
        return `
          <div class="card" data-product='${payload}'>
            <img src="${cover}" alt="${p.title}">
            <div class="card-body">
              <h2>${p.title}</h2>
              <p class="price">₹${p.price} ${p.discountPercentage ? `<small>(-${p.discountPercentage}%)</small>` : ''}</p>
              <p class="rating"><strong>Rating:</strong> ${p.rating} ⭐</p>
              <p><strong>Brand:</strong> ${p.brand}</p>
              <p><strong>Category:</strong> ${p.category}</p>
              ${p.tags ? `<p><strong>Tags:</strong> ${p.tags.join(', ')}</p>` : ''}
              <p><strong>Stock:</strong> ${p.stock}</p>
            </div>
          </div>`;
      }).join('');
    });

  document.getElementById('box').addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    localStorage.setItem('selectedProduct', card.dataset.product);
    window.location.href = 'details.html';
  });
});
