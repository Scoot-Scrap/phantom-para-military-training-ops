module.exports = {
  configurations: {
    desktop: {
      target: 'chrome.app',
      width: 1200,
      height: 800
    }
  },
  viewMode: 'story',
  shouldUpdateReference: process.env.UPDATE_REFERENCES === 'true'
};