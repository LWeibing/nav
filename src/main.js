const $siteList = $(".siteList");
const $lastSite = $siteList.find("li.last");
const web = localStorage.getItem("website");
const xObject = JSON.parse(web);
const hashMap = xObject || [
  { url: "https://css-tricks.com" },
  { url: "https://juejin.im" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
            <div class="site">
              <div class="logoBox">
                <img class="logo" src="${node.url}/favicon.ico" />
              </div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
              </div>
            </div>
        </li>
        `).insertBefore($lastSite);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入新的地址:");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ url: url });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("website", string);
};
