const $siteList = $(".siteList");
const $lastSite = $siteList.find("li.last");
const web = localStorage.getItem("website");
const xObject = JSON.parse(web);
const hashMap = xObject || [
  { url: "https://css-tricks.com" },
  { url: "https://juejin.im" },
  { url: "https://www.jq22.com" },
  { url: "https://www.nowcoder.com" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>
            <div class="site">
              <div class="logoBox">
                <img class="logo" src="//www.${simplifyUrl(
                  node.url
                )}/favicon.ico" />
              </div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="number">${index + 1}</div>
              <div class="close">
              <svg class="icon">
                <use xlink:href="#icon-close"></use>
              </svg>
              </div>
            </div>
        </li>
        `).insertBefore($lastSite);
    $li.on("click", () => {
      window.location.href = node.url;
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
  hashMap.push({
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("website", string);
};
$(document).on("keypress", (e) => {
  let { key } = e;
  const number = $(".number").text().split("");
  for (let i = 0; i < number.length; i++) {
    if (number[i] === key) {
      window.location.href = hashMap[i].url;
    }
  }
});
