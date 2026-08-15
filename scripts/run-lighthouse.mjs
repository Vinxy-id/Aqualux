import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';

async function runAudit() {
  console.log('Launching Chrome for Desktop & Mobile Lighthouse audit...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--disable-gpu', '--no-sandbox']
  });

  try {
    // 1. Desktop Audit
    console.log('Running Desktop Audit on http://localhost:4173 ...');
    const desktopResult = await lighthouse('http://localhost:4173', {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
    }, {
      extends: 'lighthouse:default',
      settings: {
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0
        }
      }
    });

    const dCats = desktopResult.lhr.categories;
    const dAudits = desktopResult.lhr.audits;

    console.log('\n======================================');
    console.log('🌟 DESKTOP LIGHTHOUSE SCORES:');
    console.log('======================================');
    console.log(`⚡ Performance  : ${Math.round(dCats.performance.score * 100)} / 100`);
    console.log(`♿ Accessibility: ${Math.round(dCats.accessibility.score * 100)} / 100`);
    console.log(`🛡️ Best Practices: ${Math.round(dCats['best-practices'].score * 100)} / 100`);
    console.log(`🔍 SEO          : ${Math.round(dCats.seo.score * 100)} / 100`);
    console.log('--------------------------------------');
    console.log(`⏱️ First Contentful Paint (FCP) : ${dAudits['first-contentful-paint']?.displayValue}`);
    console.log(`⏱️ Largest Contentful Paint (LCP): ${dAudits['largest-contentful-paint']?.displayValue}`);
    console.log(`⏱️ Total Blocking Time (TBT)    : ${dAudits['total-blocking-time']?.displayValue}`);
    console.log(`⏱️ Cumulative Layout Shift (CLS) : ${dAudits['cumulative-layout-shift']?.displayValue}`);
    console.log(`⏱️ Speed Index                  : ${dAudits['speed-index']?.displayValue}`);

    // 2. Mobile Audit
    console.log('\nRunning Mobile Audit on http://localhost:4173 ...');
    const mobileResult = await lighthouse('http://localhost:4173', {
      port: chrome.port,
      output: 'json',
      logLevel: 'error',
    });

    const mCats = mobileResult.lhr.categories;
    const mAudits = mobileResult.lhr.audits;

    console.log('\n======================================');
    console.log('📱 MOBILE LIGHTHOUSE SCORES:');
    console.log('======================================');
    console.log(`⚡ Performance  : ${Math.round(mCats.performance.score * 100)} / 100`);
    console.log(`♿ Accessibility: ${Math.round(mCats.accessibility.score * 100)} / 100`);
    console.log(`🛡️ Best Practices: ${Math.round(mCats['best-practices'].score * 100)} / 100`);
    console.log(`🔍 SEO          : ${Math.round(mCats.seo.score * 100)} / 100`);
    console.log('--------------------------------------');
    console.log(`⏱️ First Contentful Paint (FCP) : ${mAudits['first-contentful-paint']?.displayValue}`);
    console.log(`⏱️ Largest Contentful Paint (LCP): ${mAudits['largest-contentful-paint']?.displayValue}`);
    console.log(`⏱️ Total Blocking Time (TBT)    : ${mAudits['total-blocking-time']?.displayValue}`);
    console.log(`⏱️ Cumulative Layout Shift (CLS) : ${mAudits['cumulative-layout-shift']?.displayValue}`);
    console.log(`⏱️ Speed Index                  : ${mAudits['speed-index']?.displayValue}`);
    console.log('======================================\n');

  } catch (err) {
    console.error('Audit Error:', err);
  } finally {
    try {
      await chrome.kill();
    } catch (_) {}
  }
}

runAudit();
