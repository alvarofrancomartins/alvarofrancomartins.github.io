/**
 * CRIMENET Communities Tab
 * Loads communities_data.json and renders the communities table
 * with LLM generated titles, summaries, and top organizations.
 *
 * This is a hand-authored source file in app/.
 */

(function () {
  "use strict";

  var communitiesData = [];

  function init() {
    var container = document.getElementById("communities-tab");
    if (!container) return;
    if (container.dataset.loaded === "1") return;
    container.dataset.loaded = "1";

    container.innerHTML =
      '<div class="comm-loading">Loading community analysis…</div>';

    fetch("communities_data.json")
      .then(function (r) {
        if (!r.ok) throw new Error("communities_data.json not found");
        return r.json();
      })
      .then(function (data) {
        communitiesData = data;
        render(container);
      })
      .catch(function (err) {
        container.innerHTML =
          '<div class="comm-error">Community data unavailable. ' +
          "Run <code>python build/build_communities.py --input data/crimenet.json --output app</code> to generate it.</div>";
        console.error("Communities tab:", err);
      });
  }

  function render(container) {
    var html =
      '<p class="desc"><strong>About the communities.</strong> ' +
      "Criminal organizations that frequently cooperate form tight-knit groups: " +
      "the " + communitiesData.length + " communities shown below were detected automatically by Infomap, " +
      "a community detection algorithm that finds clusters of densely interconnected nodes. " +
      "Each community was then titled and summarized by DeepSeek, " +
      "an AI model that reads every organization and every cooperation tie inside the group.</p>";

    html += '<div class="comm-controls">' +
      '<input type="search" id="comm-search" class="panel-search comm-search-wide" placeholder="Search communities…" autocomplete="off" spellcheck="false">' +
      "</div>";

    html += '<div class="comm-table-wrap"><table class="comm-table" id="communities-table">' +
      '<colgroup>' +
      '<col class="col-orgs">' +
      '<col class="col-title">' +
      '<col class="col-summary">' +
      '<col class="col-top">' +
      '</colgroup>' +
      "<thead><tr>" +
      '<th class="sortable col-size" data-sort="size">Size <span class="sort-arrow"></span></th>' +
      '<th class="sortable col-title" data-sort="title">Title <span class="sort-arrow"></span></th>' +
      '<th class="sortable" data-sort="summary">Summary <span class="sort-arrow"></span></th>' +
      "<th>Top Organizations</th>" +
      "</tr></thead><tbody></tbody></table></div>";

    container.innerHTML = html;

    renderTable(communitiesData);
    wireFilters();
    wireSortableHeaders();
  }

  function renderTable(data) {
    var tbody = document.querySelector("#communities-table tbody");
    if (!tbody) return;
    var rows = data.map(function (c) {
      var topNames = (c.top_orgs || []).slice(0, 20).join(", ");
      var summary = escHtml(c.summary || "");
      var titleHtml =
        c.title === "?"
          ? '<span style="color:var(--text-muted);font-style:italic">?</span>'
          : escHtml(c.title);
      return (
        '<tr data-search="' +
        escHtml((c.title + " " + c.summary + " " + topNames).toLowerCase()) +
        '" data-size="' +
        c.size +
        '">' +
        '<td class="num-cell col-size"><span class="comm-highlight">' +
        c.size +
        "</span></td>" +
        '<td class="col-title">' +
        titleHtml +
        "</td>" +
        '<td class="comm-summary-cell">' +
        '<div class="comm-summary-trunc">' +
        summary +
        "</div>" +
        (summary.length > 180
          ? '<button class="comm-expand" onclick="this.previousElementSibling.classList.toggle(\'comm-summary-trunc\');this.textContent=this.previousElementSibling.classList.contains(\'comm-summary-trunc\')?\'Show more\':\'Show less\'">Show more</button>'
          : "") +
        "</td>" +
        '<td class="comm-top-orgs">' +
        escHtml(topNames) +
        "</td>" +
        "</tr>"
      );
    });
    tbody.innerHTML = rows.join("");
  }

  function wireFilters() {
    var search = document.getElementById("comm-search");
    if (!search) return;

    function filter() {
      var q = search.value.toLowerCase();
      document
        .querySelectorAll("#communities-table tbody tr")
        .forEach(function (tr) {
          var matchSearch = !q || tr.dataset.search.indexOf(q) !== -1;
          tr.style.display = matchSearch ? "" : "none";
        });
    }
    search.addEventListener("input", filter);
  }

  function wireSortableHeaders() {
    document.querySelectorAll(".comm-table th.sortable").forEach(function (th) {
      th.addEventListener("click", function () {
        var table = th.closest("table");
        var tbody = table.querySelector("tbody");
        var colIdx = Array.prototype.indexOf.call(
          th.parentNode.children,
          th
        );
        var sortKey = th.dataset.sort;
        var rows = Array.from(
          tbody.querySelectorAll("tr")
        ).filter(function (r) {
          return r.style.display !== "none";
        });

        var dir = th.dataset.sortDir === "asc" ? -1 : 1;
        th.dataset.sortDir = dir === 1 ? "asc" : "desc";

        table
          .querySelectorAll(".sort-arrow")
          .forEach(function (s) {
            return (s.textContent = "");
          });
        th.querySelector(".sort-arrow").textContent =
          dir === 1 ? "▴" : "▾";

        rows.sort(function (a, b) {
          var va, vb;
          if (sortKey === "size") {
            va = parseFloat(a.cells[colIdx].textContent.replace(/,/g, "")) || 0;
            vb = parseFloat(b.cells[colIdx].textContent.replace(/,/g, "")) || 0;
          } else {
            va = a.cells[colIdx].textContent.trim().toLowerCase();
            vb = b.cells[colIdx].textContent.trim().toLowerCase();
          }
          if (va < vb) return -1 * dir;
          if (va > vb) return 1 * dir;
          return 0;
        });

        rows.forEach(function (r) {
          return tbody.appendChild(r);
        });
      });
    });
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.CRIMENET_COMMUNITIES = {
    init: init,
  };
})();
