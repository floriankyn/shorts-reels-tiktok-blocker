chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  const bannedUrls = [
    'youtube.com/shorts/',
    'instagram.com/reels/',
    "tiktok.com/",
    "tiktok.com/@",
    "tiktok.com/en/",
  ];

  if (bannedUrls.some(url => details.url.includes(url))) {
      chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          function: blankOutPage
      });
  } 
});

function blankOutPage() {
  document.body.innerHTML = '';
  document.body.style.backgroundColor = 'white';
}