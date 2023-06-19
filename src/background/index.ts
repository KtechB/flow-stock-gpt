import browser from 'webextension-polyfill';
import store, { initializeWrappedStore } from '../app/store';
import { getBucket } from '@extend-chrome/storage';

initializeWrappedStore();

store.subscribe(() => {
  // access store state
  // const state = store.getState();
  // console.log('state', state);
});

// show welcome page on new install
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    //show the welcome page
    const url = browser.runtime.getURL('welcome/welcome.html');
    await browser.tabs.create({ url });
  }
  chrome.contextMenus.create({
    id: 'add-page',
    title: 'add page',
    contexts: ['all'],
  });
  // add context Menus if need
});

interface UrlBucket {
  urls: string[];
}
const bucket = getBucket<UrlBucket>('urls', 'local');
// add contextMenus action
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab !== undefined) {
    switch (info.menuItemId) {
      case 'add-page': {
        console.log('page url', info.pageUrl);
        const updateUrlBucket = async (url: string) => {
          const value = await bucket.get();
          const urls = value?.urls ?? [];
          console.log(urls);
          await bucket.set({ urls: [...urls, url] });
          return url;
        };
        updateUrlBucket(info.pageUrl).then((url: string) => {
          console.log('url', url, tab.id);
        });
        // chrome.tabs.sendMessage( tab.id as number,{ type: 'ADDPAGE', payload: { url : info.pageUrl } });
      }
    }
  }
});

export {};
