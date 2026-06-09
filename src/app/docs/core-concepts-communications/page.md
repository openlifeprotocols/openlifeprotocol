---
title: Communications
---

How do we notify people? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is a Communication?

A Communication represents a message sent through a channel:
- **Email** - Electronic mail
- **SMS** - Text message
- **Letter** - Postal mail
- **Phone** - Phone call
- **Portal** - Secure portal message
- **Meeting** - In-person or video meeting
- **WhatsApp** - WhatsApp message

---

## Communication Properties

- `id` - Communication identifier
- `type` - Email, SMS, letter, etc.
- `sender` - Who sent it
- `recipient` - Who received it
- `subject` - Communication subject
- `body` - Message content
- `status` - Sent, delivered, read, failed
- `timestamp` - When sent
- `template` - Template used (if any)

---

## Communication Channels

Each channel has different properties:

### Email
- Can attach documents
- Can include links
- Good for formal notifications

### SMS
- Character limited
- Immediate delivery
- Good for urgent notifications

### Letter
- Formal and official
- Trackable delivery
- Good for legal documents

### Portal
- Secure messaging
- Can require authentication
- Good for sensitive information

---

## TODO

- [ ] Define communication schema in JSON Schema
- [ ] Define channel capabilities
- [ ] Define communication templates
- [ ] Define delivery tracking
- [ ] Define recipient preferences
- [ ] Add communication examples
