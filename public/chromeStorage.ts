export const saveState = (key: string, value: boolean) => {
  chrome.storage.local.set({ [key]: value }, function() {
    console.log('Value is set to ' + value);
  });
};

export const loadState = (key: string, callback: (value: boolean) => void ) => {
  chrome.storage.local.get([key], function(result) {
    console.log('Value currently is ' + result[key]);
    console.log(key);
    
    callback(result[key]);
  });
};