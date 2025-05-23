terraform {
  required_providers {
    aws   = { source = "hashicorp/aws"   version = "~> 4.0" }
    azurerm = { source = "hashicorp/azurerm" version = "~> 3.0" }
    google = { source = "hashicorp/google" version = "~> 4.0" }
  }
}

provider "aws"   { region = var.aws_region }
provider "azurerm" { features = {} }
provider "google" { project = var.gcp_project; region = var.gcp_region }

module "k8s_cluster" {
  source    = "git::https://github.com/terraform-aws-modules/eks.git?ref=v20"
  providers = { aws = aws }
  cluster_name = "multi-cloud-eks"
  cluster_version = "1.24"
  subnets = var.aws_subnets
  vpc_id  = var.aws_vpc_id
}

module "aks_cluster" {
  source  = "Azure/aks/azurerm"
  providers = { azurerm = azurerm }
  resource_group_name = var.az_rg
  dns_prefix          = var.az_dns
  kubernetes_version  = "1.24.6"
}

module "gke_cluster" {
  source  = "terraform-google-modules/kubernetes-engine/google"
  providers = { google = google }
  project_id = var.gcp_project
  name       = "multi-cloud-gke"
  location   = var.gcp_region
}