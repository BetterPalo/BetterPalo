import { lgu } from '../config/lgu';
import { fillPlaceholders, placeholderValues, type LguConfig } from '../lib/lgu';

// Strings may use the placeholders in `placeholders` (src/lib/lgu.ts), written as {place},
// {lguPhrase}, and so on. `t()` fills them from src/config/lgu.ts. Never write an LGU name,
// province, or figure in this file.

export const languages = { en: 'English', fil: 'Filipino' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const en = {
  'site.name': '{brand}',
  'site.skip': 'Skip to content',
  'site.place': '{place}, {province}',
  'notice.label': 'Site notice',
  'notice.lead': 'Unofficial.',
  'notice.body': 'Community-run, not affiliated with the {place} local government.',
  'report.link': 'Report a wrong detail',
  'nav.label': 'Primary',
  'nav.menu': 'Menu',
  'nav.services': 'Services',
  'nav.offices': 'Offices',
  'nav.about': 'About {place}',
  'nav.sitemap': 'Sitemap',
  'nav.find': 'Find a service',
  'lang.label': 'Language',
  'lang.current': 'current language',
  'footer.tag': 'Unofficial service guide · {place}, {province}',
  'footer.about':
    'A community-run guide to the public services of the {lguPhrase}. Every guide is cited to the {charterTitle} ({charterEdition}). It complements official channels; it does not replace them.',
  'footer.found': 'Found something wrong?',
  'footer.guide': 'Guide',
  'footer.official': 'Official sources',
  'footer.source': 'Source code',
  'footer.official.charter': "Citizen's Charter {charterYear} (PDF)",
  'footer.official.lgu': '{place} LGU website',
  'footer.bar.community': 'Community-built · Open source',
  'footer.bar.unofficial': 'Not an official government website',
  'footer.bar.bettergov': 'Part of the BetterGov.ph community',
  'sitemap.title': 'Sitemap',
  'sitemap.lead': 'Every page on {brand}, grouped by area.',
  'sitemap.lang': 'Read this page in:',
  'sitemap.xml': 'Machine-readable sitemap (XML)',
  'sitemap.area.services': 'Services',
  'sitemap.area.offices': 'Offices',
  'sitemap.area.about': 'About',
  'sitemap.area.site': 'Site pages',
  'sitemap.empty': 'No pages in this area yet.',
  'sitemap.pending': 'translation-pending',
  'page.home': 'Home',
  'page.sitemap': 'Sitemap',
  'site.banner':
    'Unofficial. {brand} is community-run and not affiliated with the {place} local government. Check official sources.',
  'home.title': 'Hello, {place}',
  'home.lead':
    'Where to go, what to bring, how much, and how long, for public services in {place}.',
  'home.eyebrow': 'Unofficial service guide · {place}, {province}',
  'home.hero.line1': 'Welcome to',
  'home.hero.line2': '{brand}.',
  'home.hero.ledeMore': "Each guide is read from the official Citizen's Charter.",
  'home.hero.browse': 'Browse services',
  'home.find.placeholder': 'e.g., cedula, birth certificate',
  'home.find.submit': 'Search',
  'home.find.popular': 'Popular:',
  'home.find.note': 'Every answer comes from the {charterTitle}, {charterEdition}.',
  'home.find.noSearch': 'Search is not ready yet. Browse every service in the directory.',
  'home.find.browse': 'Browse the services directory',
  'home.sheet.a': 'One errand,',
  'home.sheet.b': 'one printed page.',
  'home.sheet.body':
    'Every guide prints as a single sheet: where to go, what to bring, how much, and how long, with its Charter page at the bottom. Bring it with you, or print it for someone who is not online.',
  'home.sheet.sample': 'See a sample sheet',
  'home.sheet.pick': 'Pick a service',
  'home.sheet.printable': 'Printable',
  'home.sheet.label': 'Service sheet',
  'home.sheet.example': 'Get a cedula',
  'home.sheet.where.val': '{lguAdj} Treasurer',
  'home.sheet.foot': "Citizen's Charter pp. 225–227",
  'home.sheet.page': 'Page 1 of 1',
  'home.q.where': 'Where to go',
  'home.q.bring': 'What to bring',
  'home.q.cost': 'How much',
  'home.q.time': 'How long',
  'home.popular.a': 'Popular',
  'home.popular.b': 'services.',
  'home.popular.sub':
    "Grouped by the offices that handle them, with the number of services each covers in the Citizen's Charter. Guides are added as they are verified.",
  'home.tile.certificates': 'Certificates',
  'home.tile.certificates.d': 'Birth, marriage, and death records',
  'home.tile.business': 'Business Permits',
  'home.tile.business.d': 'New permits, renewals, franchises',
  'home.tile.property': 'Property and Taxes',
  'home.tile.property.d': 'Tax declarations, cedula, clearances',
  'home.tile.social': 'Social Services',
  'home.tile.social.d': 'Senior citizen and PWD IDs, assistance',
  'home.tile.health': 'Health Services',
  'home.tile.health.d': 'Consultations, certificates, programs',
  'home.tile.all': 'All services',
  'home.tile.all.d': 'The complete directory',
  'home.tile.count': 'services in the Charter',
  'home.glance.a': '{place}',
  'home.glance.b': 'at a glance.',
  'home.glance.population': 'Population',
  'home.glance.barangays': 'Barangays',
  'home.glance.barangays.src': 'Full list on About {place}',
  'home.glance.services': 'Public services',
  'home.glance.offices': 'Offices and units',
  'home.glance.src.charter': "Citizen's Charter, {charterEdition}",
  'home.offices.a': 'Offices',
  'home.offices.b': 'and where to go.',
  'home.offices.more': 'Office directory',
  'home.offices.body': "{lguAdj} services are listed by office in the Citizen's Charter.",
  'home.offices.population': 'Population ({censusYear})',
  'home.offices.inCharter': 'Offices in the Charter',
  'home.offices.services': 'services',
  'home.how.a': 'How a guide',
  'home.how.b': 'gets made.',
  'home.step': 'Step',
  'home.step.1.title': 'Find the Charter page',
  'home.step.1.body': 'Each service starts from its page in the {charterTitle}.',
  'home.step.2.title': 'Write it in plain words',
  'home.step.2.body': 'A volunteer transcribes it by hand, in English and Filipino.',
  'home.step.3.title': 'Check it twice',
  'home.step.3.body':
    'A second person reads the same page and confirms every requirement, fee, and step.',
  'home.step.4.title': 'Publish with dates',
  'home.step.4.body': 'The guide shows its Charter edition and the date it was last verified.',
  'home.principle.accuracy.title': 'Accuracy first',
  'home.principle.accuracy.body':
    'A missing page is better than a wrong one. Unconfirmed details stay off the site.',
  'home.principle.source.title': 'Cite the source',
  'home.principle.source.body': 'Every fact is two clicks from the official document it came from.',
  'home.principle.plain.title': 'Plain language',
  'home.principle.plain.body': 'Written for someone in a hurry, on a phone, on a slow connection.',
  'home.sources.a': 'Check it against',
  'home.sources.b': 'the official source.',
  'home.sources.sub':
    '{brand} complements official channels; it does not replace them. These are the documents and sites behind every guide.',
  'home.sources.check.charter': '{charterTitle}, {charterEdition}',
  'home.sources.check.census': '{censusSource}, reference date {censusDate}',
  'home.sources.check.lgu': 'Applications and payments stay with the LGU',
  'home.sources.read': 'Read the Charter',
  'home.sources.card': 'Official sources',
  'sources.note.charter': 'The source for every guide',
  'sources.note.lgu': 'Official announcements',
  'home.help.a': 'Get in touch,',
  'home.help.b': 'or pitch in.',
  'home.help.github': 'On GitHub',
  'home.help.fix.k': 'Corrections',
  'home.help.fix.title': 'Report a wrong detail',
  'home.help.fix.body': 'Tell us what is wrong and where. We check it against the source.',
  'home.help.fix.link': 'Report it',
  'home.help.build.k': 'Contribute',
  'home.help.build.title': 'Help build {brand}',
  'home.help.build.body': 'Transcribe a service, review a translation, or improve the site.',
  'home.help.build.link': 'Start here',
  'home.help.lgu.k': 'Official channel',
  'home.help.lgu.title': '{place} LGU',
  'home.help.lgu.body': 'For applications, payments, and official announcements.',
  'home.help.lgu.link': 'Visit the LGU site',
  'home.cta.a': 'Know {place}?',
  'home.cta.b': 'Help write its guides.',
  'home.cta.tag': 'No coding needed.',
  'home.cta.sub':
    "Volunteers read the Charter, write each service in plain language, and check each other's work.",
  'home.cta.button': 'Volunteer with us',
  'notFound.title': 'Page not found',
  'notFound.body': 'We could not find that page.',
  'notFound.home': 'Go to the home page',
  'notFound.badge': 'Error',
  'notFound.eyebrow': 'Not found',
  'notFound.homeHint': 'Start over from the home page.',
  'notFound.services': 'Browse the services directory',
  'notFound.searchLabel': 'Search {brand}',
  'notFound.searchPlaceholder': 'e.g. birth certificate, cedula',
  'notFound.searchSubmit': 'Search',
  'notFound.searchHint': 'Find a service, an office, or a guide.',
  'notFound.nav': 'Next steps',
  'missing.stated': 'Not stated in the official source. Ask the office.',

  // Landing page (Home.astro)

  // How it works (/how-it-works/)
  'howItWorks.title': 'How a guide gets made',
  'howItWorks.eyebrow': 'Behind the scenes',
  'howItWorks.lead':
    'Every guide on {brand} follows the same four steps, so you can trust what you read.',
  'howItWorks.stepsTitle': 'The four steps',
  'howItWorks.principlesTitle': 'The principles behind them',
  'howItWorks.volunteerTitle': 'Help write the next guide',
  'howItWorks.volunteerBody':
    'Volunteers read the Charter, write each service in plain language, and check each other\u2019s work. No coding needed.',
  'howItWorks.volunteerCta': 'Volunteer on GitHub',
  'howItWorks.step.1': 'Step 1',
  'howItWorks.step.1.title': 'Find the Charter page',
  'howItWorks.step.1.body': 'Each service starts from its page in the {charterTitle}.',
  'howItWorks.step.2': 'Step 2',
  'howItWorks.step.2.title': 'Write it in plain words',
  'howItWorks.step.2.body': 'A volunteer transcribes it by hand, in English and Filipino.',
  'howItWorks.step.3': 'Step 3',
  'howItWorks.step.3.title': 'Check it twice',
  'howItWorks.step.3.body':
    'A second person reads the same page and confirms every requirement, fee, and step.',
  'howItWorks.step.4': 'Step 4',
  'howItWorks.step.4.title': 'Publish with dates',
  'howItWorks.step.4.body':
    'The guide shows its Charter edition and the date it was last verified.',
  'howItWorks.principle.accuracy.title': 'Accuracy first',
  'howItWorks.principle.accuracy.body':
    'A missing page is better than a wrong one. Unconfirmed details stay off the site.',
  'howItWorks.principle.source.title': 'Cite the source',
  'howItWorks.principle.source.body':
    'Every fact links or cites from the official document it came from.',
  'howItWorks.principle.plain.title': 'Plain language',
  'howItWorks.principle.plain.body':
    'Written for someone in a hurry, on a phone, on a slow connection.',
  'howItWorks.principle.open.title': 'Open and community-built',
  'howItWorks.principle.open.body': 'Anyone can contribute. The code and the data are open.',

  // Contribute (/contribute/)
  'contribute.title': 'Contribute',
  'contribute.eyebrow': 'Get involved',
  'contribute.lead': '{brand} is community-built. You do not need to write code to contribute.',
  'contribute.waysTitle': 'Ways to contribute',
  'contribute.way.data.title': 'Data correction',
  'contribute.way.data.body': 'Fix a wrong office, service, fee, official, or contact.',
  'contribute.way.translation.title': 'Translation',
  'contribute.way.translation.body': 'Turn English content into Filipino, or the reverse.',
  'contribute.way.design.title': 'Design and accessibility',
  'contribute.way.design.body':
    'Improve layout, contrast, keyboard use, and screen-reader support.',
  'contribute.way.code.title': 'Code',
  'contribute.way.code.body': 'Build pages, components, search, and tooling for the site.',
  'contribute.dataTitle': 'Data contributions',
  'contribute.dataBody':
    'Every fact needs an official source URL, a retrieval date, and a verification date.',
  'contribute.data.li1': 'an official source URL',
  'contribute.data.li2': 'a retrieval date',
  'contribute.data.li3': 'a verification date',
  'contribute.data.cta': 'Read the contributing guide',
  'contribute.workflowTitle': 'The workflow',
  'contribute.workflowBody':
    'One topic per pull request, kept small. CI must pass and one code-owner approval is required.',
  'contribute.workflow.1': 'Branch from main and make your change.',
  'contribute.workflow.2': 'Run pnpm format, lint, check, test, and build.',
  'contribute.workflow.3': 'Open a pull request and fill in the template.',
  'contribute.workflow.4': 'A maintainer reviews and merges.',

  // Accessibility (/accessibility/)
  'accessibility.title': 'Accessibility statement',
  'accessibility.eyebrow': 'Accessibility',
  'accessibility.lead':
    '{brand} aims to be usable by everyone, on any device, on a slow connection.',
  'accessibility.standardTitle': 'Our standard',
  'accessibility.standardBody':
    'We target WCAG 2.1 AA as the floor, and test with keyboard and screen readers.',
  'accessibility.standard.li1': 'Semantic HTML and landmarks on every page.',
  'accessibility.standard.li2': 'Sufficient contrast and visible focus states.',
  'accessibility.standard.li3': 'Works without JavaScript where possible.',
  'accessibility.featuresTitle': 'What we do',
  'accessibility.feature.skip.title': 'Skip link',
  'accessibility.feature.skip.body':
    'A skip link at the top of every page moves focus to the main content.',
  'accessibility.feature.contrast.title': 'Contrast',
  'accessibility.feature.contrast.body': 'Text and controls meet WCAG AA contrast ratios.',
  'accessibility.feature.keyboard.title': 'Keyboard',
  'accessibility.feature.keyboard.body':
    'All interactive elements are reachable and operable by keyboard.',
  'accessibility.feature.motion.title': 'Motion',
  'accessibility.feature.motion.body': 'Animations respect prefers-reduced-motion.',
  'accessibility.feature.lang.title': 'Language',
  'accessibility.feature.lang.body':
    'Pages are marked up with the correct lang attribute, and Filipino is available.',
  'accessibility.feature.print.title': 'Print',
  'accessibility.feature.print.body': 'Service sheets print cleanly as a single page.',
  'accessibility.feedbackTitle': 'Feedback',
  'accessibility.feedbackBody': 'Found an accessibility problem? Tell us and we will fix it.',
  'accessibility.feedbackCta': 'Report an issue',

  // Resources (/resources/)
  'resources.title': 'Official resources',
  'resources.eyebrow': 'Official sources',
  'resources.lead': 'The documents and sites behind every guide on {brand}.',
  'resources.officialTitle': 'Official resources',
  'resources.officialBody':
    'These are the sources we cite. {brand} complements them; it does not replace them.',
  'resources.open': 'Open',
  'resources.r1.name': '{place} LGU website',
  'resources.r1.desc': 'Official announcements',
  'resources.r2.name': "Citizen's Charter {charterYear} (PDF)",
  'resources.r2.desc': 'The source for every guide',
  'resources.r3.name': '{council} of {place}',
  'resources.r3.desc': 'Ordinances and sessions',
  'resources.r4.name': 'Philippine Statistics Authority',
  'resources.r4.desc': 'Population and census data',
  'resources.r5.name': 'PhilHealth',
  'resources.r5.desc': 'Health insurance',
  'resources.r6.name': 'SSS',
  'resources.r6.desc': 'Social security',
  'resources.notHandledTitle': 'Not handled by the {lguKind}',
  'resources.notHandledBody': 'Some services people expect from the LGU are run by other agencies.',
  'resources.notHandled.1': 'National ID registration (PSA)',
  'resources.notHandled.2': 'Passport applications (DFA)',
  'resources.notHandled.3': 'Driver\u2019s licences (LTO)',
  'resources.notHandled.4': 'Voter registration (COMELEC)',

  // About (/about/)
  'about.title': 'About {place}',
  'about.eyebrow': 'About',
  'about.lead': '{place}, {province}: facts from the official sources, not guesses.',
  'about.factsTitle': '{place} at a glance',
  'about.stat.pop': 'Population',
  'about.stat.pop.src': '{censusSource}',
  'about.stat.brgy': 'Barangays',
  'about.stat.brgy.src': 'Full list on About {place}',
  'about.stat.services': 'Public services',
  'about.stat.services.src': "Citizen's Charter, {charterEdition}",
  'about.stat.offices': 'Offices and units',
  'about.stat.offices.src': "Citizen's Charter, {charterEdition}",
  'about.barangaysTitle': 'The {barangays} barangays',
  'about.barangaysBody':
    'The full list of the {barangays} barangays is being transcribed from the official source.',
  'about.sourcesTitle': 'Sources',
  'about.sourcesBody': 'Every fact on this page is cited to an official document.',
  'about.sources.li1': '{censusSource}, reference date {censusDate}',
  'about.sources.li2': '{charterTitle}, {charterEdition}',

  // Offices (/offices/)
  'offices.title': 'Offices',
  'offices.eyebrow': 'Offices',
  'offices.lead': 'Where to go for the services of the {lguPhrase}.',
  'offices.place': '{place}, {province}',
  'offices.placeSub': '{lguAdj} services are listed by office in the Citizen\u2019s Charter.',
  'offices.brgy': 'Barangays',
  'offices.charter': 'Offices in the Charter',
  'offices.noteTitle': 'About this list',
  'offices.noteBody':
    'Office names are taken verbatim from the Citizen\u2019s Charter. Only verified details are published.',

  // Services directory (/services/)
  'servicesDir.title': 'Services',
  'servicesDir.eyebrow': 'Services',
  'servicesDir.lead': 'Every verified service guide, grouped by office.',
  'servicesDir.empty': 'No verified service guides yet.',
  'servicesDir.emptyBody':
    'Guides are published only after they pass the verified-only gate. Check back soon.',
} as const;

export type Key = keyof typeof en;

// Draft Filipino. Translation owner (not yet assigned) reviews before M1.
const fil: Partial<Record<Key, string>> = {
  'site.skip': 'Laktawan papunta sa nilalaman',
  'site.place': '{place}, {province}',
  'notice.label': 'Paalala',
  'notice.lead': 'Hindi opisyal.',
  'notice.body': 'Pinapatakbo ng komunidad, hindi kaugnay ng pamahalaang {lguKind} ng {place}.',
  'report.link': 'Iulat ang maling detalye',
  'nav.label': 'Pangunahin',
  'nav.menu': 'Menu',
  'nav.services': 'Mga serbisyo',
  'nav.offices': 'Mga opisina',
  'nav.about': 'Tungkol sa {place}',
  'nav.sitemap': 'Sitemap',
  'nav.find': 'Maghanap ng serbisyo',
  'lang.label': 'Wika',
  'lang.current': 'kasalukuyang wika',
  'footer.tag': 'Hindi opisyal na gabay sa serbisyo · {place}, {province}',
  'footer.about':
    'Gabay ng komunidad sa mga serbisyong pampubliko ng {lguPhrase}. Bawat gabay ay hango sa {charterTitle} ({charterEdition}). Kaagapay ito ng mga opisyal na daluyan; hindi nito pinapalitan ang mga iyon.',
  'footer.found': 'May nakitang mali?',
  'footer.guide': 'Gabay',
  'footer.official': 'Mga opisyal na sanggunian',
  'footer.source': 'Source code',
  'footer.official.charter': "Citizen's Charter {charterYear} (PDF)",
  'footer.official.lgu': 'Website ng LGU ng {place}',
  'footer.bar.community': 'Gawa ng komunidad · Open source',
  'footer.bar.unofficial': 'Hindi opisyal na website ng pamahalaan',
  'footer.bar.bettergov': 'Bahagi ng komunidad ng BetterGov.ph',
  'sitemap.title': 'Sitemap',
  'sitemap.lead': 'Lahat ng pahina ng {brand}, nakagrupo ayon sa seksyon.',
  'sitemap.lang': 'Basahin ang pahinang ito sa:',
  'sitemap.xml': 'Sitemap para sa makina (XML)',
  'sitemap.area.services': 'Mga serbisyo',
  'sitemap.area.offices': 'Mga opisina',
  'sitemap.area.about': 'Tungkol sa {place}',
  'sitemap.area.site': 'Mga pahina ng site',
  'sitemap.empty': 'Wala pang pahina sa seksyong ito.',
  'sitemap.pending': 'translation-pending',
  'page.home': 'Home',
  'page.sitemap': 'Sitemap',
  'site.banner':
    'Hindi ito opisyal. Ang {brand} ay pinapatakbo ng komunidad at hindi kaugnay ng pamahalaang {lguKind} ng {place}. Tingnan ang mga opisyal na sanggunian.',
  'home.title': 'Kumusta, {place}',
  'home.lead':
    'Saan pupunta, ano ang dadalhin, magkano, at gaano katagal, para sa mga serbisyong pampubliko sa {place}.',
  'home.eyebrow': 'Hindi opisyal na gabay sa serbisyo · {place}, {province}',
  'home.hero.line1': 'Maligayang pagdating sa',
  'home.hero.line2': '{brand}.',
  'home.hero.ledeMore': "Ang bawat gabay ay hango sa opisyal na Citizen's Charter.",
  'home.hero.browse': 'Tingnan ang mga serbisyo',
  'home.find.placeholder': 'hal., cedula, birth certificate',
  'home.find.submit': 'Hanapin',
  'home.find.popular': 'Madalas hanapin:',
  'home.find.note': 'Ang bawat sagot ay mula sa {charterTitle}, {charterEdition}.',
  'home.find.noSearch':
    'Hindi pa handa ang paghahanap. Tingnan ang lahat ng serbisyo sa direktoryo.',
  'home.find.browse': 'Tingnan ang direktoryo ng mga serbisyo',
  'home.sheet.a': 'Isang lakad,',
  'home.sheet.b': 'isang pahinang naka-print.',
  'home.sheet.body':
    'Ang bawat gabay ay lumalabas bilang isang sheet: saan pupunta, ano ang dadalhin, magkano, at gaano katagal, kasama ang pahina nito sa Charter sa ibaba. Dalhin ito, o i-print para sa taong walang internet.',
  'home.sheet.sample': 'Tingnan ang sample na sheet',
  'home.sheet.pick': 'Pumili ng serbisyo',
  'home.sheet.printable': 'Maipi-print',
  'home.sheet.label': 'Sheet ng serbisyo',
  'home.sheet.example': 'Kumuha ng cedula',
  'home.sheet.where.val': '{lguAdj} Treasurer',
  'home.sheet.foot': "Citizen's Charter p. 225–227",
  'home.sheet.page': 'Pahina 1 ng 1',
  'home.q.where': 'Saan pupunta',
  'home.q.bring': 'Ano ang dadalhin',
  'home.q.cost': 'Magkano',
  'home.q.time': 'Gaano katagal',
  'home.popular.a': 'Mga sikat',
  'home.popular.b': 'na serbisyo.',
  'home.popular.sub':
    "Nakagrupo ayon sa mga opisinang humahawak sa mga ito, kasama ang bilang ng serbisyong saklaw ng bawat isa sa Citizen's Charter. Idinadagdag ang mga gabay kapag na-verify na.",
  'home.tile.certificates': 'Mga sertipiko',
  'home.tile.certificates.d': 'Talaan ng kapanganakan, kasal, at kamatayan',
  'home.tile.business': 'Business permit',
  'home.tile.business.d': 'Bago at renewal ng permit, prangkisa',
  'home.tile.property': 'Ari-arian at buwis',
  'home.tile.property.d': 'Tax declaration, cedula, clearance',
  'home.tile.social': 'Serbisyong panlipunan',
  'home.tile.social.d': 'ID ng senior citizen at PWD, tulong',
  'home.tile.health': 'Serbisyong pangkalusugan',
  'home.tile.health.d': 'Konsultasyon, sertipiko, programa',
  'home.tile.all': 'Lahat ng serbisyo',
  'home.tile.all.d': 'Ang kumpletong direktoryo',
  'home.tile.count': 'serbisyo sa Charter',
  'home.glance.a': '{place}',
  'home.glance.b': 'sa isang tingin.',
  'home.glance.population': 'Populasyon',
  'home.glance.barangays': 'Mga barangay',
  'home.glance.barangays.src': 'Buong listahan sa Tungkol sa {place}',
  'home.glance.services': 'Mga serbisyong pampubliko',
  'home.glance.offices': 'Mga opisina at yunit',
  'home.glance.src.charter': "Citizen's Charter, {charterEdition}",
  'home.offices.a': 'Mga opisina',
  'home.offices.b': 'at saan pupunta.',
  'home.offices.more': 'Direktoryo ng mga opisina',
  'home.offices.body':
    "Nakalista ayon sa opisina ang mga serbisyo ng {lguHall} sa Citizen's Charter.",
  'home.offices.population': 'Populasyon ({censusYear})',
  'home.offices.inCharter': 'Mga opisina sa Charter',
  'home.offices.services': 'serbisyo',
  'home.how.a': 'Paano ginagawa',
  'home.how.b': 'ang isang gabay.',
  'home.step': 'Hakbang',
  'home.step.1.title': 'Hanapin ang pahina sa Charter',
  'home.step.1.body': 'Nagsisimula ang bawat serbisyo sa pahina nito sa {charterTitle}.',
  'home.step.2.title': 'Isulat sa simpleng salita',
  'home.step.2.body': 'Isang boluntaryo ang nagta-transcribe nito, sa English at Filipino.',
  'home.step.3.title': 'Suriin nang dalawang beses',
  'home.step.3.body':
    'Binabasa ng pangalawang tao ang parehong pahina at kinukumpirma ang bawat requirement, bayad, at hakbang.',
  'home.step.4.title': 'I-publish na may petsa',
  'home.step.4.body':
    'Ipinapakita ng gabay ang edisyon ng Charter at ang petsa ng huling pag-verify.',
  'home.principle.accuracy.title': 'Katumpakan muna',
  'home.principle.accuracy.body':
    'Mas mabuti ang kulang na pahina kaysa mali. Hindi inilalagay sa site ang mga detalyeng hindi pa kumpirmado.',
  'home.principle.source.title': 'Banggitin ang sanggunian',
  'home.principle.source.body':
    'Dalawang click lang ang bawat datos mula sa opisyal na dokumentong pinagmulan nito.',
  'home.principle.plain.title': 'Simpleng wika',
  'home.principle.plain.body': 'Isinulat para sa nagmamadali, sa phone, sa mabagal na koneksyon.',
  'home.sources.a': 'Itapat ito sa',
  'home.sources.b': 'opisyal na sanggunian.',
  'home.sources.sub':
    'Kaagapay ng {brand} ang mga opisyal na daluyan; hindi nito pinapalitan ang mga iyon. Ito ang mga dokumento at site sa likod ng bawat gabay.',
  'home.sources.check.charter': '{charterTitle}, {charterEdition}',
  'home.sources.check.census': '{censusSource}, petsa ng sanggunian: {censusDate}',
  'home.sources.check.lgu': 'Nasa LGU pa rin ang mga aplikasyon at bayad',
  'home.sources.read': 'Basahin ang Charter',
  'home.sources.card': 'Mga opisyal na sanggunian',
  'sources.note.charter': 'Ang pinagmulan ng bawat gabay',
  'sources.note.lgu': 'Mga opisyal na anunsyo',
  'home.help.a': 'Makipag-ugnayan,',
  'home.help.b': 'o tumulong.',
  'home.help.github': 'Sa GitHub',
  'home.help.fix.k': 'Mga pagwawasto',
  'home.help.fix.title': 'Iulat ang maling detalye',
  'home.help.fix.body':
    'Sabihin kung ano ang mali at saan. Susuriin namin ito laban sa sanggunian.',
  'home.help.fix.link': 'Iulat ito',
  'home.help.build.k': 'Tumulong',
  'home.help.build.title': 'Tumulong sa pagbuo ng {brand}',
  'home.help.build.body': 'Mag-transcribe ng serbisyo, mag-review ng salin, o pagandahin ang site.',
  'home.help.build.link': 'Magsimula rito',
  'home.help.lgu.k': 'Opisyal na daluyan',
  'home.help.lgu.title': 'LGU ng {place}',
  'home.help.lgu.body': 'Para sa mga aplikasyon, bayad, at opisyal na anunsyo.',
  'home.help.lgu.link': 'Bisitahin ang site ng LGU',
  'home.cta.a': 'Kilala mo ang {place}?',
  'home.cta.b': 'Tulungang isulat ang mga gabay nito.',
  'home.cta.tag': 'Hindi kailangan ng coding.',
  'home.cta.sub':
    "Binabasa ng mga boluntaryo ang Charter, isinusulat ang bawat serbisyo sa simpleng wika, at sinusuri ang gawa ng isa't isa.",
  'home.cta.button': 'Mag-volunteer sa amin',
  'notFound.title': 'Hindi nakita ang pahina',
  'notFound.body': 'Hindi namin mahanap ang pahinang iyan.',
  'notFound.home': 'Pumunta sa home page',
  'notFound.badge': 'Error',
  'notFound.eyebrow': 'Hindi nakita',
  'notFound.homeHint': 'Magsimula muli mula sa home page.',
  'notFound.services': 'Tingnan ang direktoryo ng mga serbisyo',
  'notFound.searchLabel': 'Hanapin sa {brand}',
  'notFound.searchPlaceholder': 'hal. birth certificate, cedula',
  'notFound.searchSubmit': 'Hanapin',
  'notFound.searchHint': 'Maghanap ng serbisyo, opisina, o gabay.',
  'notFound.nav': 'Mga susunod na hakbang',
  'missing.stated': 'Hindi nakasaad sa opisyal na sanggunian. Magtanong sa opisina.',

  // Landing page (Home.astro)

  // How it works
  'howItWorks.title': 'Paano ginagawa ang isang gabay',
  'howItWorks.eyebrow': 'Sa likod ng eksena',
  'howItWorks.lead':
    'Bawat gabay sa {brand} ay sumusunod sa parehong apat na hakbang, kaya mapagkakatiwalaan mo ang binabasa mo.',
  'howItWorks.stepsTitle': 'Ang apat na hakbang',
  'howItWorks.principlesTitle': 'Mga prinsipyo sa likod nito',
  'howItWorks.volunteerTitle': 'Tumulong sumulat ng susunod na gabay',
  'howItWorks.volunteerBody':
    'Binabasa ng mga boluntaryo ang Charter, isinusulat ang bawat serbisyo sa simpleng wika, at nagtitiwalaan ng gawa ng isa\u2019t isa. Hindi kailangan ng coding.',
  'howItWorks.volunteerCta': 'Makipagboluntaryo sa GitHub',

  // Contribute
  'contribute.title': 'Makibahagi',
  'contribute.eyebrow': 'Sumali',
  'contribute.lead': 'Gawa ng komunidad ang {brand}. Hindi kailangan ng coding para makibahagi.',
  'contribute.waysTitle': 'Mga paraan ng paglahok',
  'contribute.dataTitle': 'Mga kontribusyon sa datos',
  'contribute.dataBody':
    'Bawat katotohanan ay nangangailangan ng opisyal na source URL, petsa ng pagkuha, at petsa ng pagpapatunay.',
  'contribute.workflowTitle': 'Ang daloy ng gawain',
  'contribute.workflowBody':
    'Isang paksa bawat pull request, panatilihing maliit. Dapat pumasa ang CI at isang code-owner approval ang kailangan.',

  // Accessibility
  'accessibility.title': 'Pahayag ng accessibility',
  'accessibility.eyebrow': 'Accessibility',
  'accessibility.lead':
    'Layunin ng {brand} na magamit ng lahat, sa anumang device, sa mabagal na koneksyon.',
  'accessibility.standardTitle': 'Ang aming pamantayan',
  'accessibility.standardBody':
    'Target namin ang WCAG 2.1 AA bilang minimum, at sinusubok gamit ang keyboard at screen reader.',
  'accessibility.featuresTitle': 'Ang ginagawa namin',
  'accessibility.feedbackTitle': 'Feedback',
  'accessibility.feedbackBody':
    'May nakita kang problema sa accessibility? Sabihin mo sa amin at aayusin namin.',
  'accessibility.feedbackCta': 'Iulat ang isyu',

  // Resources
  'resources.title': 'Mga opisyal na sanggunian',
  'resources.eyebrow': 'Mga opisyal na sanggunian',
  'resources.lead': 'Mga dokumento at site sa likod ng bawat gabay sa {brand}.',
  'resources.officialTitle': 'Mga opisyal na sanggunian',
  'resources.officialBody':
    'Ito ang mga sanggunian na tinutukoy namin. Kaagapay ang {brand}; hindi nito pinapalitan ang mga ito.',
  'resources.notHandledTitle': 'Hindi sakop ng pamahalaang {lguKind}',
  'resources.notHandledBody':
    'May mga serbisyong inaasahan sa LGU ngunit pinapatakbo ng ibang ahensya.',

  // About
  'about.title': 'Tungkol sa {place}',
  'about.eyebrow': 'Tungkol',
  'about.lead':
    '{place}, {province}: mga katotohanan mula sa opisyal na sanggunian, hindi haka-haka.',
  'about.factsTitle': '{place} sa isang tingin',
  'about.barangaysTitle': 'Ang {barangays} barangay',
  'about.barangaysBody':
    'Isinusulat pa ang kumpletong listahan ng {barangays} barangay mula sa opisyal na sanggunian.',
  'about.sourcesTitle': 'Mga sanggunian',
  'about.sourcesBody':
    'Bawat katotohanan sa pahinang ito ay tinutukoy sa isang opisyal na dokumento.',

  // Offices
  'offices.title': 'Mga opisina',
  'offices.eyebrow': 'Mga opisina',
  'offices.lead': 'Saan pupunta para sa mga serbisyo ng {lguPhrase}.',
  'offices.place': '{place}, {province}',
  'offices.noteTitle': 'Tungkol sa listahang ito',
  'offices.noteBody':
    'Ang mga pangalan ng opisina ay kinopya nang tuwiran mula sa Citizen\u2019s Charter. Inilalathala lamang ang mga napapatunayang detalye.',

  // Services directory
  'servicesDir.title': 'Mga serbisyo',
  'servicesDir.eyebrow': 'Mga serbisyo',
  'servicesDir.lead': 'Bawat napapatunayang gabay sa serbisyo, nakagrupo ayon sa opisina.',
  'servicesDir.empty': 'Wala pang napapatunayang gabay sa serbisyo.',
  'servicesDir.emptyBody':
    'Inilalathala lamang ang mga gabay pagkatapos pumasa sa verified-only gate. Bumalik ka na lang mamaya.',

  // Remaining Filipino for the secondary pages (draft; translation owner reviews).
  'howItWorks.step.1': 'Hakbang 1',
  'howItWorks.step.1.title': 'Hanapin ang pahina sa Charter',
  'howItWorks.step.1.body': 'Nagsisimula ang bawat serbisyo sa pahina nito sa {charterTitle}.',
  'howItWorks.step.2': 'Hakbang 2',
  'howItWorks.step.2.title': 'Isulat sa payak na salita',
  'howItWorks.step.2.body':
    'Isang volunteer ang mano-manong nagta-transcribe nito, sa Ingles at Filipino.',
  'howItWorks.step.3': 'Hakbang 3',
  'howItWorks.step.3.title': 'Suriin nang dalawang beses',
  'howItWorks.step.3.body':
    'Binabasa ng pangalawang tao ang parehong pahina at kinukumpirma ang bawat requirement, bayarin, at hakbang.',
  'howItWorks.step.4': 'Hakbang 4',
  'howItWorks.step.4.title': 'I-publish na may petsa',
  'howItWorks.step.4.body':
    'Makikita sa gabay ang edisyon ng Charter at ang petsa ng huling beripikasyon.',
  'howItWorks.principle.accuracy.title': 'Katumpakan muna',
  'howItWorks.principle.accuracy.body':
    'Mas mabuti ang walang pahina kaysa sa maling pahina. Hindi inilalagay sa site ang mga detalyeng hindi pa nakukumpirma.',
  'howItWorks.principle.source.title': 'Banggitin ang sanggunian',
  'howItWorks.principle.source.body':
    'Ang bawat katotohanan ay may link o pagbanggit sa opisyal na dokumentong pinagmulan nito.',
  'howItWorks.principle.plain.title': 'Payak na wika',
  'howItWorks.principle.plain.body':
    'Isinulat para sa taong nagmamadali, gumagamit ng cellphone, at mabagal ang koneksyon.',
  'howItWorks.principle.open.title': 'Bukas at gawa ng komunidad',
  'howItWorks.principle.open.body': 'Kahit sino ay maaaring tumulong. Bukas ang code at ang data.',
  'contribute.way.data.title': 'Pagwawasto ng data',
  'contribute.way.data.body': 'Itama ang maling opisina, serbisyo, bayarin, opisyal, o contact.',
  'contribute.way.translation.title': 'Pagsasalin',
  'contribute.way.translation.body': 'Isalin ang nilalamang Ingles sa Filipino, o kabaligtaran.',
  'contribute.way.design.title': 'Disenyo at accessibility',
  'contribute.way.design.body':
    'Pagandahin ang layout, contrast, paggamit ng keyboard, at suporta sa screen reader.',
  'contribute.way.code.title': 'Code',
  'contribute.way.code.body': 'Gumawa ng mga pahina, component, search, at mga tool para sa site.',
  'contribute.data.li1': 'isang URL ng opisyal na sanggunian',
  'contribute.data.li2': 'petsa ng pagkuha',
  'contribute.data.li3': 'petsa ng beripikasyon',
  'contribute.data.cta': 'Basahin ang gabay sa pag-ambag',
  'contribute.workflow.1': 'Mag-branch mula sa main at gawin ang iyong pagbabago.',
  'contribute.workflow.2': 'Patakbuhin ang pnpm format, lint, check, test, at build.',
  'contribute.workflow.3': 'Magbukas ng pull request at punan ang template.',
  'contribute.workflow.4': 'Susuriin at i-merge ito ng isang maintainer.',
  'accessibility.standard.li1': 'Semantic HTML at mga landmark sa bawat pahina.',
  'accessibility.standard.li2': 'Sapat na contrast at nakikitang focus state.',
  'accessibility.standard.li3': "Gumagana kahit walang JavaScript hangga't maaari.",
  'accessibility.feature.skip.title': 'Skip link',
  'accessibility.feature.skip.body':
    'May skip link sa itaas ng bawat pahina na naglilipat ng focus sa pangunahing nilalaman.',
  'accessibility.feature.contrast.title': 'Contrast',
  'accessibility.feature.contrast.body':
    'Pasok ang teksto at mga kontrol sa contrast ratio ng WCAG AA.',
  'accessibility.feature.keyboard.title': 'Keyboard',
  'accessibility.feature.keyboard.body':
    'Maaabot at magagamit gamit ang keyboard ang lahat ng interactive na elemento.',
  'accessibility.feature.motion.title': 'Galaw',
  'accessibility.feature.motion.body': 'Iginagalang ng mga animation ang prefers-reduced-motion.',
  'accessibility.feature.lang.title': 'Wika',
  'accessibility.feature.lang.body':
    'May tamang lang attribute ang mga pahina, at available ang Filipino.',
  'accessibility.feature.print.title': 'Pag-print',
  'accessibility.feature.print.body':
    'Malinis na nagpi-print ang mga sheet ng serbisyo bilang isang pahina.',
  'resources.open': 'Buksan',
  'resources.r1.name': 'Website ng LGU ng {place}',
  'resources.r1.desc': 'Mga opisyal na anunsyo',
  'resources.r2.name': "Citizen's Charter {charterYear} (PDF)",
  'resources.r2.desc': 'Ang sanggunian ng bawat gabay',
  'resources.r3.name': '{council} ng {place}',
  'resources.r3.desc': 'Mga ordinansa at sesyon',
  'resources.r4.name': 'Philippine Statistics Authority',
  'resources.r4.desc': 'Datos ng populasyon at census',
  'resources.r5.name': 'PhilHealth',
  'resources.r5.desc': 'Health insurance',
  'resources.r6.name': 'SSS',
  'resources.r6.desc': 'Social security',
  'resources.notHandled.1': 'Pagpaparehistro sa National ID (PSA)',
  'resources.notHandled.2': 'Aplikasyon sa passport (DFA)',
  'resources.notHandled.3': 'Lisensya sa pagmamaneho (LTO)',
  'resources.notHandled.4': 'Pagpaparehistro bilang botante (COMELEC)',
  'about.stat.pop': 'Populasyon',
  'about.stat.pop.src': '{censusSource}',
  'about.stat.brgy': 'Mga barangay',
  'about.stat.brgy.src': 'Buong listahan sa Tungkol sa {place}',
  'about.stat.services': 'Mga serbisyong pampubliko',
  'about.stat.services.src': "Citizen's Charter, {charterEdition}",
  'about.stat.offices': 'Mga opisina at unit',
  'about.stat.offices.src': "Citizen's Charter, {charterEdition}",
  'about.sources.li1': '{censusSource}, petsa ng sanggunian: {censusDate}',
  'about.sources.li2': '{charterTitle}, {charterEdition}',
  'offices.placeSub':
    "Nakalista ayon sa opisina ang mga serbisyo ng {lguKind} sa Citizen's Charter.",
  'offices.brgy': 'Mga barangay',
  'offices.charter': 'Mga opisina sa Charter',
};

const ui: Record<Lang, Partial<Record<Key, string>>> = { en, fil };

/** Every interface key, for tests. */
export const uiKeys = Object.keys(en) as Key[];

const values = { en: placeholderValues(lgu, 'en'), fil: placeholderValues(lgu, 'fil') };

/** A string for any LGU config. `t()` is this with the site's own config. */
export function tFor(config: LguConfig, lang: Lang, key: Key): string {
  return fillPlaceholders(ui[lang][key] ?? en[key], placeholderValues(config, lang));
}

/** Translated string, falling back to English, with placeholders filled from src/config/lgu.ts. */
export function t(lang: Lang, key: Key): string {
  return fillPlaceholders(ui[lang][key] ?? en[key], values[lang]);
}

export interface Lookup {
  text: string;
  /** False when `lang` has no string of its own and the English is showing. */
  translated: boolean;
}

/**
 * String for a key that only exists at build time, such as the `page.sitemap`
 * label of a route discovered in `src/lib/routes.ts`. Returns undefined when no
 * language has the key, so callers can fall back to their own English name.
 */
export function lookup(lang: Lang, key: string): Lookup | undefined {
  const fallback = (en as Record<string, string>)[key];
  if (fallback === undefined) return undefined;
  if (lang === 'en') return { text: fillPlaceholders(fallback, values.en), translated: true };
  const value = (fil as Record<string, string>)[key];
  return value === undefined
    ? { text: fillPlaceholders(fallback, values.fil), translated: false }
    : { text: fillPlaceholders(value, values.fil), translated: true };
}
