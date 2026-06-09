---
title: Assets & Payments
---

What's owned and what's owed? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What are Assets & Liabilities?

Financial primitives for workflows involving money:

- **Assets** - What's owned (property, bank accounts, investments, possessions)
- **Liabilities** - What's owed (debts, mortgages, loans)
- **Payments** - Movement of funds

---

## When Are They Used?

### Death Case
- **Assets**: Estate (property, accounts, possessions)
- **Liabilities**: Outstanding debts, mortgages
- **Payments**: Payment of debts, distribution to beneficiaries

### Business Case
- **Assets**: Initial capitalization, equipment, property
- **Liabilities**: Startup loans, investor equity
- **Payments**: Distribution of profits, repayment of loans

### Retirement Case
- **Assets**: Pension accounts, investments
- **Liabilities**: Any remaining debts
- **Payments**: Pension withdrawals, benefit payments

---

## Asset Properties

- `id` - Asset identifier
- `type` - Property, account, investment, etc.
- `owner_id` - Who owns it
- `name` - Asset description
- `value` - Current value
- `currency` - Currency (USD, GBP, EUR)
- `location` - Physical or institutional location
- `metadata` - Additional details

---

## Liability Properties

- `id` - Liability identifier
- `type` - Debt, mortgage, loan, etc.
- `debtor_id` - Who owes it
- `creditor_id` - Who's owed
- `amount` - Amount owed
- `currency` - Currency
- `interest_rate` - If applicable
- `due_date` - When due
- `status` - Active, settled, defaulted

---

## Payment Properties

- `id` - Payment identifier
- `from_actor_id` - Who's paying
- `to_actor_id` - Who's receiving
- `amount` - Amount
- `currency` - Currency
- `reason` - Why payment (debt settlement, inheritance, etc.)
- `status` - Pending, completed, failed
- `timestamp` - When processed

---

## TODO

- [ ] Define asset schema in JSON Schema
- [ ] Define liability schema
- [ ] Define payment schema
- [ ] Define payment processing APIs
- [ ] Define escrow and trust mechanisms
- [ ] Add examples
