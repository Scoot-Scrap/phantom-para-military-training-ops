# Self-hosted Azure API Management Developer Portal
FROM mcr.microsoft.com/azure-api-management/developer-portal:latest
WORKDIR /app
COPY custom-theme /app/theme
# Override default port if desired
EXPOSE 3980
CMD ["pm2-runtime", "start", "portal.js"]