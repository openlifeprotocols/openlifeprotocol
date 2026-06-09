---
title: Contributing to OLP
---

Join the effort to standardize life and business processes. {% .lead %}

---

## Ways to Contribute

### 1. **Create a Workflow**

Design and submit a new workflow to the registry:

```bash
olp workflow create my-workflow
# ... design it ...
olp validate my-workflow.yaml
olp publish my-workflow.yaml --draft
# Submit PR with description
```

**Workflows needed:**
- [ ] Death workflows by jurisdiction
- [ ] Business formation workflows
- [ ] Employment workflows
- [ ] Healthcare workflows
- [ ] Education workflows
- [ ] Move/relocation workflows

### 2. **Improve Existing Workflows**

Find a workflow you want to improve:

```bash
# Clone from registry
olp workflow fork death.uk.england.v1
# Make improvements
olp validate
# Submit PR
```

### 3. **Write Documentation**

- Core concept guides
- Best practice articles
- Workflow design patterns
- Case studies
- Video tutorials
- Blog posts

### 4. **Build Tools**

- CLI enhancements
- SDK improvements
- Validation tools
- Testing frameworks
- Code generators
- Workflow visualizers

### 5. **Build Integrations**

- Bank integrations
- Government integrations
- Healthcare system integrations
- CRM integrations
- Email service integrations

### 6. **Translate the Specification**

Help translate OLP to new languages:
- Spanish
- French
- German
- Chinese
- Arabic
- And more...

### 7. **Contribute to Governance**

- Join working groups
- Participate in RFCs (Requests for Comments)
- Help shape the future of OLP
- Represent your institution or community

---

## Contribution Process

### Step 1: Find or Create an Issue

Check [GitHub Issues](https://github.com/openlifeprotocol/specification/issues) for open tasks, or create a new issue describing what you want to work on.

### Step 2: Fork the Repository

```bash
git clone https://github.com/openlifeprotocol/specification.git
cd specification
git checkout -b your-feature-branch
```

### Step 3: Make Your Changes

- Create or update files
- Follow the contribution guidelines
- Test your changes
- Add documentation

### Step 4: Validate

```bash
olp validate your-changes.yaml
olp test your-changes.yaml
npm run lint
```

### Step 5: Submit a Pull Request

```bash
git push origin your-feature-branch
# Open PR on GitHub with clear description
```

Include in your PR:
- What you changed and why
- Reference the issue number
- Screenshots or examples if relevant
- Any breaking changes or migration guidance

### Step 6: Code Review

Community members will review your PR:
- Ask questions
- Suggest improvements
- Approve when ready

### Step 7: Merge

Maintainers merge approved PRs.

---

## Working Groups

OLP is organized into working groups:

### Specification Working Group
- Evolving the core specification
- Defining new object types
- Managing versioning and breaking changes
- Meetings: Bi-weekly

### Workflows Working Group
- Creating and curating workflows
- Managing the workflow registry
- Defining workflow design patterns
- Meetings: Weekly

### Tooling Working Group
- Building CLI, SDKs, and tools
- Code generation and automation
- Testing frameworks
- Meetings: Weekly

### Conformance Working Group
- Defining conformance levels
- Creating certification tests
- Auditing implementations
- Meetings: Monthly

### Join a Working Group

Interested? [Fill out this form](https://forms.openlifeprotocol.org/working-groups) to join.

---

## Governance Model

OLP follows open governance principles:

### Decision Making

1. **Consensus** - Decisions made by community consensus when possible
2. **Voting** - When consensus isn't possible, community votes
3. **Steering Committee** - Ties are broken by the steering committee
4. **Transparency** - All decisions documented publicly

### Roles

| Role | Responsibilities |
|------|------------------|
| **Contributor** | Submit PRs, report issues, participate in discussion |
| **Maintainer** | Review PRs, manage repositories, set direction |
| **Steering Committee** | Set overall direction, resolve conflicts, manage foundation |
| **Foundation** | Provide governance and legal framework |

### Becoming a Maintainer

Contribute consistently for 3+ months:
- Multiple merged PRs
- Active participation in discussions
- Good judgment and collaborative spirit

### Becoming a Steering Committee Member

Nominated by existing committee members and approved by vote.

---

## Code of Conduct

OLP is committed to fostering a welcoming, inclusive community.

### Our Values

- **Respect** - Treat everyone with respect and dignity
- **Inclusion** - Welcome people from all backgrounds
- **Collaboration** - Work together toward shared goals
- **Excellence** - Aim for high quality in everything
- **Transparency** - Communicate openly and honestly

### Unacceptable Behavior

- Harassment or discrimination
- Abusive language or personal attacks
- Unwelcome sexual attention
- Violence or threats of violence
- Any form of abuse

### Reporting

Violations should be reported to conduct@openlifeprotocol.org. All reports are confidential.

---

## Licensing

OLP is licensed under Apache 2.0:
- ✅ Can be used commercially
- ✅ Can be modified
- ✅ Can be sublicensed
- ✅ Private use allowed
- ⚠️ Must include original license
- ⚠️ Must document changes
- ⚠️ No warranty provided
- ⚠️ No liability accepted

When you contribute, your work is automatically licensed under Apache 2.0.

---

## Getting Help

### Questions?

- Ask in [GitHub Discussions](https://github.com/openlifeprotocol/specification/discussions)
- Join our [Slack community](https://slack.openlifeprotocol.org)
- Attend community calls (bi-weekly on Wednesday)

### Stuck?

- Check the [FAQ](/docs/faq)
- Read the [specification](/docs/specification-overview)
- Look at existing workflow examples

### Found a Bug?

- [Open an issue](https://github.com/openlifeprotocol/specification/issues/new)
- Include steps to reproduce
- Include expected vs actual behavior
- Include your environment (OS, version, etc.)

---

## Community Resources

- **GitHub** - [openlifeprotocol/specification](https://github.com/openlifeprotocol/specification)
- **Slack** - [Join our community](https://slack.openlifeprotocol.org)
- **Discussions** - [GitHub Discussions](https://github.com/openlifeprotocol/specification/discussions)
- **Email** - community@openlifeprotocol.org
- **Calendar** - [Community events](https://calendar.openlifeprotocol.org)

---

## Recognition

Contributors are recognized in multiple ways:

- **GitHub** - Listed as contributor in repository
- **Website** - Listed on contributors page
- **Release Notes** - Thanked in release notes
- **T-Shirts** - OLP contributor t-shirts for major contributions
- **Speaking** - Opportunities to speak at events
- **Steering Committee** - Path to leadership roles

---

## Next Steps

1. **[Read the getting started guide](/docs/getting-started)** to familiarize yourself with OLP
2. **[Browse open issues](https://github.com/openlifeprotocol/specification/issues)** to find something to work on
3. **[Join Slack](https://slack.openlifeprotocol.org)** to connect with the community
4. **Make your first contribution!**

{% callout title="TODO" %}
- [ ] Create contributor onboarding guide
- [ ] Create code style guide
- [ ] Create commit message conventions
- [ ] Create PR template
- [ ] Create issue templates
- [ ] Set up GitHub automation
- [ ] Create contributor swag store
- [ ] Create contributor spotlight program
{% /callout %}
