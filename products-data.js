/* =========================================================
   MaxproHealth - Products Data
   File: products-data.js

   Purpose:
   - Defines the product categories
   - Loads live products from /api/products (server-side, private sheet)
   - Renders the category tabs and product cards

   IMPORTANT:
   - Affiliate links are NOT in this file and are NOT sent to the browser.
     Product buttons point to /products/<name>, which redirects
     server-side to the real affiliate link.
   - products.html provides <div id="productContent"></div> and the styles.
   - To add a product, add a row (status = live) in the Google Sheet.
   - To add a category, add it to the list below.
========================================================= */

window.maxprohealthProducts = {
  title: "Explore Our Product Categories",
  description: "",
  categories: [
    { id: "blood-sugar-metabolic-health", title: "Blood Sugar & Metabolic Health", products: [] },
    { id: "weight-management", title: "Weight Management", products: [] },
    { id: "heart-cardiovascular-health", title: "Heart & Cardiovascular Health", products: [] },
    { id: "digestive-health", title: "Digestive Health", products: [] },
    { id: "joint-mobility", title: "Joint & Mobility", products: [] },
    { id: "nutrition-supplements", title: "Nutrition & Supplements", products: [] },
    { id: "sleep-stress", title: "Sleep & Stress", products: [] },
    { id: "mens-health", title: "Men's Health", products: [] },
    { id: "womens-health", title: "Women's Health", products: [] },
    { id: "fitness-performance", title: "Fitness & Performance", products: [] },
    { id: "skin-beauty", title: "Skin & Beauty", products: [] },
    { id: "general-wellness", title: "General Wellness", products: [] }
  ]
};


/* =========================================================
   RENDERER
========================================================= */

(function () {
  "use strict";

  var MOUNT_ID = "productContent";
  var API_URL = "/api/products";
  var EMPTY_BUTTON_LABEL = "Coming Soon";

  /* ---------- Helpers ---------- */

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[c];
    });
  }

  function norm(s) {
    return String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  // Only same-site product links (/products/...) are accepted
  function safeUrl(url) {
    if (!url || !String(url).trim()) return "";

    try {
      var u = new URL(url, window.location.href);
      return u.origin === window.location.origin && u.pathname.indexOf("/products/") === 0
        ? u.href
        : "";
    } catch (e) {
      return "";
    }
  }

  /* ---------- Merge live products into categories ---------- */

  function mergeProducts(d, list) {
    var cats = d.categories.map(function (c) {
      return {
        id: c.id,
        title: c.title,
        products: (Array.isArray(c.products) ? c.products : []).slice()
      };
    });

    list.forEach(function (p, i) {
      if (!p || !p.name || !p.slug) return;

      var target = null;

      cats.forEach(function (c) {
        if (norm(c.title) === norm(p.category)) target = c;
      });

      if (!target) {
        console.warn("products-data.js: category not found for \"" + p.name + "\": " + p.category);
        return;
      }

      target.products.push({
        id: "live-" + i,
        name: String(p.name),
        description: String(p.description || ""),
        cta: "Click Here",
        affiliate_url: "/products/" + encodeURIComponent(String(p.slug))
      });
    });

    return {
      title: d.title,
      description: d.description,
      categories: cats
    };
  }

  function loadProducts(done) {
    if (typeof fetch !== "function") return;

    fetch(API_URL, { headers: { "Accept": "application/json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("Products unavailable (" + res.status + ")");
        return res.json();
      })
      .then(function (data) {
        if (data && Array.isArray(data.products)) done(data.products);
      })
      .catch(function (e) {
        console.warn("products-data.js: products not loaded.", e);
      });
  }

  /* ---------- Templates ---------- */

  function validItems(c) {
    return Array.isArray(c.products)
      ? c.products.filter(function (p) { return p && p.name; })
      : [];
  }

  function card(p) {
    var url = safeUrl(p.affiliate_url);

    var btn = url
      ? '<a class="pt-btn" href="' + esc(url) +
        '" target="_blank" rel="sponsored nofollow noopener noreferrer">' +
        esc(p.cta || "Click Here") + "</a>"
      : '<span class="pt-btn off" aria-disabled="true">' +
        esc(EMPTY_BUTTON_LABEL) + "</span>";

    return (
      '<article class="pt-card">' +
      "<h4>" + esc(p.name) + "</h4>" +
      (p.description ? "<p>" + esc(p.description) + "</p>" : "") +
      btn +
      "</article>"
    );
  }

  function category(c) {
    var items = validItems(c);
    if (!items.length) return "";

    return (
      '<div class="pt-cat" id="' + esc(c.id) + '">' +
      "<h3>" + esc(c.title) + "</h3>" +
      '<div class="pt-grid">' + items.map(card).join("") + "</div>" +
      "</div>"
    );
  }

  function draw(mount, d) {
    var active = d.categories.filter(function (c) {
      return validItems(c).length > 0;
    });

    var nav = active.map(function (c) {
      return '<a href="#' + esc(c.id) + '">' + esc(c.title) + "</a>";
    }).join("");

    mount.innerHTML =
      '<section class="pt">' +
      '<div class="pt-head"><h2>' + esc(d.title) + "</h2>" +
      (d.description ? "<p>" + esc(d.description) + "</p>" : "") +
      "</div>" +
      (nav ? '<nav class="pt-nav" aria-label="Product categories">' + nav + "</nav>" : "") +
      '<div class="pt-categories">' + active.map(category).join("") + "</div>" +
      "</section>";
  }

  /* ---------- Init ---------- */

  function init() {
    var mount = document.getElementById(MOUNT_ID);

    if (!mount) {
      console.error('products-data.js: <div id="' + MOUNT_ID + '"> not found.');
      return;
    }

    var d = window.maxprohealthProducts;

    if (!d || !Array.isArray(d.categories)) {
      mount.innerHTML = '<section class="pt"><p class="pt-error">Products could not be loaded.</p></section>';
      return;
    }

    loadProducts(function (list) {
      draw(mount, mergeProducts(d, list));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
