import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';
import { lgu } from '../../src/config/lgu';
import { SAMPLE_ID, SAMPLE_MARKER } from '../../src/lib/sample-content';

// Runs only against a build made with SAMPLE_CONTENT=true (CI's e2e job, second phase).
test.skip(process.env.SAMPLE_CONTENT !== 'true', 'needs a SAMPLE_CONTENT=true build');

const EN = `/services/${SAMPLE_ID}/`;
const FIL = `/fil/services/${SAMPLE_ID}/`;
const REPORT = /\/issues\/new\?template=data-correction\.yml$/;
const SECTIONS = [
  'guide-where',
  'guide-bring',
  'guide-cost',
  'guide-time',
  'guide-about',
  'guide-eligibility',
  'guide-steps',
  'guide-channels',
  'guide-complaint',
  'guide-notes',
  'guide-source',
];
// The four questions on the printed sheet.
const ANSWERS = ['guide-where', 'guide-bring', 'guide-cost', 'guide-time'];

function pdfPageCount(pdf: Buffer): number {
  const count = pdf.toString('latin1').match(/\/Type\s*\/Page(?![a-zA-Z])/g)?.length ?? 0;
  expect(count, 'could not read the PDF page count').toBeGreaterThan(0);
  return count;
}

// The site chrome that the printed sheet hides.
const CHROME = ['body > header', 'body > aside', 'body > footer', '#guide-details'];

// `toBeHidden()` also passes when nothing matches, so check on screen first that each
// piece exists and is shown. Then a markup change cannot make the print checks pass on nothing.
async function expectChromeOnScreen(page: Page) {
  for (const selector of CHROME) {
    await expect(page.locator(selector), selector).toBeVisible();
  }
  expect(await page.locator('nav').count(), 'no nav on screen').toBeGreaterThan(0);
}

async function expectSheetOnly(page: Page) {
  for (const selector of CHROME) {
    await expect(page.locator(selector), selector).toBeHidden();
  }
  for (const nav of await page.locator('nav').all()) {
    await expect(nav).toBeHidden();
  }
  for (const id of ANSWERS) {
    await expect(page.locator(`#${id}`), id).toBeVisible();
  }
  await expect(page.locator('#guide-source')).toBeVisible();
  await expect(page.locator('#guide-source-link')).toBeVisible();
  await expect(page.locator('#guide-print-url')).toBeVisible();
}

test('the fictional sample guide gets a page', async ({ page }) => {
  const response = await page.goto(`/services/${SAMPLE_ID}/`);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('fictional sample');
  await expect(page.locator('main')).toContainText(SAMPLE_MARKER);
});

test('the directory links to the sample guide', async ({ page }) => {
  await page.goto('/services/');
  await expect(page.locator(`main a[href="/services/${SAMPLE_ID}/"]`).first()).toBeVisible();
});

for (const path of [EN, FIL]) {
  test(`${path}: every section, one h1, no "undefined" or "{", no axe violations, no sideways scroll at 360 px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 720 });
    await page.goto(path);

    for (const id of SECTIONS) {
      await expect(page.locator(`#${id}`), id).toBeVisible();
    }
    await expect(page.locator('#guide-bring-list > li')).toHaveCount(3);
    await expect(page.locator('#guide-steps > ol > li')).toHaveCount(3);
    await expect(page.locator('#guide-cost-list > li')).toHaveCount(2);
    await expect(page.locator('#guide-channels > ul > li')).toHaveCount(2);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    const text = await page.locator('body').innerText();
    expect(text).not.toContain('undefined');
    expect(text, 'a placeholder was not filled').not.toContain('{');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'page scrolls sideways').toBeLessThanOrEqual(0);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
}

test('the provenance block shows source, edition, pages, dates, verifier, and the report link', async ({
  page,
}) => {
  await page.goto(EN);
  const source = page.locator('#guide-source');
  await expect(source).toContainText('Sample edition (fictional)');
  await expect(source).toContainText('pp. 12–13');
  await expect(source).toContainText('November 14, 2026');
  await expect(source).toContainText('Sample reviewer (fictional)');
  await expect(source.locator('a[href*="issues/new"]')).toHaveAttribute('href', REPORT);
});

test('a null field shows the "Not stated" text in each language', async ({ page }) => {
  await page.goto(EN);
  await expect(page.locator('#guide-eligibility')).toContainText(
    'Not stated in the official source. Ask the office.',
  );
  await page.goto(FIL);
  await expect(page.locator('#guide-eligibility')).toContainText(
    'Hindi nakasaad sa opisyal na sanggunian. Magtanong sa opisina.',
  );
});

test('classification and transaction type show in both languages', async ({ page }) => {
  await page.goto(EN);
  const about = page.locator('#guide-about');
  await expect(about).toContainText('Classification');
  await expect(about).toContainText('Simple');
  await expect(about).toContainText('Transaction type');
  await expect(about).toContainText('Application');

  await page.goto(FIL);
  await expect(about).toContainText('Klasipikasyon');
  await expect(about).toContainText('Simple');
  await expect(about).toContainText('Uri ng transaksyon');
  // The transaction type is source text, so it is tagged English on the Filipino page (D6).
  await expect(about.locator('dd span[lang="en"]', { hasText: 'Application' })).toBeVisible();
});

test('the source link opens the PDF at the first page', async ({ page }) => {
  await page.goto(EN);
  const link = page.locator('#guide-source-link');
  await expect(link).toHaveAttribute(
    'href',
    'https://example.org/sample-citizens-charter.pdf#page=12',
  );
  await expect(link).toHaveAttribute('rel', 'external');
});

test('the Filipino guide has Filipino labels and a translation-pending notice', async ({
  page,
}) => {
  await page.goto(FIL);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fil');
  await expect(page.locator('#guide-where h3')).toContainText('Saan pupunta');
  await expect(page.locator('#guide-pending')).toBeVisible();
  await expect(page.locator('#guide-pending')).toContainText('translation-pending');
  await expect(page.locator('#guide-about > p')).toHaveAttribute('lang', 'en');

  await page.goto(EN);
  await expect(page.locator('#guide-pending')).toHaveCount(0);
});

test('the language switch maps the guide page EN to FIL and back', async ({ page }) => {
  await page.goto(EN);
  await page.getByRole('group', { name: 'Language' }).getByRole('link', { name: /^FIL/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fil');
  expect(new URL(page.url()).pathname).toBe(FIL);

  await page.getByRole('group', { name: 'Wika' }).getByRole('link', { name: /^EN/ }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(new URL(page.url()).pathname).toBe(EN);
});

test('guide pages have og tags and other pages do not', async ({ page }) => {
  await page.goto(EN);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    'Sample City: business permit (fictional sample)',
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    'content',
    'Sample City Business Permits Office (fictional) · Last verified November 14, 2026',
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    new URL(EN, lgu.siteUrl).href,
  );

  await page.goto(FIL);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    new URL(FIL, lgu.siteUrl).href,
  );

  for (const path of ['/', '/services/', '/about/']) {
    await page.goto(path);
    expect(await page.locator('meta[property^="og:"]').count(), path).toBe(0);
  }
});

test('print shows the sheet and hides the site chrome', async ({ page }) => {
  await page.goto(EN);
  await expectChromeOnScreen(page);
  await page.emulateMedia({ media: 'print' });
  await expectSheetOnly(page);

  await page.emulateMedia({ media: 'screen' });
  await expect(page.locator('#guide-print-url')).toBeHidden();
});

test('the English sample guide prints at a readable size', async ({ page }) => {
  await page.goto(EN);
  await page.emulateMedia({ media: 'print' });

  const bodyPt = await page.evaluate(() => {
    const size = parseFloat(getComputedStyle(document.body).fontSize);
    return size * 0.75;
  });
  expect(bodyPt, 'printed body text is smaller than 10pt').toBeGreaterThanOrEqual(10);

  const label = await page.evaluate(() => {
    const heading = document.querySelector('#guide-where h3');
    if (!heading) throw new Error('the where-to-go label is missing');
    const style = getComputedStyle(heading);
    return { transform: style.textTransform, color: style.color };
  });
  expect(label.transform).toBe('uppercase');

  // The hide rule is for the sheet cards only; empty rows elsewhere stay visible.
  const hiddenOutside = await page.evaluate(
    () =>
      [...document.querySelectorAll('[data-not-stated]')].filter(
        (el) =>
          !el.closest('[data-sheet-card]') &&
          getComputedStyle(el.closest('div')!).display === 'none',
      ).length,
  );
  expect(hiddenOutside, 'a "Not stated" row outside the sheet is hidden in print').toBe(0);

  const pages = pdfPageCount(await page.pdf({ format: 'Letter', preferCSSPageSize: true }));
  test.info().annotations.push({ type: 'pages', description: String(pages) });
  // A real guide may need a second page; it never claims to be one page.
  expect(pages).toBeLessThanOrEqual(2);
});

// The fixture is built here, not in a YAML file, so nothing new can be published.
// ADR 0014 allows one sample guide, and a second file would widen that exception.
test('a long guide still prints the four questions and the source', async ({ page }) => {
  await page.goto(EN);
  await expectChromeOnScreen(page);
  await page.evaluate(() => {
    const addRows = (listId: string, count: number, label: string) => {
      const list = document.querySelector<HTMLElement>(`#${listId}`);
      const first = list?.querySelector<HTMLElement>(':scope > li');
      if (!list || !first) throw new Error(`#${listId} has no row to copy`);
      for (let i = 1; i <= count; i += 1) {
        const row = first.cloneNode(true) as HTMLElement;
        const name = row.querySelector('p');
        if (!name) throw new Error(`#${listId} row has no text to replace`);
        name.textContent = `${label} ${i} (fictional)`;
        list.appendChild(row);
      }
    };
    addRows('guide-bring-list', 10, 'Long fixture requirement');
    addRows('guide-cost-list', 4, 'Long fixture fee');
  });
  await expect(page.locator('#guide-bring-list > li')).toHaveCount(13);
  await expect(page.locator('#guide-cost-list > li')).toHaveCount(6);

  const pages = pdfPageCount(await page.pdf({ format: 'Letter', preferCSSPageSize: true }));
  test.info().annotations.push({ type: 'pages', description: String(pages) });
  // The design target is 3 pages on Letter. 4 leaves room for font differences between
  // Chrome builds (CI uses system Chrome, local runs use Playwright's Chromium).
  // More than 1 proves the fixture is really long.
  expect(pages).toBeGreaterThan(1);
  expect(pages).toBeLessThanOrEqual(4);

  await page.emulateMedia({ media: 'print' });
  await expectSheetOnly(page);
});

// The directory pages: the fictional verified items from examples/*.yaml.
const SAMPLE_SOURCE = 'https://example.org/betterlgu-sample-content';
const SAMPLE_OFFICE = '#office-sample-office';

test('/offices/: the sample office shows its marker, phone, source, date, and guide link', async ({
  page,
}) => {
  await page.goto('/offices/');
  const office = page.locator(SAMPLE_OFFICE);
  await expect(office).toBeVisible();
  await expect(office).toContainText(SAMPLE_MARKER);
  await expect(office.locator(`a[rel="external"][href="${SAMPLE_SOURCE}#page=1"]`)).toBeVisible();
  await expect(office.locator('time[datetime="2026-01-01"]')).toBeVisible();
  await expect(office.locator(`a[href="/services/${SAMPLE_ID}/"]`)).toBeVisible();
  // The sample phone is verified, so it is a tap-to-call link with digits only in the href.
  const phone = office.locator('a[href="tel:09000000000"]');
  await expect(phone).toBeVisible();
  await expect(phone).toHaveText('0900-000-0000');
  await expect(page.locator('#officials')).toContainText('Sample Person');
});

test('/fil/offices/: the sample office guide link goes to the Filipino guide', async ({ page }) => {
  await page.goto('/fil/offices/');
  await expect(
    page.locator(`${SAMPLE_OFFICE} a[href="/fil/services/${SAMPLE_ID}/"]`),
  ).toBeVisible();
});

test('/about/: the sample barangay shows its population and census year', async ({ page }) => {
  await page.goto('/about/');
  const table = page.locator('#barangays');
  await expect(table).toContainText('Sample Barangay');
  await expect(table).toContainText('1,234');
  await expect(table).toContainText('2024');
  // One sample barangay of 33, so the partial note shows.
  await expect(page.locator('#barangays-partial')).toBeVisible();
});

test('/resources/: the sample links show in their groups with a date and no pending note', async ({
  page,
}) => {
  await page.goto('/resources/');
  const official = page.locator('#resources-official a[rel="external"][href$="/official"]');
  await expect(official).toBeVisible();
  await expect(official.locator('time[datetime="2026-01-01"]')).toBeVisible();
  const agency = page.locator('#resources-other a[rel="external"][href$="/agency"]');
  await expect(agency).toBeVisible();
  await expect(agency.locator('time[datetime="2026-01-01"]')).toBeVisible();
  await expect(page.locator('#resources-official-pending')).toHaveCount(0);
  await expect(page.locator('#resources-other-pending')).toHaveCount(0);
});

test('/fil/resources/: the official card shows the Filipino label', async ({ page }) => {
  await page.goto('/fil/resources/');
  await expect(page.locator('#resources-official')).toContainText('Halimbawang opisyal na site');
});

test('/: the home sources card lists the verified featured resource', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#sources')).toContainText('Sample official site');
});

for (const path of [
  '/offices/',
  '/fil/offices/',
  '/about/',
  '/fil/about/',
  '/resources/',
  '/fil/resources/',
]) {
  test(`${path}: one h1, no "undefined" or "{", no axe violations, no sideways scroll at 360 px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 720 });
    await page.goto(path);

    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    const text = await page.locator('body').innerText();
    expect(text).not.toContain('undefined');
    expect(text, 'a placeholder was not filled').not.toContain('{');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'page scrolls sideways').toBeLessThanOrEqual(0);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
}
