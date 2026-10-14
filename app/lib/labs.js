export const publishedLabs = [
  {
    "title": "Três Portões",
    "category": "Application Security",
    "documentation": "https://rootkaito.github.io/tutorial-secure-pipeline/",
    "markup": "<article class=\"featured-project\"><div class=\"project-copy\"><span class=\"featured-label\">✦ Application security lab</span><h3 lang=\"pt-BR\">Três Portões</h3><p class=\"project-subtitle\">Three security gates. One working pipeline.</p><p class=\"project-description\">A hands-on lab with Gitleaks, SonarCloud and OWASP ZAP in GitHub Actions. Built against OWASP Juice Shop, with documented failures, fixes and evidence from real pipeline runs.</p><div class=\"project-actions\"><a class=\"button primary\" href=\"https://rootkaito.github.io/tutorial-secure-pipeline/\" target=\"_blank\" rel=\"noopener noreferrer\">Explore the lab <span aria-hidden=\"true\">→</span></a><a class=\"button secondary\" href=\"https://github.com/RootKaito/secure-pipeline-poc\" target=\"_blank\" rel=\"noopener noreferrer\">View on GitHub <img class=\"github-icon\" src=\"/assets/icons/github.svg\" alt=\"\"></a></div></div><div class=\"pipeline-diagram\" role=\"img\" aria-label=\"Pull request through Gitleaks secret scanning and SonarCloud code analysis, followed by OWASP ZAP runtime testing against Juice Shop.\"><div class=\"pipeline-target\"><span>PUBLIC LAB / OWASP JUICE SHOP</span><b>From pull request to runtime</b></div><ol class=\"gate-list\"><li><i>01</i><div><strong>Gitleaks</strong><span>Secrets in commits</span></div><b class=\"gate-result\">Gate</b></li><li><i>02</i><div><strong>SonarCloud</strong><span>Code & quality checks</span></div><b class=\"gate-result\">Gate</b></li><li><i>03</i><div><strong>OWASP ZAP</strong><span>Runtime baseline scan</span></div><b class=\"gate-result\">Gate</b></li></ol><p>GitHub Actions <span>→</span> Isolated lab <span>→</span> Published evidence</p></div><ul class=\"tags\"><li>CI/CD</li><li>GitHub Actions</li><li>Gitleaks</li><li>SonarCloud</li><li>OWASP ZAP</li><li>Docker</li></ul></article>"
  },
  {
    "title": "Posto de Observação",
    "category": "Defensive Security",
    "documentation": "https://rootkaito.github.io/honeypot/",
    "markup": "<article class=\"project-card\"><img src=\"/assets/laptop-dark.png\" alt=\"\" loading=\"lazy\"><div class=\"card-shade\"></div><div class=\"card-content\"><p class=\"eyebrow\">Defensive security lab</p><h3><a class=\"card-button\" href=\"https://rootkaito.github.io/honeypot/\" target=\"_blank\" rel=\"noopener noreferrer\">Posto de Observação</a></h3><p>An isolated Cowrie honeypot and Suricata IDS lab, with Alloy, Loki and Grafana for log collection and analysis.</p><ul class=\"tags\"><li>Cowrie</li><li>Suricata</li><li>Grafana</li></ul></div><span class=\"mobile-arrow\" aria-hidden=\"true\">↗</span></article>"
  },
  {
    "title": "Android ContentProvider Exposure",
    "category": "Mobile Security",
    "documentation": "https://rootkaito.github.io/mobilesec-labnotes/",
    "markup": "<article class=\"project-card\"><img src=\"/assets/laptop-dark.png\" alt=\"\" loading=\"lazy\"><div class=\"card-shade\"></div><div class=\"card-content\"><p class=\"eyebrow\">Mobile security lab</p><h3><a class=\"card-button\" href=\"https://rootkaito.github.io/mobilesec-labnotes/\" target=\"_blank\" rel=\"noopener noreferrer\">Android ContentProvider Exposure</a></h3><p>An educational InsecureShop lab exploring ContentProvider permissions, APK analysis with JADX and a separate Kotlin app to demonstrate unintended data access in a controlled Android emulator.</p><ul class=\"tags\"><li>Android</li><li>Kotlin</li><li>JADX</li><li>InsecureShop</li></ul></div><span class=\"mobile-arrow\" aria-hidden=\"true\">↗</span></article>"
  }
];
