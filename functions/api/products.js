// Cloudflare Pages Function: GET /api/products
// Reads the private Google Sheet server-side and returns only the safe,
// public fields. Affiliate links are never sent to the browser.
//
// Required variable (Pages > Settings > Variables and Secrets):
//   SHEET_CSV_URL  - published Google Sheet CSV URL

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

function isHttpUrl(value) {
  try {
    var u = new URL(value);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch (e) {
    return false;
  }
}

function json(body, status, cache) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cache || "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

export async function onRequestGet(context) {
  var sheetUrl = context.env.SHEET_CSV_URL;

  if (!sheetUrl) {
    return json({ ok: false, products: [] }, 500);
  }

  try {
    var res = await fetch(sheetUrl, {
      cf: { cacheTtl: 60, cacheEverything: true }
    });

    if (!res.ok) {
      return json({ ok: false, products: [] }, 502);
    }

    var rows = parseCSV(await res.text());
    var products = [];

    rows.forEach(function (r) {
      if (norm(r.status) !== "live" || !r.name) return;
      if (!isHttpUrl(r.affiliate_link)) return;

      var slug = slugify(r.name);
      if (!slug) return;

      products.push({
        category: r.category || "",
        name: r.name,
        description: r.description || "",
        slug: slug
      });
    });

    return json({ ok: true, products: products }, 200, "public, max-age=60");
  } catch (e) {
    return json({ ok: false, products: [] }, 502);
  }
}
