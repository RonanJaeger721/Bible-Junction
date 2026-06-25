const products = [
  {
    name: "KJV My Creative Illustrator",
    translation: "King James Version",
    price: "US$70.00",
    was: "US$80.00",
    image: "assets/kjv-creative-illustrator.jpg",
  },
  {
    name: "KJV Life Recovery",
    translation: "King James Version",
    price: "US$80.00",
    image: "assets/kjv-life-recovery.jpg",
  },
  {
    name: "KJV Thinline Large Print",
    translation: "King James Version",
    price: "US$40.00",
    image: "assets/kjv-thinline-large-print.jpg",
  },
  {
    name: "NLT Daily Walk",
    translation: "New Living Translation",
    price: "US$35.00",
    image: "assets/nlt-daily-walk.jpg",
  },
  {
    name: "NLT Every Woman's Bible",
    translation: "New Living Translation",
    price: "US$110.00",
    image: "assets/nlt-every-womans-bible.jpg",
  },
  {
    name: "NLT Girls Life Application",
    translation: "Children's Collection",
    price: "US$50.00",
    image: "assets/nlt-girls-life-application.jpg",
  },
  {
    name: "ESV Journaling - Writer's Edition",
    translation: "English Standard Version",
    price: "US$50.00",
    was: "US$60.00",
    image: "assets/esv-journaling-writers-edition.jpg",
  },
  {
    name: "ESV Global Impact Bible",
    translation: "English Standard Version",
    price: "US$30.00",
    was: "US$60.00",
    image: "assets/esv-global-impact.jpg",
  },
  {
    name: "ESV Standard Leather",
    translation: "English Standard Version",
    price: "US$25.00",
    image: "assets/esv-standard-leather.jpg",
  },
  {
    name: "NKJV A Woman After God's Own Heart",
    translation: "New King James Version",
    price: "US$120.00",
    image: "assets/nkjv-woman-after-gods-heart.jpg",
  },
  {
    name: "NKJV Study Leather",
    translation: "New King James Version",
    price: "US$120.00",
    image: "assets/nkjv-study-leather.jpg",
  },
  {
    name: "NKJV Giant Print",
    translation: "New King James Version",
    price: "US$70.00",
    image: "assets/nkjv-giant-print.jpg",
  },
];

const collectionItems = [
  { name: "NRSV Children's Bible", image: "assets/nrsv-childrens-bible.jpg" },
  { name: "Amplified Study Leather", image: "assets/amplified-study-leather.jpg" },
  { name: "CSB Explorer for Kids", image: "assets/csb-explorer-for-kids.jpg" },
  { name: "NIV Thinline Reference", image: "assets/niv-thinline-reference.jpg" },
  { name: "KJV My Promise", image: "assets/kjv-my-promise.jpg" },
  { name: "NLT Boys Life Application", image: "assets/nlt-boys-life-application.jpg" },
];

const productGrid = document.querySelector("#productGrid");
const collectionRow = document.querySelector("#collectionRow");
const filterBar = document.querySelector("#filterBar");
const header = document.querySelector("[data-elevate]");
let activeFilter = "All";

function createProductCard(product, index) {
  const article = document.createElement("article");
  article.className = `product-card reveal delay-${index % 3 === 0 ? 1 : 0}`;
  article.innerHTML = `
    <div>
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <span class="tag">${product.translation}</span>
      <h3>${product.name}</h3>
    </div>
    <div class="price-row">
      <span class="price">${product.price}</span>
      ${product.was ? `<span class="was">${product.was}</span>` : ""}
    </div>
  `;
  return article;
}

function wireProductTilt(card) {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(max-width: 820px)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", `${x * 5}deg`);
    card.style.setProperty("--rx", `${y * -5}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  });
}

function createCollectionTile(item) {
  const tile = document.createElement("article");
  tile.className = "collection-tile";
  tile.innerHTML = `
    <img src="${item.image}" alt="${item.name}" loading="lazy" />
    <span>${item.name}</span>
  `;
  return tile;
}

function renderProducts() {
  productGrid.style.opacity = "0";

  window.setTimeout(() => {
    productGrid.innerHTML = "";
    const visibleProducts =
      activeFilter === "All" ? products : products.filter((product) => product.translation === activeFilter);

    visibleProducts.forEach((product, index) => {
      const card = createProductCard(product, index);
      productGrid.append(card);
      revealObserver.observe(card);
      wireProductTilt(card);
      window.setTimeout(() => card.classList.add("in-view"), 40 + index * 35);
    });

    productGrid.style.opacity = "1";
  }, 140);
}

function renderFilters() {
  const filters = ["All", ...new Set(products.map((product) => product.translation))];
  filterBar.innerHTML = "";

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.className = `filter-chip${filter === activeFilter ? " is-active" : ""}`;
    button.type = "button";
    button.textContent = filter;
    button.setAttribute("aria-pressed", filter === activeFilter ? "true" : "false");
    button.addEventListener("click", () => {
      activeFilter = filter;
      document.querySelectorAll(".filter-chip").forEach((chip) => {
        const isActive = chip.textContent === activeFilter;
        chip.classList.toggle("is-active", isActive);
        chip.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      renderProducts();
    });
    filterBar.append(button);
  });
}

collectionItems.forEach((item) => {
  collectionRow.append(createCollectionTile(item));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("in-view", entry.isIntersecting);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
renderFilters();
renderProducts();

function elevateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

elevateHeader();
window.addEventListener("scroll", elevateHeader, { passive: true });

window.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;
  document.documentElement.style.setProperty("--tilt-x", `${x}px`);
  document.documentElement.style.setProperty("--tilt-y", `${y}px`);
});
