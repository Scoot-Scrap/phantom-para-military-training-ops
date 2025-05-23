package sbom_policies

allow {
  not some cve in input.vulnerabilities
  input.vulnerabilities[cve].severity == "Critical"
}