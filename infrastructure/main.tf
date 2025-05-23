terraform {
  required_version = ">= 1.0"
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.14.1"
    }
  }
}

provider "vercel" {
  token = var.vercel_token
}

resource "vercel_project" "app" {
  name      = "phantom-ar-martial-ops"
  framework = "nextjs"
  git_repo {
    type = "github"
    repo = "your-github-username/phantom-ar-martial-ops"
  }
  environment_variables = {
    SENTRY_DSN               = var.sentry_dsn
    NEXT_PUBLIC_LD_CLIENT_ID = var.ld_client_id
  }
}

output "preview_url" {
  value = vercel_project.app.preview_url
}