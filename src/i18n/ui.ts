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
  'nav.tourism': 'Tourism',
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
  'page.tourism': 'Tourism',
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
  'home.sheet.b': 'one clear sheet.',
  'home.sheet.body':
    'Every guide prints on its own sheet: where to go, what to bring, how much, and how long, with its Charter page at the bottom. Some guides run to two pages. Bring it with you, or print it for someone who is not online.',
  'home.sheet.sample': 'See a sample sheet',
  'home.sheet.pick': 'Pick a service',
  'home.sheet.printable': 'Printable',
  'home.sheet.label': 'Service sheet',
  'home.sheet.example': 'Get a cedula',
  'home.sheet.where.val': '{lguAdj} Treasurer',
  'home.sheet.foot': "Citizen's Charter pp. 225–227",
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

  // Shared by SourceNote.astro and the directory pending notices
  'source.label': 'Source',
  'directory.pending.body':
    'Names and descriptions below are in English until their Filipino translation is reviewed.',

  // Landing page (Home.astro)

  // How it works (/how-it-works/)
  'howItWorks.title': 'How a guide gets made',
  'howItWorks.eyebrow': 'Behind the scenes',
  'howItWorks.lead':
    'Every guide on {brand} goes through the same four steps, so you can trust what you read.',
  'howItWorks.stepsTitle': 'The four steps',
  'howItWorks.principlesTitle': 'The rules we follow',
  'howItWorks.volunteerTitle': 'Help write the next guide',
  'howItWorks.volunteerBody':
    "Volunteers read the Charter, write each service in plain words, and check each other's work. No coding needed.",
  'howItWorks.volunteerCta': 'Volunteer on GitHub',
  'howItWorks.step.1': 'Step 1',
  'howItWorks.step.1.title': 'Find the Charter page',
  'howItWorks.step.1.body': 'Each service starts from its page in the {charterTitle}.',
  'howItWorks.step.2': 'Step 2',
  'howItWorks.step.2.title': 'Write it in plain words',
  'howItWorks.step.2.body': 'A volunteer copies it by hand, in English and Filipino.',
  'howItWorks.step.3': 'Step 3',
  'howItWorks.step.3.title': 'Check it twice',
  'howItWorks.step.3.body':
    'A second person reads the same page and checks every requirement, fee, and step.',
  'howItWorks.step.4': 'Step 4',
  'howItWorks.step.4.title': 'Publish with dates',
  'howItWorks.step.4.body':
    'The guide shows which Charter edition it follows and the date it was last checked.',
  'howItWorks.principle.accuracy.title': 'Accuracy first',
  'howItWorks.principle.accuracy.body':
    'A missing page is better than a wrong one. Details that are not confirmed stay off the site.',
  'howItWorks.principle.source.title': 'Show where it came from',
  'howItWorks.principle.source.body': 'Every fact points to the official document it came from.',
  'howItWorks.principle.plain.title': 'Plain language',
  'howItWorks.principle.plain.body':
    'Written for someone in a hurry, on a phone, on a slow connection.',
  'howItWorks.principle.open.title': 'Open and community-built',
  'howItWorks.principle.open.body': 'Anyone can contribute. The code and the data are open.',
  'howItWorks.notDoTitle': 'What this site does not do',
  'howItWorks.notDo.li1': 'It takes no payments.',
  'howItWorks.notDo.li2': 'It takes no applications. You still apply at the office.',
  'howItWorks.notDo.li3': 'It has no accounts and asks for no personal details.',
  'howItWorks.notDo.li4': 'It is not an official website of the {place} local government.',
  'howItWorks.statusTitle': 'What the labels mean',
  'howItWorks.statusBody':
    'Every guide has one of three labels. Only "verified" guides appear on {brand}.',
  'howItWorks.status.verified':
    'Checked against the {charterTitle} by a person who did not write it. It matches the official document. The local government has not confirmed it.',
  'howItWorks.status.needsConfirmation':
    'Written from the official document, but not checked yet. It is not published.',
  'howItWorks.status.outdated':
    'It was checked before, but the official document may have changed. It is not published until it is checked again.',
  'howItWorks.secondChecker':
    'Every service guide is checked by a second person, who did not write it, before it is published.',
  'howItWorks.reportTitle': 'Found a wrong detail?',
  'howItWorks.reportBody':
    'Use the report form on GitHub. You need a free GitHub account. Say what is wrong and link the official document that shows the right detail.',
  'howItWorks.reportNext':
    'A team member compares your report with the official document. If the guide is wrong, it is fixed, and the change is checked before it goes live.',

  // Contribute (/contribute/)
  'contribute.title': 'Contribute',
  'contribute.eyebrow': 'Get involved',
  'contribute.lead': '{brand} is built by its community. You do not need to know code to help.',
  'contribute.waysTitle': 'Ways to help',
  'contribute.way.data.title': 'Correct the details',
  'contribute.way.data.body':
    'For data volunteers: fix a wrong office, service, fee, official, or contact details.',
  'contribute.way.translation.title': 'Translation',
  'contribute.way.translation.body': 'Turn English text into Filipino, or Filipino into English.',
  'contribute.way.design.title': 'Design and accessibility',
  'contribute.way.design.body':
    'Improve the layout, the text colours, and how well the site works for people with disabilities.',
  'contribute.way.code.title': 'Code (for developers)',
  'contribute.way.code.body': 'Build pages, search, and tools for the site.',
  'contribute.way.report.title': 'Report a wrong detail',
  'contribute.way.report.body':
    'Use the form to tell us about a wrong or old detail. Add a link to the official document if you can.',
  'contribute.way.check.title': 'Check a written guide',
  'contribute.way.check.body':
    'Open a guide next to its page in the {charterTitle}. Report any difference you find.',
  'contribute.noCode': 'No coding needed',
  'contribute.secondChecker':
    'Before a service guide goes online, a second team member who did not write it checks it against the official document.',
  'contribute.dataTitle': 'For data volunteers',
  'contribute.dataBody':
    'Every fact needs a link to its official source, the date you looked it up, and the date it was checked.',
  'contribute.data.li1': 'a link to the official source',
  'contribute.data.li2': 'the date you looked it up',
  'contribute.data.li3': 'the date it was checked',
  'contribute.data.cta': 'Read the full how-to guide',
  'contribute.workflowTitle': 'For developers: how changes go in',
  'contribute.workflowBody':
    'Keep each change small and on one topic. Automatic checks must pass, and a reviewer must approve it.',
  'contribute.workflow.1': 'Start a branch (your own copy) from main and make your change.',
  'contribute.workflow.2': 'Run pnpm format, lint, check, test, and build.',
  'contribute.workflow.3': 'Open a pull request (a proposed change) and fill in the form.',
  'contribute.workflow.4': 'A maintainer checks it and adds it to the site.',

  // Accessibility (/accessibility/)
  'accessibility.title': 'Accessibility statement',
  'accessibility.eyebrow': 'Accessibility',
  'accessibility.lead':
    '{brand} aims to be easy to use for everyone, on any phone or computer, even on a slow connection.',
  'accessibility.standardTitle': 'The standard we aim for',
  'accessibility.standardBody': 'We aim for an international accessibility standard (WCAG 2.1 AA).',
  'accessibility.standard.li1':
    'Every page has clear headings and sections, so tools that read pages aloud should be able to follow them.',
  'accessibility.standard.li2':
    'Text is easy to see against its background. The link or button you are on is clearly marked. An automatic check of text colours runs on every update.',
  'accessibility.standard.li3':
    'Works even if scripts are turned off in your browser, where possible.',
  'accessibility.featuresTitle': 'What we do',
  'accessibility.feature.skip.title': 'Jump to main text',
  'accessibility.feature.skip.body':
    'A "skip" link at the top of every page jumps straight to the main content.',
  'accessibility.feature.contrast.title': 'Easy-to-read colours',
  'accessibility.feature.contrast.body':
    'Colours are chosen to be easy to read. An automatic checker tests them.',
  'accessibility.feature.text.title': 'Text size',
  'accessibility.feature.text.body':
    'Text follows the size you set in your browser, and you can zoom in. An automatic check looks for sideways scrolling on a narrow screen.',
  'accessibility.feature.keyboard.title': 'Keyboard use',
  'accessibility.feature.keyboard.body':
    'Links and buttons can be reached with a keyboard. A full keyboard test has not been done yet.',
  'accessibility.feature.motion.title': 'Movement',
  'accessibility.feature.motion.body':
    'The site follows your phone\'s "reduce motion" setting for its animations.',
  'accessibility.feature.lang.title': 'Language',
  'accessibility.feature.lang.body':
    'Each page tells the browser which language it is in. Filipino is available.',
  'accessibility.feature.print.title': 'Print',
  'accessibility.feature.print.body':
    'Service guides have a print version with the four key answers and the source, on one or two pages.',
  'accessibility.gapsTitle': 'What is still missing',
  'accessibility.gaps.li2':
    'We have not yet tested the site with apps that read pages aloud, or on real phones.',
  'accessibility.gaps.li3': 'The Filipino text is a draft. A translator has not checked it yet.',
  'accessibility.gaps.li4':
    'Automatic checks find only some problems. They cannot tell whether a page is clear or makes sense when read aloud.',
  'accessibility.reviewTitle': 'How we check the site',
  'accessibility.reviewBody':
    'An automatic checker runs on the main pages, in English and Filipino, on every update to the site.',
  'accessibility.feedbackTitle': 'Feedback',
  'accessibility.feedbackBody': 'Found something hard to use? Tell us and we will fix it.',
  'accessibility.feedbackCta': 'Report a problem',

  // Resources (/resources/)
  'resources.title': 'Official resources',
  'resources.eyebrow': 'Official sources',
  'resources.lead': 'The documents and sites behind every guide on {brand}.',
  'resources.officialTitle': 'Official resources',
  'resources.officialBody':
    'These are the sources we cite. {brand} complements them; it does not replace them.',
  'resources.open': 'Open',
  'resources.notHandledTitle': 'Not handled by the {lguKind}',
  'resources.notHandledBody': 'Some services people expect from the LGU are run by other agencies.',
  'resources.lastChecked': 'Last checked',
  'resources.officialPending':
    'More official links are being checked. Only checked links appear here.',
  'resources.notHandledPending':
    'The links to other agencies are being checked. Only checked links appear here.',

  // About (/about/)
  'about.title': 'About {place}',
  'about.eyebrow': 'About',
  'about.lead': '{place}, {province}: facts from the official sources, not guesses.',
  'about.factsTitle': '{place} at a glance',
  'about.stat.pop': 'Population',
  'about.stat.pop.src': '{censusSource}, reference date {censusDate}',
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
  'about.brgy.name': 'Barangay',
  'about.brgy.population': 'Population',
  'about.brgy.censusYear': 'Census year',
  'about.brgy.partial':
    'These barangays have been checked so far. The rest are still being checked against the official source.',

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
  'offices.detailsTitle': 'What each office does',
  'offices.detailsPending':
    "Each office's description and source are being checked against the Citizen\u2019s Charter. Only checked offices appear here.",
  'offices.guides': 'Guides for this office',
  'offices.phone': 'Phone',
  'offices.contactsNote':
    'Office phone numbers are from the Citizen\u2019s Charter and were checked on the date shown.',
  'offices.officialsTitle': 'Elected officials',
  'offices.officialsBody': 'Names and positions only, from official sources.',
  'offices.officialsPending':
    'The list of elected officials is being checked against official sources.',
  'offices.term': 'Term',
  'offices.position.mayor': '{lguAdj} Mayor',
  'offices.position.vice-mayor': '{lguAdj} Vice Mayor',
  'offices.position.sb-member': '{council} Member',

  // Services directory (/services/)
  'servicesDir.title': 'Services',
  'servicesDir.eyebrow': 'Services',
  'servicesDir.lead': 'Every verified service guide, grouped by office.',
  'servicesDir.empty': 'No verified service guides yet.',
  'servicesDir.emptyBody':
    'A guide goes online only after a second person checks it against the {charterTitle}.',
  'servicesDir.stat.published': 'Verified guides online',
  'servicesDir.stat.charterServices': 'Services in the Charter',
  'servicesDir.emptyCta': 'Help check a guide',

  // Tourism (/tourism/)
  'tourism.title': 'Tourism in {place}',
  'tourism.eyebrow': 'Tourism',
  'tourism.lead':
    'Tourist spots in {place}, {province}: where they are, what they are, and what they offer.',
  'tourism.spotsTitle': 'Tourist',
  'tourism.spotsHighlight': 'spots.',
  'tourism.spotsSub': 'Places worth a visit, with what each one offers.',
  'tourism.address': 'Where',
  'tourism.offer': 'What it offers',
  'tourism.unverified': 'Unverified',
  'tourism.noteTitle': 'A note on this page',
  'tourism.noteBody':
    '{brand} publishes information only. Bookings, tours, and payments stay with the {lguKind} tourism office.',
  'tourism.unverifiedNote':
    'Spots marked "Unverified" are community-compiled and have not been checked against an official source. Confirm details with the tourism office before travelling.',
  'tourism.empty': 'No tourist spots listed yet.',
  'tourism.emptyBody': 'Spots appear here after a contributor adds them to the content collection.',

  // Tourism filters
  'tourism.filters.groupLegend': 'Show',
  'tourism.filters.typeLegend': 'Type',
  'tourism.filters.all': 'All',
  'tourism.filters.allGroups': 'All kinds of visit',
  'tourism.filters.allTypes': 'All types',
  'tourism.filters.shown': 'Spots shown:',
  'tourism.filters.none': 'No spots match these filters.',
  'tourism.filters.noScript': 'Filters need JavaScript. Every spot is listed below.',

  // Visitor groups and place types, in taxonomy order
  'tourism.group.see': 'See',
  'tourism.group.eat': 'Eat',
  'tourism.group.stay': 'Stay',
  'tourism.group.do': 'Do',
  'tourism.cat.heritage': 'Heritage sites',
  'tourism.cat.church': 'Churches',
  'tourism.cat.museum': 'Museums',
  'tourism.cat.park': 'Parks',
  'tourism.cat.nature': 'Nature',
  'tourism.cat.beach': 'Beaches',
  'tourism.cat.view-deck': 'View decks',
  'tourism.cat.cafe': 'Cafes',
  'tourism.cat.restaurant': 'Restaurants',
  'tourism.cat.market': 'Markets',
  'tourism.cat.villa': 'Villas',
  'tourism.cat.resort': 'Resorts',
  'tourism.cat.homestay': 'Homestays',
  'tourism.cat.inn': 'Inns',
  'tourism.cat.festival': 'Festivals',
  'tourism.cat.tour': 'Tours',
  'tourism.cat.adventure': 'Adventures',
  'tourism.cat.school': 'Schools',
  'tourism.cat.salon': 'Salons',
  'tourism.cat.computer-shop': 'Computer shops',
  'tourism.cat.bakery': 'Bakeries',

  // Service guide page (/services/<id>/)
  'guide.eyebrow': 'Service guide',
  'guide.lastVerified': 'Last verified',
  'guide.pending.label': 'translation-pending',
  'guide.pending.body': 'The guide below is in English until its Filipino translation is reviewed.',
  'guide.sheet.a': 'Four answers,',
  'guide.sheet.b': 'ready to print.',
  'guide.sheet.sub':
    'Where to go, what to bring, how much, and how long. This part is laid out for print.',
  'guide.where.office': 'Office',
  'guide.where.walkIn': 'Walk-in location',
  'guide.req.copies': 'Copies',
  'guide.req.form': 'Form',
  'guide.req.form.original': 'Original',
  'guide.req.form.photocopy': 'Photocopy',
  'guide.req.form.certified_true_copy': 'Certified true copy',
  'guide.req.whereToGet': 'Where to get it',
  'guide.conditions': 'Conditions',
  'guide.fee.basedOn': 'Based on',
  'guide.fee.basis': 'Basis',
  'guide.fee.purpose': 'For',
  'guide.fee.whereToPay': 'Where to pay',
  'guide.details.a': 'The',
  'guide.details.b': 'details.',
  'guide.about': 'About this service',
  'guide.eligibility': 'Who can apply',
  'guide.classification': 'Classification',
  'guide.classification.simple': 'Simple',
  'guide.classification.complex': 'Complex',
  'guide.classification.highly_technical': 'Highly technical',
  'guide.transactionType': 'Transaction type',
  'guide.steps': 'Steps',
  'guide.step': 'Step',
  'guide.step.applicant': 'You',
  'guide.step.office': 'The office',
  'guide.step.responsible': 'Responsible',
  'guide.step.maxTime': 'Maximum time',
  'guide.channels': 'Ways to apply',
  'guide.channel.walkIn': 'In person',
  'guide.channel.online': 'Online',
  'guide.channel.location': 'Location',
  'guide.channel.link': 'Link',
  'guide.channel.open': 'Open the online service',
  'guide.channel.supports': 'What works online (tested)',
  'guide.channel.account': 'Account needed',
  'guide.channel.lastTested': 'Last tested',
  'guide.yes': 'Yes',
  'guide.no': 'No',
  'guide.complaint': 'How to file a complaint',
  'guide.notes': 'Notes',
  'guide.source.a': 'Where this',
  'guide.source.b': 'comes from.',
  'guide.source.link': 'Open the official source',
  'guide.source.edition': 'Edition',
  'guide.source.pagesLabel': 'Pages',
  'guide.source.page': 'p.',
  'guide.source.pages': 'pp.',
  'guide.source.retrieved': 'Retrieved',
  'guide.source.verifiedBy': 'Verified by',
  'guide.source.effective': 'Effective',
  'guide.print.online': 'Latest version online:',
  'guide.print.omitted': 'Rows not shown here are not stated in the official source.',
  'guide.report.lead': 'Something wrong or out of date?',
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
  'nav.tourism': 'Turismo',
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
  'page.tourism': 'Turismo',
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
  'home.sheet.b': 'isang malinaw na pahina.',
  'home.sheet.body':
    'Ang bawat gabay ay may sariling sheet: saan pupunta, ano ang dadalhin, magkano, at gaano katagal, kasama ang pahina nito sa Charter sa ibaba. May mga gabay na umabot sa dalawang pahina. Dalhin ito, o i-print para sa taong walang internet.',
  'home.sheet.sample': 'Tingnan ang sample na sheet',
  'home.sheet.pick': 'Pumili ng serbisyo',
  'home.sheet.printable': 'Maipi-print',
  'home.sheet.label': 'Sheet ng serbisyo',
  'home.sheet.example': 'Kumuha ng cedula',
  'home.sheet.where.val': '{lguAdj} Treasurer',
  'home.sheet.foot': "Citizen's Charter p. 225–227",
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

  // Shared by SourceNote.astro and the directory pending notices
  'source.label': 'Sanggunian',
  'directory.pending.body':
    'Nasa Ingles ang mga pangalan at paglalarawan sa ibaba hanggang masuri ang salin sa Filipino.',

  // Landing page (Home.astro)

  // How it works
  'howItWorks.title': 'Paano ginagawa ang isang gabay',
  'howItWorks.eyebrow': 'Sa likod ng eksena',
  'howItWorks.lead':
    'Dumadaan ang bawat gabay sa {brand} sa parehong apat na hakbang, kaya mapagkakatiwalaan mo ang binabasa mo.',
  'howItWorks.stepsTitle': 'Ang apat na hakbang',
  'howItWorks.principlesTitle': 'Mga patakarang sinusunod namin',
  'howItWorks.volunteerTitle': 'Tumulong sumulat ng susunod na gabay',
  'howItWorks.volunteerBody':
    "Binabasa ng mga boluntaryo ang Charter, isinusulat ang bawat serbisyo sa simpleng wika, at tinitingnan ang gawa ng isa't isa. Hindi kailangan ng coding.",
  'howItWorks.volunteerCta': 'Makipagboluntaryo sa GitHub',

  // Contribute
  'contribute.title': 'Makibahagi',
  'contribute.eyebrow': 'Sumali',
  'contribute.lead': 'Gawa ng komunidad ang {brand}. Hindi kailangan ng coding para makibahagi.',
  'contribute.waysTitle': 'Mga paraan para makatulong',
  'contribute.dataTitle': 'Para sa mga data volunteer',
  'contribute.dataBody':
    'Bawat detalye ay kailangan ng link sa opisyal na sanggunian, ang petsa ng paghahanap nito, at ang petsa ng pagsusuri.',
  'contribute.workflowTitle': 'Para sa mga developer: paano napupunta sa site ang mga pagbabago',
  'contribute.workflowBody':
    'Panatilihing maliit at iisa ang paksa ng bawat pagbabago. Dapat pumasa ang mga awtomatikong pagsusuri, at kailangan ng approval ng isang reviewer.',

  // Accessibility
  'accessibility.title': 'Pahayag ng accessibility',
  'accessibility.eyebrow': 'Accessibility',
  'accessibility.lead':
    'Layunin ng {brand} na magamit ng lahat, sa anumang telepono o computer, kahit mabagal ang koneksyon.',
  'accessibility.standardTitle': 'Ang pamantayang gusto naming abutin',
  'accessibility.standardBody':
    'Target namin ang isang internasyonal na pamantayan sa accessibility (WCAG 2.1 AA).',
  'accessibility.featuresTitle': 'Ang ginagawa namin',
  'accessibility.feedbackTitle': 'Feedback',
  'accessibility.feedbackBody':
    'May nahirapan ka ba sa paggamit ng site? Sabihin mo sa amin at aayusin namin.',
  'accessibility.feedbackCta': 'Iulat ang problema',

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
  'offices.detailsTitle': 'Ano ang ginagawa ng bawat opisina',
  'offices.detailsPending':
    'Sinusuri pa ang paglalarawan at sanggunian ng bawat opisina laban sa Citizen\u2019s Charter. Ang mga nasuri lamang ang lumalabas dito.',
  'offices.guides': 'Mga gabay para sa opisinang ito',
  'offices.phone': 'Telepono',
  'offices.contactsNote':
    'Ang mga numero ng telepono ng opisina ay mula sa Citizen\u2019s Charter at sinuri sa petsang nakasaad.',
  'offices.officialsTitle': 'Mga halal na opisyal',
  'offices.officialsBody': 'Pangalan at posisyon lamang, mula sa mga opisyal na sanggunian.',
  'offices.officialsPending':
    'Sinusuri pa ang listahan ng mga halal na opisyal laban sa mga opisyal na sanggunian.',
  'offices.term': 'Termino',
  'offices.position.mayor': 'Alkalde',
  'offices.position.vice-mayor': 'Bise Alkalde',
  'offices.position.sb-member': 'Kagawad ng {council}',

  // Services directory
  'servicesDir.title': 'Mga serbisyo',
  'servicesDir.eyebrow': 'Mga serbisyo',
  'servicesDir.lead': 'Bawat napapatunayang gabay sa serbisyo, nakagrupo ayon sa opisina.',
  'servicesDir.empty': 'Wala pang napapatunayang gabay sa serbisyo.',
  'servicesDir.emptyBody':
    'Ilalathala lang ang gabay kapag nasuri na ito ng pangalawang tao laban sa {charterTitle}.',
  'servicesDir.stat.published': 'Nailathalang verified na gabay',
  'servicesDir.stat.charterServices': 'Mga serbisyo sa Charter',
  'servicesDir.emptyCta': 'Tumulong sumuri ng gabay',

  // Service guide page (draft; translation owner reviews, #59)
  'guide.eyebrow': 'Gabay sa serbisyo',
  'guide.lastVerified': 'Huling napatunayan',
  'guide.pending.label': 'translation-pending',
  'guide.pending.body':
    'Nasa Ingles ang gabay sa ibaba hanggang masuri ang salin nito sa Filipino.',
  'guide.sheet.a': 'Apat na sagot,',
  'guide.sheet.b': 'handa nang i-print.',
  'guide.sheet.sub':
    'Saan pupunta, ano ang dadalhin, magkano, at gaano katagal. Inihanda ang bahaging ito para sa pag-print.',
  'guide.where.office': 'Opisina',
  'guide.where.walkIn': 'Lokasyon para sa personal na pagpunta',
  'guide.req.copies': 'Bilang ng kopya',
  'guide.req.form': 'Anyo',
  'guide.req.form.original': 'Orihinal',
  'guide.req.form.photocopy': 'Photocopy',
  'guide.req.form.certified_true_copy': 'Certified true copy',
  'guide.req.whereToGet': 'Saan makukuha',
  'guide.conditions': 'Mga kondisyon',
  'guide.fee.basedOn': 'Batay sa',
  'guide.fee.basis': 'Batayan',
  'guide.fee.purpose': 'Para sa',
  'guide.fee.whereToPay': 'Saan magbabayad',
  'guide.details.a': 'Ang mga',
  'guide.details.b': 'detalye.',
  'guide.about': 'Tungkol sa serbisyong ito',
  'guide.eligibility': 'Sino ang puwedeng mag-apply',
  'guide.classification': 'Klasipikasyon',
  'guide.classification.simple': 'Simple',
  'guide.classification.complex': 'Komplikado',
  'guide.classification.highly_technical': 'Lubhang teknikal',
  'guide.transactionType': 'Uri ng transaksyon',
  'guide.steps': 'Mga hakbang',
  'guide.step': 'Hakbang',
  'guide.step.applicant': 'Ikaw',
  'guide.step.office': 'Ang opisina',
  'guide.step.responsible': 'Responsable',
  'guide.step.maxTime': 'Pinakamatagal na oras',
  'guide.channels': 'Mga paraan ng pag-apply',
  'guide.channel.walkIn': 'Personal',
  'guide.channel.online': 'Online',
  'guide.channel.location': 'Lokasyon',
  'guide.channel.link': 'Link',
  'guide.channel.open': 'Buksan ang online na serbisyo',
  'guide.channel.supports': 'Ano ang gumagana online (nasubukan)',
  'guide.channel.account': 'Kailangan ng account',
  'guide.channel.lastTested': 'Huling sinubukan',
  'guide.yes': 'Oo',
  'guide.no': 'Hindi',
  'guide.complaint': 'Paano magreklamo',
  'guide.notes': 'Mga tala',
  'guide.source.a': 'Saan ito',
  'guide.source.b': 'nanggaling.',
  'guide.source.link': 'Buksan ang opisyal na sanggunian',
  'guide.source.edition': 'Edisyon',
  'guide.source.pagesLabel': 'Mga pahina',
  'guide.source.page': 'p.',
  'guide.source.pages': 'pp.',
  'guide.source.retrieved': 'Kinuha noong',
  'guide.source.verifiedBy': 'Sinuri ni',
  'guide.source.effective': 'Epektibo mula',
  'guide.print.online': 'Pinakabagong bersyon online:',
  'guide.print.omitted': 'Ang mga detalyeng wala rito ay hindi nakasaad sa opisyal na sanggunian.',
  'guide.report.lead': 'May mali o luma na ba rito?',

  // Remaining Filipino for the secondary pages (draft; translation owner reviews).
  'howItWorks.step.1': 'Hakbang 1',
  'howItWorks.step.1.title': 'Hanapin ang pahina sa Charter',
  'howItWorks.step.1.body': 'Nagsisimula ang bawat serbisyo sa pahina nito sa {charterTitle}.',
  'howItWorks.step.2': 'Hakbang 2',
  'howItWorks.step.2.title': 'Isulat sa payak na salita',
  'howItWorks.step.2.body':
    'Isang volunteer ang kumokopya nito nang mano-mano, sa Ingles at Filipino.',
  'howItWorks.step.3': 'Hakbang 3',
  'howItWorks.step.3.title': 'Suriin nang dalawang beses',
  'howItWorks.step.3.body':
    'Binabasa ng pangalawang tao ang parehong pahina at kinukumpirma ang bawat requirement, bayarin, at hakbang.',
  'howItWorks.step.4': 'Hakbang 4',
  'howItWorks.step.4.title': 'I-publish na may petsa',
  'howItWorks.step.4.body':
    'Makikita sa gabay ang edisyon ng Charter na sinusundan nito, at ang petsa ng huling pagsusuri.',
  'howItWorks.principle.accuracy.title': 'Katumpakan muna',
  'howItWorks.principle.accuracy.body':
    'Mas mabuti ang walang pahina kaysa sa maling pahina. Hindi inilalagay sa site ang mga detalyeng hindi pa nakukumpirma.',
  'howItWorks.principle.source.title': 'Ipakita kung saan galing',
  'howItWorks.principle.source.body':
    'Ang bawat katotohanan ay tumuturo sa opisyal na dokumentong pinagmulan nito.',
  'howItWorks.principle.plain.title': 'Payak na wika',
  'howItWorks.principle.plain.body':
    'Isinulat para sa taong nagmamadali, gumagamit ng cellphone, at mabagal ang koneksyon.',
  'howItWorks.principle.open.title': 'Bukas at gawa ng komunidad',
  'howItWorks.principle.open.body': 'Kahit sino ay maaaring tumulong. Bukas ang code at ang data.',
  'contribute.way.data.title': 'Itama ang mga detalye',
  'contribute.way.data.body':
    'Para sa mga data volunteer: itama ang maling opisina, serbisyo, bayarin, opisyal, o contact details.',
  'contribute.way.translation.title': 'Pagsasalin',
  'contribute.way.translation.body':
    'Isalin ang tekstong Ingles sa Filipino, o Filipino sa Ingles.',
  'contribute.way.design.title': 'Disenyo at accessibility',
  'contribute.way.design.body':
    'Pagandahin ang layout, mga kulay ng teksto, at kung paano magagamit ng mga taong may kapansanan ang site.',
  'contribute.way.code.title': 'Code (para sa mga developer)',
  'contribute.way.code.body': 'Gumawa ng mga pahina, search, at tool para sa site.',
  'contribute.data.li1': 'link sa opisyal na sanggunian',
  'contribute.data.li2': 'petsa ng paghahanap',
  'contribute.data.li3': 'petsa ng pagsusuri',
  'contribute.data.cta': 'Basahin ang buong gabay kung paano tumulong',
  'contribute.workflow.1':
    'Gumawa ng branch (sarili mong kopya) mula sa main at gawin ang iyong pagbabago.',
  'contribute.workflow.2': 'Patakbuhin ang pnpm format, lint, check, test, at build.',
  'contribute.workflow.3':
    'Magbukas ng pull request (isang panukalang pagbabago) at punan ang form.',
  'contribute.workflow.4': 'Titingnan at idadagdag ito sa site ng isang maintainer.',
  'accessibility.standard.li1':
    'May malinaw na heading at seksyon ang bawat pahina, kaya dapat masundan ito ng mga tool na nagbabasa ng pahina nang malakas.',
  'accessibility.standard.li2':
    'Madaling basahin ang teksto sa kulay ng background nito. Malinaw ang marka sa link o button na pinupuntahan mo. Awtomatikong sinusuri ang kulay ng teksto sa bawat update.',
  'accessibility.standard.li3':
    "Gumagana kahit naka-off ang mga script sa browser mo, hangga't maaari.",
  'accessibility.feature.skip.title': 'Lumaktaw sa pangunahing teksto',
  'accessibility.feature.skip.body':
    'May link na "skip" sa itaas ng bawat pahina na dumidiretso sa pangunahing nilalaman.',
  'accessibility.feature.contrast.title': 'Madaling basahing kulay',
  'accessibility.feature.contrast.body':
    'Pinili ang mga kulay para madaling basahin. Sinusubok ito ng isang awtomatikong checker.',
  'accessibility.feature.keyboard.title': 'Paggamit ng keyboard',
  'accessibility.feature.keyboard.body':
    'Maaabot gamit ang keyboard ang mga link at button. Hindi pa naisasagawa ang buong pagsusuri gamit ang keyboard.',
  'accessibility.feature.motion.title': 'Galaw',
  'accessibility.feature.motion.body':
    'Sinusunod ng site ang setting na "reduce motion" ng telepono mo para sa mga animation.',
  'accessibility.feature.lang.title': 'Wika',
  'accessibility.feature.lang.body':
    'Sinasabi ng bawat pahina sa browser kung anong wika ito. Available ang Filipino.',
  'accessibility.feature.print.title': 'Pag-print',
  'accessibility.feature.print.body':
    'May bersyong pang-print ang mga gabay sa serbisyo, kasama ang apat na pangunahing sagot at ang sanggunian, sa isa o dalawang pahina.',
  'resources.open': 'Buksan',
  'resources.lastChecked': 'Huling sinuri',
  'resources.officialPending':
    'Sinusuri pa ang iba pang opisyal na link. Ang mga nasuri lamang ang lumalabas dito.',
  'resources.notHandledPending':
    'Sinusuri pa ang mga link sa ibang ahensya. Ang mga nasuri lamang ang lumalabas dito.',
  'about.stat.pop': 'Populasyon',
  'about.stat.pop.src': '{censusSource}, petsa ng sanggunian: {censusDate}',
  'about.stat.brgy': 'Mga barangay',
  'about.stat.brgy.src': 'Buong listahan sa Tungkol sa {place}',
  'about.stat.services': 'Mga serbisyong pampubliko',
  'about.stat.services.src': "Citizen's Charter, {charterEdition}",
  'about.stat.offices': 'Mga opisina at unit',
  'about.stat.offices.src': "Citizen's Charter, {charterEdition}",
  'about.sources.li1': '{censusSource}, petsa ng sanggunian: {censusDate}',
  'about.sources.li2': '{charterTitle}, {charterEdition}',
  'about.brgy.name': 'Barangay',
  'about.brgy.population': 'Populasyon',
  'about.brgy.censusYear': 'Taon ng census',
  'about.brgy.partial':
    'Ito ang mga barangay na nasuri na. Sinusuri pa ang iba laban sa opisyal na sanggunian.',
  'offices.placeSub':
    "Nakalista ayon sa opisina ang mga serbisyo ng {lguKind} sa Citizen's Charter.",
  'offices.brgy': 'Mga barangay',
  'offices.charter': 'Mga opisina sa Charter',

  // Tourism
  'tourism.title': 'Turismo sa {place}',
  'tourism.eyebrow': 'Turismo',
  'tourism.lead':
    'Mga pook-turista sa {place}, {province}: kung saan sila, ano sila, at ano ang iniaalok.',
  'tourism.spotsTitle': 'Mga pook-',
  'tourism.spotsHighlight': 'turista.',
  'tourism.spotsSub': 'Mga lugar na sulit bisitahin, kasama ang iniaalok ng bawat isa.',
  'tourism.address': 'Saan',
  'tourism.offer': 'Ano ang iniaalok',
  'tourism.unverified': 'Hindi pa beripikado',
  'tourism.noteTitle': 'Paalala sa pahinang ito',
  'tourism.noteBody':
    'Impormasyon lamang ang inilalathala ng {brand}. Ang mga booking, tour, at bayad ay nasa tanggapan ng turismo ng {lguKind}.',
  'tourism.unverifiedNote':
    'Ang mga pook na may markang "Hindi pa beripikado" ay mula sa komunidad at hindi pa nasusuri laban sa opisyal na sanggunian. Itanong sa tanggapan ng turismo bago maglakbay.',
  'tourism.empty': 'Wala pang nakalistang pook-turista.',
  'tourism.emptyBody':
    'Lalabas dito ang mga pook kapag may nagdagdag sa kanila sa koleksyon ng nilalaman.',

  // Tourism filters
  'tourism.filters.groupLegend': 'Ipakita',
  'tourism.filters.typeLegend': 'Uri',
  'tourism.filters.all': 'Lahat',
  'tourism.filters.allGroups': 'Lahat ng uri ng pagbisita',
  'tourism.filters.allTypes': 'Lahat ng uri',
  'tourism.filters.shown': 'Mga pook na nakikita:',
  'tourism.filters.none': 'Walang pook na tumutugma sa mga filter na ito.',
  'tourism.filters.noScript':
    'Kailangan ng JavaScript ang mga filter. Nakalista sa ibaba ang lahat ng pook.',

  // Visitor groups and place types, in taxonomy order
  'tourism.group.see': 'Tanawin',
  'tourism.group.eat': 'Kainan',
  'tourism.group.stay': 'Tuluyan',
  'tourism.group.do': 'Gawain',
  'tourism.cat.heritage': 'Mga pamanang pook',
  'tourism.cat.church': 'Mga simbahan',
  'tourism.cat.museum': 'Mga museo',
  'tourism.cat.park': 'Mga liwasan',
  'tourism.cat.nature': 'Kalikasan',
  'tourism.cat.beach': 'Mga dalampasigan',
  'tourism.cat.view-deck': 'Mga tanawan',
  'tourism.cat.cafe': 'Mga kapihan',
  'tourism.cat.restaurant': 'Mga restawran',
  'tourism.cat.market': 'Mga pamilihan',
  'tourism.cat.villa': 'Mga villa',
  'tourism.cat.resort': 'Mga resort',
  'tourism.cat.homestay': 'Mga homestay',
  'tourism.cat.inn': 'Mga inn',
  'tourism.cat.festival': 'Mga pista',
  'tourism.cat.tour': 'Mga tour',
  'tourism.cat.adventure': 'Mga pakikipagsapalaran',
  'tourism.cat.school': 'Mga paaralan',
  'tourism.cat.salon': 'Mga salon',
  'tourism.cat.computer-shop': 'Mga computer shop',
  'tourism.cat.bakery': 'Mga panaderya',
  // How it works, Contribute, Accessibility additions (draft; translation owner reviews, #59)
  'howItWorks.notDoTitle': 'Ang hindi ginagawa ng site na ito',
  'howItWorks.notDo.li1': 'Hindi ito tumatanggap ng bayad.',
  'howItWorks.notDo.li2': 'Hindi ito tumatanggap ng aplikasyon. Sa opisina ka pa rin mag-a-apply.',
  'howItWorks.notDo.li3': 'Wala itong account at hindi humihingi ng personal na detalye.',
  'howItWorks.notDo.li4': 'Hindi ito opisyal na website ng pamahalaang lokal ng {place}.',
  'howItWorks.statusTitle': 'Ang ibig sabihin ng mga label',
  'howItWorks.statusBody':
    'May isa sa tatlong label ang bawat gabay. Ang mga "verified" na gabay lamang ang lumalabas sa {brand}.',
  'howItWorks.status.verified':
    'Sinuri laban sa {charterTitle} ng taong hindi sumulat nito. Tugma ito sa opisyal na dokumento. Hindi pa ito kinukumpirma ng pamahalaang lokal.',
  'howItWorks.status.needsConfirmation':
    'Isinulat mula sa opisyal na dokumento, pero hindi pa nasusuri. Hindi ito inilalathala.',
  'howItWorks.status.outdated':
    'Nasuri na ito noon, pero maaaring nagbago ang opisyal na dokumento. Hindi ito inilalathala hanggang muling masuri.',
  'howItWorks.secondChecker':
    'Sinusuri ng pangalawang tao, na hindi sumulat nito, ang bawat gabay sa serbisyo bago ito ilathala.',
  'howItWorks.reportTitle': 'May nakitang mali?',
  'howItWorks.reportBody':
    'Gamitin ang form ng ulat sa GitHub. Kailangan ng libreng GitHub account. Sabihin kung ano ang mali at ilakip ang link ng opisyal na dokumentong nagpapakita ng tamang detalye.',
  'howItWorks.reportNext':
    'Ikukumpara ng isang miyembro ng team ang ulat mo sa opisyal na dokumento. Kung mali ang gabay, itatama ito, at susuriin ang pagbabago bago ito mailabas.',
  'contribute.way.report.title': 'Iulat ang maling detalye',
  'contribute.way.report.body':
    'Gamitin ang form para sabihin sa amin ang maling o lumang detalye. Ilakip ang link ng opisyal na dokumento kung kaya mo.',
  'contribute.way.check.title': 'Suriin ang isang gabay',
  'contribute.way.check.body':
    'Buksan ang isang gabay sa tabi ng pahina nito sa {charterTitle}. Iulat ang anumang pagkakaiba na makita mo.',
  'contribute.noCode': 'Hindi kailangan ng coding',
  'contribute.secondChecker':
    'Bago mailathala ang isang gabay sa serbisyo, sinusuri ito ng isang miyembro ng team na hindi sumulat nito, laban sa opisyal na dokumento.',
  'accessibility.feature.text.title': 'Laki ng teksto',
  'accessibility.feature.text.body':
    'Sumusunod ang teksto sa laki na itinakda mo sa browser, at puwede kang mag-zoom. May awtomatikong pagsusuri kung may pag-scroll sa gilid sa makitid na screen.',
  'accessibility.gapsTitle': 'Ano pa ang kulang',
  'accessibility.gaps.li2':
    'Hindi pa namin nasusubok ang site gamit ang mga app na nagbabasa ng pahina nang malakas, o sa totoong telepono.',
  'accessibility.gaps.li3': 'Draft pa ang tekstong Filipino. Hindi pa ito nasusuri ng tagasalin.',
  'accessibility.gaps.li4':
    'Iilang problema lang ang nahahanap ng awtomatikong pagsusuri. Hindi nito masasabi kung malinaw ang pahina o may saysay ito kapag binasa nang malakas.',
  'accessibility.reviewTitle': 'Paano namin sinusuri ang site',
  'accessibility.reviewBody':
    'May awtomatikong checker na tumatakbo sa mga pangunahing pahina, sa Ingles at Filipino, sa bawat update ng site.',
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
