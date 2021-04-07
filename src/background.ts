import {browser, Tabs} from 'webextension-polyfill-ts';

browser.browserAction.onClicked.addListener((tab: Tabs.Tab) => {
  browser.tabs.sendMessage(tab.id || -1, {});
});
