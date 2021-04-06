import {browser, Tabs, BrowserAction} from 'webextension-polyfill-ts';

browser.browserAction.onClicked.addListener(
  (tab: Tabs.Tab, info: BrowserAction.OnClickData | undefined) => {
    console.log(tab, info);
  }
);
