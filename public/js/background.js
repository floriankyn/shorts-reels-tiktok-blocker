
let isExtensionEnabled = false;

chrome.storage.local.get(['isEnabled'], function(result) {
    console.log(result.isEnabled);
    isExtensionEnabled = result.isEnabled ?? false;
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log("on change", changes);
    if (changes.isEnabled) {    
        isExtensionEnabled = changes.isEnabled.newValue;
    }
});

chrome.tabs.onUpdated.addListener(async function  (tabId, changeInfo, tab) {
  const bannedUrls = [
    'youtube.com/shorts/',
    'instagram.com/reels/',
    "tiktok.com/",
    "tiktok.com/@",
    "tiktok.com/en/",
  ];

  let isAllowed = await chrome.storage.local.get("isEnabled");

  if(isAllowed.isEnabled) {
    if (bannedUrls.some(url => tab.url.includes(url))) {
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          function: blankOutPage
      });
    }

    const youtubeUrls = [
      "https://www.youtube.com/",
      "https://www.youtube.com",
      "www.youtube.com/",
      "www.youtube.com",
    ]

    console.log("details", tab.url);
    console.log(youtubeUrls.some(url => tab.url.includes(url)));
    if(youtubeUrls.some(url => tab.url.includes(url))) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: removeReelsFromMainPage
      });
    }
  }
});

function blankOutPage() {
  document.body.innerHTML = '';
  document.body.style.backgroundColor = 'white';
}

function removeReelsFromMainPage() {
  const removeReels = () => {
      const section1 = document.querySelector("#contents > ytd-rich-section-renderer:nth-child(3)");
      const section2 = document.querySelector("#contents > ytd-rich-section-renderer:nth-child(5)");
      const section3 = document.querySelector("#items > ytd-guide-entry-renderer:nth-child(2)");

      if (section1) section1.innerHTML = '';
      if (section2) section2.innerHTML = '';
      if (section3) section3.innerHTML = '';
  };

  removeReels();

  const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
              removeReels();
          }
      });
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);
}

