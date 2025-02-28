import { bangs } from "./bang";
import "./global.css";

function noSearchDefaultPageRender() {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
      <div class="content-container">
        <h1>Und7ck</h1>
        <p><a href="https://github.com/why7e" target="_blank">why7e's</a> personal search router, using utilising your browser cache for lightning-fast <a href="https://duckduckgo.com/bang.html" target="_blank">bang</a> queries.<br>
        Add the following URL as a custom search engine to your browser.</p>
        <div class="url-container"> 
          <input 
            type="text" 
            class="url-input"
            value="https://search.gphua.com?q=%s"
            readonly 
          />
          <button class="copy-button">
            <img src="/clipboard.svg" alt="Copy" />
          </button>
        </div>
        <div class="default-search-container">
          <p>Default search:</p>
          <div class="search-options">
            <button class="search-option" data-bang="g">Google</button>
            <button class="search-option" data-bang="ddg">DuckDuckGo</button>
          </div>
        </div>
      </div>
      <footer class="footer">
        Fork of <a href="https://unduck.link" target="_blank">Und*ck</a> by <a href="https://x.com/theo" target="_blank">theo</a>
      </footer>
    </div>
  `;

  const copyButton = app.querySelector<HTMLButtonElement>(".copy-button")!;
  const copyIcon = copyButton.querySelector("img")!;
  const urlInput = app.querySelector<HTMLInputElement>(".url-input")!;

  copyButton.addEventListener("click", async () => {
    await navigator.clipboard.writeText(urlInput.value);
    copyIcon.src = "/clipboard-check.svg";

    setTimeout(() => {
      copyIcon.src = "/clipboard.svg";
    }, 2000);
  });

    // Default search engine selection
    const searchOptions = app.querySelectorAll<HTMLButtonElement>(".search-option");
    searchOptions.forEach(option => {
      option.addEventListener("click", () => {
        // Remove active class from all options
        searchOptions.forEach(opt => opt.classList.remove("active"));
        
        // Add active class to clicked option
        option.classList.add("active");
        
        // Save preference to localStorage
        const bang = option.getAttribute("data-bang") || "g";
        localStorage.setItem("default-bang", bang);
      });
    });
}

const LS_DEFAULT_BANG = localStorage.getItem("default-bang") ?? "g";
const defaultBang = bangs.find((b) => b.t === LS_DEFAULT_BANG);

function getBangredirectUrl() {
  const url = new URL(window.location.href);
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) {
    noSearchDefaultPageRender();
    return null;
  }

  const match = query.match(/!(\S+)/i);

  const bangCandidate = match?.[1]?.toLowerCase();
  const selectedBang = bangs.find((b) => b.t === bangCandidate) ?? defaultBang;

  // Remove the first bang from the query
  const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

  // Format of the url is:
  // https://www.google.com/search?q={{{s}}}
  const searchUrl = selectedBang?.u.replace(
    "{{{s}}}",
    // Replace %2F with / to fix formats like "!ghr+t3dotgg/unduck"
    encodeURIComponent(cleanQuery).replace(/%2F/g, "/")
  );
  if (!searchUrl) return null;

  return searchUrl;
}

function doRedirect() {
  const searchUrl = getBangredirectUrl();
  if (!searchUrl) return;
  window.location.replace(searchUrl);
}

doRedirect();
