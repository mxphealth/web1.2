/* =========================================================
   MaxproHealth - Products Data
   File: products-data.js

   Purpose:
   - Dynamic middle product-category tray
   - Product listings
   - Private affiliate URLs for CTA buttons
   - Display logic (renderer at the bottom of this file)

   IMPORTANT:
   - Affiliate network information is NOT displayed.
   - Affiliate URLs are NOT displayed.
   - products.html only loads this file and provides the empty
     <div id="productContent"></div>. It has no display rules.
   - Future product additions should be made here,
     without changing the main products.html page.

   GOOGLE SHEET (mxpHealth-products):
   - Rows with status = live are loaded from the published sheet
     (SHEET_CSV_URL in the renderer) and shown automatically.
   - Each row fills the first empty placeholder of the category
     whose title matches the sheet's "category" column.
   - If the sheet cannot be loaded, the data below is shown as before.
========================================================= */

window.maxprohealthProducts = {
  title: "Explore Our Product Categories",

  description: "",

  categories: [
    {
      id: "blood-sugar-metabolic-health",
      title: "Blood Sugar & Metabolic Health",
      products: [
        {
          id: "blood-sugar-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "blood-sugar-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "blood-sugar-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "blood-sugar-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "weight-management",
      title: "Weight Management",
      products: [
        {
          id: "weight-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "weight-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "weight-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "weight-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "heart-cardiovascular-health",
      title: "Heart & Cardiovascular Health",
      products: [
        {
          id: "heart-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "heart-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "heart-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "heart-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "digestive-health",
      title: "Digestive Health",
      products: [
        {
          id: "digestive-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "digestive-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "digestive-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "digestive-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "joint-mobility",
      title: "Joint & Mobility",
      products: [
        {
          id: "joint-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "joint-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "joint-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "joint-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "nutrition-supplements",
      title: "Nutrition & Supplements",
      products: [
        {
          id: "nutrition-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "nutrition-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "nutrition-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "nutrition-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "sleep-stress",
      title: "Sleep & Stress",
      products: [
        {
          id: "sleep-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "sleep-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "sleep-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "sleep-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "mens-health",
      title: "Men's Health",
      products: [
        {
          id: "mens-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "mens-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "mens-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "mens-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "womens-health",
      title: "Women's Health",
      products: [
        {
          id: "womens-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "womens-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "womens-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "womens-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "fitness-performance",
      title: "Fitness & Performance",
      products: [
        {
          id: "fitness-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "fitness-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "fitness-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "fitness-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "skin-beauty",
      title: "Skin & Beauty",
      products: [
        {
          id: "beauty-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "beauty-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "beauty-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "beauty-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    },

    {
      id: "general-wellness",
      title: "General Wellness",
      products: [
        {
          id: "wellness-001",
          name: "Product 001",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "wellness-002",
          name: "Product 002",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "wellness-003",
          name: "Product 003",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        },
        {
          id: "wellness-004",
          name: "Product 004",
          description: "",
          cta: "Click Here",
          affiliate_url: ""
        }
      ]
    }
  ]
};





/* =========================================================
   RENDERER
   Controls how the categories and products are displayed.
   Finds <div id="productContent"> in products.html and fills it.
   Edit only below this line to change the look or behavior.
========================================================= */

(function () {
  "use strict";

  var MOUNT_ID = "productContent";
  var EMPTY_BUTTON_LABEL = "Coming Soon";

  // Published Google Sheet (tab "products") as CSV
  var SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQd5A8sZ0ttf4fB--kQLbqJMK8ZJGIH4aPFpMoKY56Kqq8nZImezdkQppmHPlQT69jLDB8iFl6c5Tt3/pub?gid=0&single=true&output=csv";

  /* ---------- Styles (injected by this file) ---------- */

  var css = `
    .pt{
      width:min(1200px,calc(100% - 32px));
      margin:0 auto;
      padding:10px 0 0;
    }

    .pt-head{
      text-align:center;
      max-width:760px;
      margin:0 auto 22px;
    }

    .pt-head h2{
      margin:0 0 10px;
      font-size:clamp(1.5rem,4vw,2.1rem);
      line-height:1.2;
      letter-spacing:-0.03em;
    }

    .pt-head p{
      margin:0;
      color:var(--muted,#64736c);
    }

    /* ---- Category tabs: centered block, 4 per row ----
       Flex (not grid) so an incomplete last row stays centered.
       Only categories that hold valid items are rendered. */
    .pt-nav{
      display:flex;
      flex-wrap:wrap;
      justify-content:center;
      gap:10px;
      max-width:900px;
      margin:0 auto 30px;
      padding:0;
    }

    .pt-nav a{
      box-sizing:border-box;
      flex:0 0 calc((100% - 30px) / 4);
      display:flex;
      align-items:center;
      justify-content:center;
      min-height:46px;
      padding:8px 12px;
      border:1px solid var(--border,#dfe9e4);
      border-radius:999px;
      background:var(--surface,#f3f7f5);
      color:var(--text,#26352f);
      text-decoration:none;
      text-align:center;
      font-size:.85rem;
      font-weight:600;
      line-height:1.25;
      transition:
        background .2s ease,
        border-color .2s ease,
        color .2s ease,
        transform .2s ease;
    }

    .pt-nav a:hover{
      background:var(--accent,#16845b);
      border-color:var(--accent,#16845b);
      color:#fff;
      transform:translateY(-1px);
    }

    .pt-categories{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:24px;
      align-items:start;
    }

    .pt-cat{
      margin:0;
      padding:22px;
      background:var(--surface,#f3f7f5);
      border:1px solid var(--border,#dfe9e4);
      border-radius:18px;
      scroll-margin-top:100px;
    }

    .pt-cat h3{
      margin:0 0 18px;
      padding-bottom:12px;
      text-align:left;
      font-size:1.18rem;
      line-height:1.3;
      letter-spacing:-0.02em;
      border-bottom:1px solid var(--border,#dfe9e4);
    }

    .pt-grid{
      display:grid;
      grid-template-columns:repeat(2,minmax(0,1fr));
      gap:14px;
    }

    .pt-card{
      display:flex;
      flex-direction:column;
      gap:10px;
      min-width:0;
      padding:16px;
      background:var(--background,#fff);
      border:1px solid var(--border,#dfe9e4);
      border-radius:14px;
      transition:
        transform .2s ease,
        box-shadow .2s ease,
        border-color .2s ease;
    }

    .pt-card:hover{
      transform:translateY(-2px);
      box-shadow:0 8px 22px rgba(0,0,0,.07);
      border-color:var(--accent,#16845b);
    }

    .pt-card h4{
      margin:0;
      font-size:1rem;
      line-height:1.35;
    }

    .pt-card p{
      margin:0;
      font-size:.9rem;
      line-height:1.55;
      color:var(--muted,#64736c);
    }

    .pt-btn{
      display:block;
      width:100%;
      margin-top:auto;
      padding:10px 14px;
      text-align:center;
      text-decoration:none;
      font-size:.88rem;
      font-weight:700;
      color:#fff;
      background:var(--accent,#16845b);
      border-radius:10px;
      transition:
        background .2s ease,
        transform .2s ease;
    }

    .pt-btn:hover{
      background:var(--accent-dark,#0d6846);
      transform:translateY(-1px);
    }

    .pt-btn.off{
      background:var(--border,#dfe9e4);
      color:var(--muted,#64736c);
      cursor:not-allowed;
    }

    .pt-error{
      text-align:center;
      color:var(--muted,#64736c);
    }

    /* Tablet: 3 tabs per row */
    @media (max-width:900px){
      .pt-categories{
        grid-template-columns:1fr;
      }

      .pt-nav a{
        flex:0 0 calc((100% - 20px) / 3);
      }
    }

    /* Mobile: 2 tabs per row */
    @media (max-width:600px){
      .pt{
        width:min(100% - 20px,1200px);
      }

      .pt-nav{
        gap:8px;
      }

      .pt-nav a{
        flex:0 0 calc((100% - 8px) / 2);
        min-height:44px;
        padding:8px 10px;
        font-size:.82rem;
      }

      .pt-cat{
        padding:18px;
      }

      .pt-grid{
        grid-template-columns:1fr;
      }
    }

    @media (prefers-reduced-motion:reduce){
      .pt-nav a,
      .pt-card,
      .pt-btn{
        transition:none;
      }

      html{
        scroll-behavior:auto;
      }
    }
  `;

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

  // Returns a valid http(s) URL, or "" (empty/invalid becomes a disabled button)
  function safeUrl(url) {
    if (!url || !String(url).trim()) return "";

    try {
      var u = new URL(url, window.location.href);
      return (u.protocol === "https:" || u.protocol === "http:")
        ? u.href
        : "";
    } catch (e) {
      return "";
    }
  }

  /* ---------- Google Sheet loading ---------- */

  // Reads CSV text into an array of objects keyed by the header row
  function parseCSV(text) {
    var rows = [], row = [], field = "", quoted = false, i, ch;

    text = String(text || "").replace(/^\uFEFF/, "");

    for (i = 0; i < text.length; i++) {
      ch = text[i];

      if (quoted) {
        if (ch === '"') {
          if (text[i + 1] === '"') {
            field += '"';
            i++;
          } else {
            quoted = false;
          }
        } else {
          field += ch;
        }
      } else if (ch === '"') {
        quoted = true;
      } else if (ch === ",") {
        row.push(field);
        field = "";
      } else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;

        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else {
        field += ch;
      }
    }

    if (field !== "" || row.length) {
      row.push(field);
      rows.push(row);
    }

    rows = rows.filter(function (r) {
      return r.some(function (x) {
        return String(x).trim() !== "";
      });
    });

    if (!rows.length) return [];

    var head = rows[0].map(function (h) {
      return String(h).trim().toLowerCase();
    });

    return rows.slice(1).map(function (r) {
      var o = {};

      head.forEach(function (h, k) {
        o[h] = r[k] == null ? "" : String(r[k]).trim();
      });

      return o;
    });
  }

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  // Makes a clean address part from a product name:
  // "The Encyclopedia of Power Foods (E-book)" -> "the-encyclopedia-of-power-foods-e-book"
  // (go.html uses the same rule to find the product again)
  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/\u00df/g, "ss")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Returns a copy of the data with the live sheet rows added.
  // Each row takes the first empty placeholder of its category,
  // or is added at the end if no empty placeholder is left.
  function mergeSheet(d, rows) {
    var cats = d.categories.map(function (c) {
      return {
        id: c.id,
        title: c.title,
        products: (Array.isArray(c.products) ? c.products : []).slice()
      };
    });

    rows.forEach(function (r, i) {
      if (norm(r.status) !== "live") return;
      if (!r.name) return;

      var target = null;

      cats.forEach(function (c) {
        if (norm(c.title) === norm(r.category)) {
          target = c;
        }
      });

      if (!target) {
        console.warn(
          'products-data.js: category not found for "' +
          r.name +
          '": ' +
          r.category
        );
        return;
      }

      // The button points to our own clean address (/products/name).
      // go.html forwards the visitor to the real affiliate link.
      var realUrl = safeUrl(r.affiliate_link);
      var slug = slugify(r.name);

      var item = {
        id: "sheet-" + (i + 2),
        name: r.name,
        description: r.description || "",
        cta: "Click Here",
        affiliate_url: realUrl
          ? (slug
              ? window.location.origin + "/products/" + slug
              : realUrl)
          : "",
        fromSheet: true
      };

      var slot = -1, k, p;

      for (k = 0; k < target.products.length; k++) {
        p = target.products[k];

        if (
          !p.fromSheet &&
          !p.affiliate_url &&
          !p.description
        ) {
          slot = k;
          break;
        }
      }

      if (slot >= 0) {
        target.products[slot] = item;
      } else {
        target.products.push(item);
      }
    });

    return {
      title: d.title,
      description: d.description,
      categories: cats
    };
  }

  function loadSheet(done) {
    if (!SHEET_CSV_URL || typeof fetch !== "function") return;

    fetch(SHEET_CSV_URL, {
      cache: "no-store"
    })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("Sheet unavailable (" + res.status + ")");
        }

        return res.text();
      })
      .then(function (text) {
        done(parseCSV(text));
      })
      .catch(function (e) {
        console.warn(
          "products-data.js: sheet not loaded, showing built-in products.",
          e
        );
      });
  }

  /* ---------- Templates ---------- */

  // A product is "valid" when it is a real listing, not an empty placeholder
  function isValidProduct(p) {
    return !!(
      p &&
      (
        p.fromSheet ||
        p.affiliate_url ||
        p.description ||
        !/^Product\s+\d+$/i.test(String(p.name || "").trim())
      )
    );
  }

  // Only the valid products of a category
  function validItems(c) {
    return Array.isArray(c.products)
      ? c.products.filter(isValidProduct)
      : [];
  }

  function card(p) {
    var url = safeUrl(p.affiliate_url);

    var btn = url
      ? '<a class="pt-btn" href="' +
        esc(url) +
        '" target="_blank" rel="sponsored nofollow noopener noreferrer">' +
        esc(p.cta || "Click Here") +
        "</a>"
      : '<span class="pt-btn off" aria-disabled="true">' +
        esc(EMPTY_BUTTON_LABEL) +
        "</span>";

    return (
      '<article class="pt-card">' +
      "<h4>" +
      esc(p.name) +
      "</h4>" +
      (p.description
        ? "<p>" + esc(p.description) + "</p>"
        : "") +
      btn +
      "</article>"
    );
  }

  function category(c) {
    var items = validItems(c);

    if (!items.length) return "";

    return (
      '<div class="pt-cat" id="' +
      esc(c.id) +
      '">' +
      "<h3>" +
      esc(c.title) +
      "</h3>" +
      '<div class="pt-grid">' +
      items.map(card).join("") +
      "</div>" +
      "</div>"
    );
  }

  function draw(mount, d) {
    // Categories without valid items are not shown (neither tab nor section)
    var activeCategories = d.categories.filter(function (c) {
      return validItems(c).length > 0;
    });

    var nav = activeCategories
      .map(function (c) {
        return (
          '<a href="#' +
          esc(c.id) +
          '">' +
          esc(c.title) +
          "</a>"
        );
      })
      .join("");

    var categories = activeCategories
      .map(category)
      .join("");

    mount.innerHTML =
      '<section class="pt">' +
      '<div class="pt-head">' +
      "<h2>" +
      esc(d.title) +
      "</h2>" +
      (d.description
        ? "<p>" + esc(d.description) + "</p>"
        : "") +
      "</div>" +
      (nav
        ? '<nav class="pt-nav" aria-label="Product categories">' +
          nav +
          "</nav>"
        : "") +
      '<div class="pt-categories">' +
      categories +
      "</div>" +
      "</section>";
  }

  /* ---------- Init ---------- */

  function init() {
    var mount = document.getElementById(MOUNT_ID);

    if (!mount) {
      console.error(
        'products-data.js: <div id="' +
        MOUNT_ID +
        '"> not found.'
      );
      return;
    }

    var d = window.maxprohealthProducts;

    if (!d || !Array.isArray(d.categories)) {
      mount.innerHTML =
        '<section class="pt">' +
        '<p class="pt-error">Products could not be loaded.</p>' +
        "</section>";
      return;
    }

    if (!document.getElementById("mxp-products-style")) {
      var style = document.createElement("style");
      style.id = "mxp-products-style";
      style.textContent = css;
      document.head.appendChild(style);
    }

    // Show the built-in products first, then add the live sheet rows
    draw(mount, d);

    loadSheet(function (rows) {
      draw(mount, mergeSheet(d, rows));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
