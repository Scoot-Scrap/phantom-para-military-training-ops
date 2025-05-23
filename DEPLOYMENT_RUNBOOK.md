# Deployment Runbook

## Overview
Automated CI/CD via GitHub Actions → Vercel.  
Includes preview deploys, production deploys with rollback, notifications, performance budgets, security scans, and monitoring.

## Secrets Required
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`  
- `SENTRY_DSN`  
- `NEXT_PUBLIC_LD_CLIENT_ID`  
- `SLACK_WEBHOOK`, `TEAMS_WEBHOOK`  
- `CF_API_TOKEN`, `CF_ZONE_ID`  

## Preview Deploys (PRs)
- Triggered on `pull_request` to `main`.  
- Comments preview URL on PR.  
- Slack notification to #deploy-preview.

## Production Deploys
- Triggered on `push` to `main`.  
- Runs CI (build, Lighthouse, tests).  
- Deploys to Vercel (prod).  
- Smoke-tests `/dashboard`.  
- Rolls back on failure.  
- Sends Slack/Teams notifications.  
- Purges Cloudflare cache.  
- Security scans (npm audit, Snyk, OWASP ZAP).  
- Lighthouse CI assertions.

## Synthetic Monitoring
- Runs every 5 minutes.  
- Hits `/dashboard` and fails if non-200.  
- Alerts via Slack on failure.

## Feature Flagging & Canary
- LaunchDarkly initialized in `/app/layout.js`.  
- Use `useFlags()` to gate new features (e.g. `dashboard_canary`).

## Infra as Code
- Terraform config in `/infrastructure`.  
- Run `terraform init && terraform apply` to sync Vercel project & env.

## Rollbacks
- Automatic on smoke-test failure.  
- Manual via `npx vercel rollback <deployment-id>`.

## Contact & Escalation
1. Dev on-call Slack: @oncall  
2. PagerDuty: +1-800-XXX-XXXX  
3. Sentry & Datadog dashboards