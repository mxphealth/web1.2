// Cloudflare Pages Function: /products/<product-name>
// Looks the product up in the published Google Sheet and sends the visitor
// to the affiliate link (server-side redirect, no page flash).

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQd5A8sZ0ttf4fB--kQLbqJMK8ZJGIH4aPFpMoKY56Kqq8nZImezdkQppmHPlQT69jLDB8iFl6c5Tt3/pub?gid=0&single=true&output=csv";

function slugify(s) {
  return String(s || "").toLowerCase()
    .replace(/\u00df/g, "ss")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function norm(s) {
  return String(s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

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

function redirect(location) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow"
    }
  });
}

export async function onRequestGet(context) {
  var slug = "";

  try {
    slug = decodeURIComponent(
      String(context.params.slug || "")
    ).toLowerCase();
  } catch (e) {}

  var back = new URL("/products", context.request.url).href;

  if (!slug) return redirect(back);

  try {
    var res = await fetch(SHEET_CSV_URL, {
      cf: { cacheTtl: 60, cacheEverything: true }
    });

    if (!res.ok) return redirect(back);

    var rows = parseCSV(await res.text());

    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];

      if (norm(r.status) !== "live" || !r.name) continue;
      if (slugify(r.name) !== slug) continue;

      var u = new URL(r.affiliate_link);

      if (u.protocol === "https:" || u.protocol === "http:") {
        return redirect(u.href);
      }

      break;
    }
  } catch (e) {}

  return redirect(back);
}
