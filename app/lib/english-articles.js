// English translations of the complete source text retrieved from Cyber Coffee's
// public RSS feed on 2026-10-06. Add reviewed translations here to publish editions.
const editions = [
  {
    slug: 'where-secrets-belong-azure-key-vault',
    title: 'Where secrets belong: managing secrets with Azure Key Vault',
    summary: 'Managed identities, centralized secrets and automatic rotation instead of static credentials.',
    isoDate: '2026-10-03', tags: ['Azure', 'Secrets'], image: '/assets/writing/azure-key-vault.webp', cardImage: '/assets/writing/azure-key-vault-card.webp', imageAlt: 'A glass vault protects a key and connects to three workloads, with an orbit representing credential rotation.',
    sourceUrl: 'https://pt.linkedin.com/pulse/onde-os-segredos-deveriam-morar-gest%C3%A3o-de-secrets-com-lucas-rocha--lmfuf',
    lead: 'The architecture that changes the question from “How do I hide the key better?” to “Why would there need to be a key to hide?”',
    introduction: [
      'A secret in an environment variable accidentally committed to a repository, an API key left in a config file “just until the test deployment,” a hardcoded credential “just for a quick test” that nobody removed afterward: leaked secrets are among the most mundane, and at the same time most serious, causes of security incidents. Mundane because they require no sophisticated attack; serious because a leaked credential provides direct access without exploiting anything. Most cases are preventable through architectural discipline, rather than heroic manual reviews.'
    ],
    sections: [
      { title: 'A secret scanner is a fire alarm, not prevention', paragraphs: [
        'Gitleaks and equivalent tools tell you that a secret has leaked after it has already leaked, is already in the repository history and has potentially already been cloned by someone. This is useful and necessary, but fundamentally reactive: a fire alarm does not prevent a fire; it only tells you sooner that one has started.',
        'Real prevention is architectural: the secret should never be present as text in source code to be scannable in the first place. A centralized vault such as Azure Key Vault changes the team’s question from “How do I avoid accidentally committing a secret?” to “Why would there be a secret to commit?” The second question is structural; the first depends on human discipline that will eventually fail.'
      ]},
      { title: 'Managed identity eliminates the root credential', paragraphs: [
        'The pattern that addresses the problem at its foundation, rather than its edges: the application authenticates to Key Vault using an Azure managed identity, with no static credential stored anywhere, whether in an environment variable, a configuration file or a CI/CD pipeline.',
        'There is no secret to leak because there is no corresponding static secret: the identity belongs to the workload itself, whether an App Service, a Function or a container, and is validated by Azure Active Directory at the time of the call. This is the difference between hiding the key somewhere better protected and simply not needing a key for that link in the chain. Every static credential eliminated removes an entire category of possible incident, rather than merely making it less likely.'
      ]},
      { title: 'Rotation only works if it is automatic', paragraphs: [
        'A secret that depends on manual rotation is, in practice, not rotated. Every team that has been through this knows it and pretends not to, because admitting it means acknowledging a debt nobody has time to pay. Manual rotation requires remembering, coordinating a redeployment and ensuring no service keeps pointing to the old version: enough work that, in practice, it happens once and never again.',
        'Centralizing secrets in a vault makes automatic rotation viable: the secret changes in a single place, and applications consuming it through an SDK retrieve the new version without redeployment, provided the code fetches the value from Key Vault at runtime or uses a short-lived cache, rather than capturing it once at startup and never refreshing it. Manual rotation is guaranteed debt; automatic rotation is the only realistic way for a long-lived credential to be replaced regularly instead of never.'
      ]},
      { title: 'Environment separation and least privilege', paragraphs: [
        'Separate vaults, or at least separate access scopes, for development, staging and production complete the model, with access granted according to least privilege and every secret access logged. Compromising staging then does not automatically hand over production credentials, and an audit trail records who accessed which secret and when. That information becomes critical precisely when investigating an incident, when it is too late to start collecting it.'
      ]},
      { title: 'What to take away', paragraphs: [
        'The ultimate goal of good secrets management is not to store secrets more carefully or behind more layers of obfuscation. It is to reduce, as close to zero as possible, the number of secrets that exist as static text needing to be stored somewhere. Managed identity removes the root credential wherever possible; for what remains, centralization in Key Vault enables real automatic rotation; and environment separation with least privilege limits the blast radius of anything that can still leak. Secret scanning remains valuable as a safety net for what escapes the design, but never as the first line of defense.'
      ]}
    ]
  },
  {
    slug: 'modern-frontend-security-nextjs-react',
    title: 'Modern frontend security: what changes with Next.js App Router and React 19',
    summary: 'Trust boundaries, Server Actions and handling sensitive data in modern React applications.',
    isoDate: '2026-09-24', tags: ['AppSec', 'React'], image: '/assets/writing/frontend-trust-boundary.webp', cardImage: '/assets/writing/frontend-trust-boundary-card.webp', imageAlt: 'A trust boundary filters data between a browser and a server while a private key stays on the server.',
    sourceUrl: 'https://pt.linkedin.com/pulse/seguran%C3%A7a-frontend-moderno-o-que-muda-com-nextjs-app-router-rocha--9firf',
    lead: 'Server Components and Server Actions moved the boundary between client and server. Every time that boundary moves, the security surface moves with it.',
    introduction: [
      'Server Components and the App Router redesigned where frontend code actually runs. Previously, the mental model was simple: everything in the React bundle ran in the browser, full stop. Now, the same .tsx file can run on the server, on the client or on both. That ambiguity, powerful for performance, is exactly where new pitfalls appear that the old mental model does not cover.'
    ],
    sections: [
      { title: 'Client/server confusion is a new source of leaks', paragraphs: [
        'With Server Components, it is easy to let a secret, an environment variable or a database query slip into the client bundle: a misplaced “use client” directive, a careless import of a module carrying an API key, or a component that started as server-only and was moved without anyone reviewing what it carried along.',
        'The symptom is subtle: the code compiles, the application works, and the secret only becomes apparent if someone opens the final bundle and looks for it. There is no build error or obvious warning. Knowing exactly what runs where is no longer just a performance detail; it is a security control. Treating the server/client boundary as a trust boundary means reviewing every component that crosses it during code review, rather than assuming “it is all on the server” simply because the file does not have “use client” at the top.'
      ]},
      { title: 'Server Actions are endpoints: treat them that way', paragraphs: [
        'It is tempting to see a Server Action as “just a function that runs on the server,” called with the same syntax as a local function. In practice, however, it is a public endpoint disguised as a function call: anyone can construct a direct request to it without going through the UI that normally invokes it.',
        'Every validation, authorization and sanitization measure that would apply to a traditional API route applies equally to a Server Action. That includes not trusting incoming arguments, even when the function’s TypeScript signature suggests a specific type. TypeScript guarantees shape at compile time; it guarantees nothing about what actually arrives at runtime from outside your control. The convenient syntax, “use server” and calling it like a function, hides the real surface: every exposed Server Action is a route that needs the same authentication and authorization checklist as any API endpoint.'
      ]},
      { title: 'Server rendering changes the sensitive-data equation', paragraphs: [
        'Data that previously existed only behind an API call, and therefore only reached the client when explicitly requested, can now be rendered directly on the server and embedded in the returned HTML. This is excellent for performance because it removes a network round trip, but dangerous if you do not deliberately filter what goes to the client: it is easy to simply pass the entire object held by the server to the rendering component.',
        'Fetching a user from the database to render their name and inadvertently serializing the whole object, including a password hash, internal flags and fields that should never leave the backend, to a client component is a concrete, recurring mistake in this model. What the server knows is not what the client should see. Separation must be explicit, field by field, where data passes between layers, never implicit because “it is easier to pass the whole object.”'
      ]},
      { title: 'CSP and headers remain the floor, not the ceiling', paragraphs: [
        'No framework innovation replaces a properly configured Content-Security-Policy, security headers such as X-Frame-Options, Strict-Transport-Security and Referrer-Policy, or ongoing care with third-party dependencies in the bundle. The foundation that existed before the App Router still applies in full. The App Router adds new layers of risk on top of that foundation; it does not replace it.',
        'Teams that migrate and consider the migration “done” on the day the application builds without errors are effectively ignoring that the frontend security checklist has grown, rather than shrunk.'
      ]},
      { title: 'What to take away', paragraphs: [
        'Migrating to the App Router is good architecture and worth the investment. But it reopens security decisions that lay dormant in the old client-heavy model, because that model had one obvious boundary, browser versus server, while the new one has a moving boundary decided file by file. Revisit each boundary explicitly: what runs where, what each Server Action validates and what each server component actually serializes to the client. Treating this as a one-off migration review instead of an ongoing discipline is how subtle leaks slip in.'
      ]}
    ]
  },
  {
    slug: 'security-roadmap-from-scratch',
    title: 'A security roadmap from scratch: where to start when nothing is in place',
    summary: 'Turn a list of risks into an actionable plan your team can deliver, with results you can demonstrate.',
    isoDate: '2026-09-17', tags: ['AppSec', 'Leadership'], image: '/assets/writing/security-roadmap.webp', cardImage: '/assets/writing/security-roadmap-card.webp', imageAlt: 'Three connected stages show risk assessment, protective controls and verified results.',
    sourceUrl: 'https://pt.linkedin.com/pulse/roadmap-de-seguran%C3%A7a-do-zero-por-onde-come%C3%A7ar-quando-n%C3%A3o-lucas-rocha--fyeke',
    lead: 'How to turn a list of risks into an action plan the team can execute, with results you can demonstrate.',
    introduction: [
      'Taking responsibility for the security of a product without a structured program tends to produce a list that grows faster than your capacity to address it.',
      'There are old credentials, outdated dependencies, permissions nobody reviews and questions about what data reaches the logs. Meanwhile, the product continues shipping features.',
      'The question that stalls the work is: “How are we going to fix all of this?”',
      'A more useful question is: which risk do we need to reduce first, who will take care of it and how will we verify that it improved?',
      'A roadmap starts with those three answers.'
    ],
    sections: [
      { title: 'Start with a short assessment and a concrete action', paragraphs: [
        'Before choosing tools, we need to understand what we are protecting.',
        'That requires an initial inventory: applications in production, data processed, external integrations, technical owners and administrative access paths. It does not need to be perfect to be useful. It needs to support decisions.',
        'Choose an important product flow, such as updating account details, and follow its path. Who can initiate the change? Where is authorization checked? Which service writes the data? What is recorded? Who can access that record?',
        'This exercise connects security to the actual application and helps uncover problems that a list of tools will not reveal.',
        'Assessment can happen alongside fixing obvious exposures. If a production credential is exposed, revoking it should not wait until the inventory is complete.',
        'Record the problem, contain the exposure and use what you learn to broaden the assessment.'
      ]},
      { title: 'Prioritize by risk scenario', paragraphs: [
        '“We have a critical vulnerability” is initial information. To decide the order of work, we need to understand the context.',
        'Is the component in production? Is it accessible from the internet? Is the vulnerable functionality used? Which data or operations could be affected? Is there any control that makes exploitation harder?',
        'Consider a hypothetical example: the team finds a dependency with a high-severity alert in an isolated internal tool and an authorization flaw that allows access to another customer’s data in the public API.',
        'The authorization flaw may deserve attention first, even if it does not have the highest score on the dashboard.',
        'Practical prioritization considers the following:'
      ], list: [
        'Impact: what could happen to customers, data and operations?',
        'Exposure: who can reach the vulnerable path?',
        'Exploitation conditions: what needs to happen for the issue to be exploited?',
        'Effort and dependencies: what is needed to fix or contain it?'
      ], after: [
        'Effort helps organize execution. It should not make a serious risk disappear from the list just because the fix is difficult.',
        'When a permanent solution takes time, look for containment: restrict access, temporarily disable an operation or reduce permissions. That measure also needs an owner and a review deadline.'
      ]},
      { title: 'Turn each priority into a verifiable deliverable', paragraphs: [
        '“Improve access management” is an intention. It is not yet a deliverable.',
        'A deliverable would be to review administrative access to production applications, remove unjustified permissions and record owners for exceptions.',
        'The difference is the completion criterion.',
        'Each priority must connect a problem to a deliverable and a way to verify the result. Consider four examples:'
      ], list: [
        '1. Credentials exposed in code. Problem: credentials accessible in code or repository history. Deliverable: revoke the identified credentials and correct their storage. Verification: confirm the old credentials no longer work and review the locations of exposure.',
        '2. Accumulated administrative access. Problem: permissions remain active without need or justification. Deliverable: review access to priority applications and remove unnecessary permissions. Verification: check remaining access, its justification and its owners.',
        '3. Possible cross-customer access. Problem: a user can read or modify another customer’s resources. Deliverable: fix authorization in the affected flow. Verification: test cross-customer access attempts and confirm they are blocked.',
        '4. Unnecessary personal data in logs. Problem: logs store personal information without a need. Deliverable: reduce the fields recorded in the selected flow. Verification: inspect new records and handle historical data according to the applicable policy.'
      ], after: ['Installing a tool may be part of the deliverable. Completion needs to demonstrate that the control works.']},
      { title: 'Organize the first 90 days into stages', paragraphs: [
        'The period below is a proposed structure. The sequence should change when incidents, significant exposures or operational dependencies arise.',
        'Days 1–30: understand the essentials and contain what is exposed.',
        'Map priority applications and flows, identify owners and record the main risks. Fix urgent exposures found during the assessment. Also define who should be contacted when an incident is suspected.',
        'By the end of this stage, the team should be able to explain its priorities and why they matter.',
        'Days 31–60: make controls part of the routine.',
        'Choose controls linked to the risks found. This may include access reviews, secret scanning during development, handling vulnerable dependencies or authorization tests.',
        'Define who receives each alert and what happens afterward. An alert without clear follow-through becomes another forgotten queue.',
        'Days 61–90: verify results and adjust the plan.',
        'Test the implemented controls, review exceptions and compare the situation with the initial assessment. Use the results to choose the next set of deliverables.',
        'If a control produces many unhelpful alerts, tune it. If a fix has not reached all planned applications, record the remaining scope. The roadmap needs to reflect operations.'
      ]},
      { title: 'Establish minimal governance from the start', paragraphs: [
        'Even a small program needs to record who makes decisions, who executes them and who can temporarily accept a risk.',
        'An exception such as “this integration will keep using a long-lived credential for now” needs a justification, an owner, compensating controls where appropriate and a review date.',
        'Without that, “for now” loses its deadline.',
        'Initial documentation can be lean: a risk register, prioritization criteria, owners and a basic incident response procedure. It should accompany the work and allow someone else to understand the decisions.',
        'As the program grows, that structure can become more detailed.'
      ]},
      { title: 'Measure reduced exposure', paragraphs: [
        'The number of tools installed and the volume of alerts found say little, on their own, about product security.',
        'Look for measures that support decisions: how many priority applications have had their access reviewed? How many exposed credentials are still active? How long have significant risks remained untreated? Which critical flows already have authorization tests?',
        'Also state the scope of the measurement.',
        '“We reviewed all administrative access” means something different from “we reviewed access to three of the eight applications in production.” The second sentence makes the remaining work visible.',
        'A good roadmap update shows what improved, what remains exposed and what decision needs to be made.'
      ]},
      { title: 'What to take away', paragraphs: [
        'Starting a security program requires choices the team can execute and verify.',
        'Choose an important flow, understand its risks, contain the most urgent exposures and turn the next fixes into deliverables with an owner and a completion criterion.',
        'The first roadmap can fit on one page. Its value lies in guiding next week’s work and showing, afterward, which risk was reduced.'
      ]}
    ]
  }
];

export const englishArticles = editions.map((article) => {
  const words = [article.lead, ...article.introduction, ...article.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.list || []), ...(section.after || [])])].join(' ').split(/\s+/).length;
  return { ...article, link: `/writing/${article.slug}`, readingMinutes: Math.max(1, Math.ceil(words / 220)), dateLabel: new Date(`${article.isoDate}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' }).toUpperCase() };
});
export function getEnglishArticle(slug) { return englishArticles.find(article => article.slug === slug); }
export function getEnglishArticleCards() { return englishArticles.slice(0, 3).map(({ title, link, isoDate, dateLabel, summary, tags, cardImage }) => ({ title, link, isoDate, dateLabel, summary, tags, image: cardImage })); }
