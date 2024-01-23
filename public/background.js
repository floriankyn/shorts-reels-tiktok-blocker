chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  if (details.url.includes('youtube.com/shorts/')) {
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